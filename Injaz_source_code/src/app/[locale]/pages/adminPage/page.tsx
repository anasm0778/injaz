import React from "react";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import AdminPageLogic from "@/app/adminpage";
import AdminHome from "@/app/adminpage/AdminHome";

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
        <AdminPageLogic>
          <AdminHome />
        </AdminPageLogic>
      </TranslationsProvider>
    </>
  );
};

export default page;
