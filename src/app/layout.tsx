import type { Metadata } from "next";
import { Header } from "@/app/componentsHomePage/header";
import "./globals.css";
import { inter } from "./fonts";
import { ClientProviders } from "@/providers/client-providers";
import { BinanceProvider } from "@/contexts/BinanceContext";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/react";
export const metadata: Metadata = {
  title: "JBean - AI-Driven Crypto Predictions",
  description: "Make smarter crypto predictions with AI-powered insights",
};

function MobileOverlay() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-6 text-center bg-background-primary">
      <div className="absolute inset-0 bg-gradient-page opacity-50" />
      <div className="relative z-10">
        <h2 className="text-2xl font-bold text-content-primary mb-4">
          Mobile Version Coming Soon
        </h2>
        <p className="text-content-secondary max-w-md">
          JBEAN is currently optimized for desktop and tablet devices. Please
          access the platform from a larger screen for the best experience.
        </p>
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Common trading pairs we might want to track
  const commonPairs = ["BTCUSD", "ETHUSD", "XRPUSD", "SOLUSD", "ADAUSD"];

  return (
    <html lang="en" className={inter.variable}>
      <Analytics />
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <BinanceProvider symbols={commonPairs}>
            <ClientProviders>
              <div className="min-[724px]:block hidden pt-[56px] bg-[linear-gradient(135deg,#0f1419_0%,#1a0f28_30%,#0f1419_50%,#251510_70%,#0f1419_100%)]">
                <Header />
                {children}
              </div>
              <div className="min-[724px]:hidden block">
                <MobileOverlay />
              </div>
            </ClientProviders>
          </BinanceProvider>
        </Providers>
      </body>
    </html>
  );
}
