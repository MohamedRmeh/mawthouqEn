import Advantages from "@/components/sections/Advantages";
import Boost from "@/components/sections/Boost";
import Categories from "@/components/sections/Categories";
import Hero from "@/components/sections/Hero-Section/Hero";
import QA from "@/components/sections/QA";
import Service from "@/components/sections/Service";
import Suggestions from "@/components/sections/Suggestions";
import { getSectionTranslations } from "@/components/lib/getSectionTranslations";
import { headers } from "next/headers";

export default async function Home() {
  const headersList = await headers();
  const locale = headersList.get("x-next-intl-locale") || "en";
  const heroTexts = await getSectionTranslations("hero", locale);
  const suggestionsTexts = await getSectionTranslations("suggestions", locale);
  const serviceTexts = await getSectionTranslations("service", locale);
  const categoriesTexts = await getSectionTranslations("categories", locale);
  const advantagesTexts = await getSectionTranslations("advantages", locale);
  const boostTexts = await getSectionTranslations("boost", locale);
  const qaTexts = await getSectionTranslations("qa", locale);

  return (
    <>
      <Hero texts={heroTexts} />
      <Suggestions texts={suggestionsTexts} />
      <Service texts={serviceTexts} />
      <Categories texts={categoriesTexts} />
      <Advantages texts={advantagesTexts} />
      <Boost texts={boostTexts} />
      <QA texts={qaTexts} />
    </>
  );
}
