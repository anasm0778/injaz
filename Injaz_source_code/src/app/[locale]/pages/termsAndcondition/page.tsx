import React from "react";
import initTranslations from "@/app/i18n";
import TermsAndCondition from "@/app/user/termsAndCondition/TermsAndCondition";
import TranslationsProvider from "@/components/TranslationsProvider";

const i18nNamespaces = ["landingPage"];

const page = async ({ params: { locale } }: any) => {
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <>
      <TranslationsProvider
        namespaces={i18nNamespaces}
        locale={locale}
        resources={resources}
      >
        <TermsAndCondition />
      </TranslationsProvider>
    </>
  );
};

export default page;
