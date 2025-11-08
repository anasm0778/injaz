import React from "react";
import PrivacyPolicy from "@/app/user/privacyPolicy/PrivacyPolicy";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";

const i18nNamespaces = ["landingPage"];

const page = async ({ params: { locale } }: any) => {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <PrivacyPolicy />
    </TranslationsProvider>
  );
};

export default page;
