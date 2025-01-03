import type { Metadata, Viewport } from "next";
import "./globals.css";
import dynamic from "next/dynamic";
import Provider from "./provider";
const ClientLayout = dynamic(() => import("./client-layout"));

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFFFFF",
  colorScheme: "light",
};

export const metadata: Metadata = {
  title: "Car rental in Phuket at the lowest prices from owners",
  description: "Honest. Transparent. No hidden fees.",
  openGraph: {
    title: "Car rental in Phuket at the lowest prices from owners",
    description: "Honest. Transparent. No hidden fees.",
    locale: "en_GB",
    alternateLocale: ["ru_RU"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: [
    // {
    //   rel: "icon",
    //   url: `/icon-${process.env.MODE}.svg`,
    //   type: "image/svg+xml",
    // },
    {
      rel: "apple-touch-icon",
      url: "/apple-touch-icon.png",
    },
    {
      rel: "preconnect",
      url: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      url: "https://fonts.gstatic.com",
    },
  ],
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WBXDRDXK');
            `,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WBXDRDXK"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
          }}
        />
        {/* End Google Tag Manager (noscript) */}
        <Provider>
        <ClientLayout>{children}</ClientLayout> {/* Используем ClientLayout */}

        </Provider>
      </body>
    </html>
  );
}
