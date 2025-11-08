import React from "react";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import SignUp from "@/app/adminpage/signin_signup/signup/SignUp";
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
        <SignUp />
      </TranslationsProvider>
    </>
  );
};

export default page;
