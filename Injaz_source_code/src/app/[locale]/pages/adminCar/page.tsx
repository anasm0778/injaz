import React from "react";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import AdminCars from "@/app/adminpage/pages/admin_cars/AdminCars";

const i18nNamespaces = ["landingPage"];

const page = async ({ params: { locale } }: any) => {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <>
      <TranslationsProvider
        namespaces={i18nNamespaces}
        locale={locale}
        resources={resources}
      >
        <AdminCars />
      </TranslationsProvider>
    </>
  );
};

export default page;
