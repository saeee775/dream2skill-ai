// apps/web/src/contexts/LanguageContext.tsx - UPDATED
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { LanguageCode, languages } from '@/lib/i18n/config';
import { translations } from '@/lib/i18n/translations';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  availableLanguages: typeof languages;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [isLoading, setIsLoading] = useState(true);

  // Load saved language preference
  useEffect(() => {
    const savedLang = localStorage.getItem('dream2skill-language') as LanguageCode;
    if (savedLang && languages[savedLang]) {
      setLanguage(savedLang);
    }
    setIsLoading(false);
  }, []);

  // Smooth language change WITHOUT page reload
  const handleSetLanguage = useCallback((lang: LanguageCode) => {
    setLanguage(lang);
    localStorage.setItem('dream2skill-language', lang);
    
    // Update HTML lang and dir attributes
    document.documentElement.lang = lang;
    if (lang === 'ur') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
    
    // Optional: You could trigger a custom event for components to listen to
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
  }, []);

  // Translation function with nested key support
  const t = useCallback((key: string): string => {
    if (isLoading) return key;
    
    const keys = key.split('.');
    let value: any = translations[language];
    
    // Navigate through nested object
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if key not found
        let enValue: any = translations.en;
        for (const enK of keys) {
          enValue = enValue?.[enK];
        }
        return enValue || key;
      }
    }
    
    return value || key;
  }, [language, isLoading]);

  // Set HTML lang attribute on initial load
  useEffect(() => {
    if (!isLoading) {
      document.documentElement.lang = language;
      if (language === 'ur') {
        document.documentElement.dir = 'rtl';
      }
    }
  }, [language, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-cyan-400">Loading...</div>
      </div>
    );
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        t,
        availableLanguages: languages,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}