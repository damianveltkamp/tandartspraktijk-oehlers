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
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import { getBaseUrl } from "@/utils/getBaseUrl";
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
  const ogImage = resolveOpenGraphImage(settings?.ogImage);

  // Without a metadataBase Next resolves every OG/Twitter image to a relative
  // URL, which the social crawlers cannot fetch. `getBaseUrl` returns undefined
  // for an unset or unparseable variable, so a bad value only costs us the
  // absolute URLs instead of throwing out of `generateMetadata`.
  const baseUrl = getBaseUrl();

  return {
    metadataBase: baseUrl ? new URL(baseUrl) : undefined,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: description,
    manifest: "/site.webmanifest",
    icons: {
      icon: [
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    // No `title`/`description` here: Next only backfills `openGraph.title` and
    // `openGraph.description` from a page's own `title`/`description` when they
    // are absent, so setting them at the root would pin every page's social card
    // to the site-wide copy.
    openGraph: {
      type: "website",
      locale: "nl_NL",
      siteName: title,
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
    // Confirmed with the practice: open Monday through Thursday around a closed
    // hour over lunch, and closed Friday through Sunday. Schema.org has no
    // "closed" marker, so a closed day is a zero-length window rather than an
    // omission -- omitting it leaves Google to guess whether we simply forgot.
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "08:00",
        closes: "12:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "13:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "00:00",
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
    <html lang="nl">
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
