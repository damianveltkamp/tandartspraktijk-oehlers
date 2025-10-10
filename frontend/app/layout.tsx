import "./globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { draftMode } from "next/headers";
import { toPlainText, VisualEditing } from "next-sanity";
import { Toaster } from "sonner";

import * as demo from "@/sanity/lib/demo";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { getNotificationQuery, settingsQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import { handleError } from "./client-utils";
import { Header } from "@/features/Header/Header";
import { Footer } from "@/features/Footer/Footer";
import { NotificationModal } from "@/features/NotificationModal/NotificationModal";
import DraftModeToast from "@/components/DraftModeToast/DraftModeToast";
import { notificationAdapter } from "@/adapters/objects/notification";

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false,
  });
  const title = settings?.title ?? demo.title;
  const description = settings?.description ?? demo.description;

  const ogImage = resolveOpenGraphImage(settings?.ogImage);
  let metadataBase: undefined | URL = undefined;
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined;
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: toPlainText(description),
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  };
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [{ data: notification }] = await Promise.all([
    sanityFetch({ query: getNotificationQuery }),
  ]);

  const showNotification = notification?.showNotification;
  const notificationProps = notificationAdapter(notification);

  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        {isDraftMode && (
          <>
            <DraftModeToast />
            <VisualEditing />
          </>
        )}
        <SanityLive onError={handleError} />
        <Header />
        <main>
          {showNotification && notificationProps && (
            <NotificationModal {...notificationProps} />
          )}
          {children}
        </main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
