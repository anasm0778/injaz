'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import i18nConfig from '@/i18nConfig';
import { useState } from 'react';
import Image from 'next/image';

export default function LanguageChanger() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (newLocale) => {
    // const newLocale = e.target.value;

    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    // redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push('/' + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    router.refresh();
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ position: 'relative', display: 'flex' }}>
      <Image
        src="/lang-iconwebp.webp"
        alt="image"
        height={35}
        width={40}
        onClick={toggleDropdown}
        style={{ cursor: 'pointer' }}
      />
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '150%',
            left: "-20px",
            backgroundColor: 'white',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
          }}
        >
          <div onClick={() => handleChange('en')} style={{ color: "black", padding: '5px 10px', cursor: 'pointer' }}>
            English
          </div>
          <div onClick={() => handleChange('ar')} style={{ color: "black", padding: '5px 10px', cursor: 'pointer' }}>
            Arabic
          </div>
          <div onClick={() => handleChange('ru')} style={{ color: "black", padding: '5px 10px', cursor: 'pointer' }}>
            Russian
          </div>
        </div>
      )}
    </div>
  );
}