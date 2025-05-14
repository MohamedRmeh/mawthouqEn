import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",
  localePrefix: "always", // أضف هذه السطر
  pathnames: {
    "/": "/",
    "/pathnames": {
      de: "/pfadnamen",
    },
  },
});
