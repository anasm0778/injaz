import React from "react";
import Services from "@/app/user/services/Services";
import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "@/app/i18n";

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
        <Services />
      </TranslationsProvider>
    </>
  );
};

export default page;

