import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Inter, Playfair_Display } from "next/font/google";
import "../globals.css";
import Footer from "../components/Footer";
import AnnouncementBar from "../components/AnnouncementBar";
import Header from "../components/Header";
import PromoPopup from "../components/PromoPopup";
import { routing } from "@/i18n/routing";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MOVIRTE — Carrying Heritage Forward",
  description:
    "Contemporary fashion that tells a story. Shop the latest collection from MOVIRTE.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className={`${inter.variable} ${playfair.variable}`}>
        <AnnouncementBar />
        <Header />
        <main>{children}</main>
        <Footer />
        <PromoPopup />
      </div>
    </NextIntlClientProvider>
  );
}
