import React from "react";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import NewFaq from "@/app/user/newFaq/NewFaq";

const i18nNamespaces = ["landingPage"];

const page = async({ params: { locale } }: any) => {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <>
      <TranslationsProvider
        namespaces={i18nNamespaces}
        locale={locale}
        resources={resources}
      >
        <NewFaq />
      </TranslationsProvider>
    </>
  );
};

export default page;
