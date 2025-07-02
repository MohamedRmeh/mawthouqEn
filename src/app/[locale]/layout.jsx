import { notFound } from "next/navigation";
import { Inter, Almarai } from "next/font/google";
import { clsx } from "clsx";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import AOSProvider from "@/components/lib/AOSProvider";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const almarai = Almarai({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "LocaleLayout" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout(props) {
  const { children, params } = props;
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const isArabic = locale === "ar";

  return (
    <html lang={locale} dir={isArabic ? "rtl" : "ltr"}>
      <body
        className={clsx(
          isArabic ? almarai.variable : inter.variable,
          "flex flex-col min-h-screen"
        )}
      >
        <NextIntlClientProvider locale={locale}>
          <Navbar />
          <main className="antialiased relative flex-1 overflow-hidden">
            <AOSProvider>{children}</AOSProvider>
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
