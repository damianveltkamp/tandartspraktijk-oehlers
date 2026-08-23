import "./globals.css";
import type { Dentist, WithContext } from "schema-dts";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { Toaster } from "sonner";

import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import {
  getHeaderPhoneQuery,
  getNotificationQuery,
  settingsQuery,
} from "@/sanity/lib/queries";
// import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import { handleError } from "./client-utils";
import { Header } from "@/features/Header/Header";
import { Footer } from "@/features/Footer/Footer";
import { NotificationModal } from "@/features/NotificationModal/NotificationModal";
import DraftModeToast from "@/components/DraftModeToast/DraftModeToast";
import { notificationAdapter } from "@/adapters/objects/notification";
import { headerPhoneAdapter } from "@/adapters/objects/headerPhone";

export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
    stega: false,
  });
  const title = settings?.title ?? "";
  const description = settings?.description ?? "";

  // const ogImage = resolveOpenGraphImage(settings?.ogImage);
  // let metadataBase: undefined | URL = undefined;
  // try {
  //   metadataBase = settings?.ogImage?.metadataBase
  //     ? new URL(settings.ogImage.metadataBase)
  //     : undefined;
  // } catch {
  //   // ignore
  // }

  return {
    // metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: description,
    // openGraph: {
    //   images: ogImage ? [ogImage] : [],
    // },
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
  const structuredData: WithContext<Dentist> = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: "Tandartspraktijk Oehlers",
    url: "https://tandartsoehlers.nl/",
    telephone: "+31 20 482 3573",
    email: "info@tandartsoehlers.nl",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Van Beekstraat 124 C",
      addressLocality: "Landsmeer",
      postalCode: "1121 NT",
      addressCountry: "NL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 52.42891454569118,
      longitude: 4.926430487612518,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "08:00",
        closes: "17:00",
      },
    ],
  };

  const [{ data: notification }, { data: headerData }] = await Promise.all([
    sanityFetch({ query: getNotificationQuery }),
    sanityFetch({ query: getHeaderPhoneQuery }),
  ]);

  const phone = headerPhoneAdapter(headerData?.phone);

  const showNotification = notification?.showNotification;
  const notificationProps = notificationAdapter(notification);

  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
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
        <Header phone={phone} />
        <main>
          {showNotification && notificationProps && (
            <NotificationModal {...notificationProps} />
          )}
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
