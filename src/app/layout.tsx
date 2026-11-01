import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/store/ReduxProvider";

export const metadata: Metadata = {
  title: "Sahayak-Local | Trusted Local Services & Business Discovery Platform",
  description:
    "Discover reliable professionals and local businesses for your everyday needs. Verified ratings, upfront pricing & doorstep service.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full antialiased scroll-smooth"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-slate-50 font-sans"
      >
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
