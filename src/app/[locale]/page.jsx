import Advantages from "@/components/sections/Advantages";
import Boost from "@/components/sections/Boost";
import Categories from "@/components/sections/Categories";
import Hero from "@/components/sections/Hero";
import QA from "@/components/sections/QA";
import Service from "@/components/sections/Service";
import Suggestions from "@/components/sections/Suggestions";

export default function Home() {
  return (
    <>
      <Hero />
      <Suggestions />
      <Service />
      <Categories />
      <Advantages />
      <Boost/>
      <QA />
    </>
  );
}
