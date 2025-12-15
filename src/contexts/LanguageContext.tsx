// apps/web/src/contexts/LanguageContext.tsx - UPDATED
// IMPORTANT: ENGLISH IS ALWAYS THE DEFAULT LANGUAGE
// The language should NEVER change automatically - only when user explicitly selects it
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
  const [language, setLanguage] = useState<LanguageCode>('en'); // ENGLISH IS ALWAYS THE DEFAULT
  const [isLoading, setIsLoading] = useState(true);

  // Load saved language preference - ONLY change from English if explicitly set by user
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('dream2skill-language') as LanguageCode;
      console.log('Loading language preference:', savedLang);
      
      // Only change from English if the saved language is valid and different from English
      // ENGLISH IS ALWAYS THE DEFAULT - language should not change automatically
      if (savedLang && savedLang !== 'en' && languages[savedLang]) {
        console.log('Setting language to:', savedLang);
        setLanguage(savedLang);
      } else {
        // Ensure we stay on English if no valid saved language or if it's English
        console.log('Keeping default language: English');
        setLanguage('en');
        // Clear any invalid saved language
        if (savedLang && (!languages[savedLang] || savedLang === 'en')) {
          localStorage.removeItem('dream2skill-language');
        }
      }
    } catch (error) {
      console.warn('Error loading language preference:', error);
      // Keep English as default on error
      setLanguage('en');
    }
    setIsLoading(false);
  }, []);

  // Smooth language change WITHOUT page reload
  const handleSetLanguage = useCallback((lang: LanguageCode) => {
    // Validate language code
    if (!languages[lang]) {
      console.warn('Invalid language code:', lang);
      return;
    }
    
    console.log('Changing language to:', lang);
    setLanguage(lang);
    
    // Only save to localStorage if it's not English
    // This ensures English is always the default
    if (lang === 'en') {
      localStorage.removeItem('dream2skill-language');
      console.log('Removed language preference from localStorage (using English default)');
    } else {
      localStorage.setItem('dream2skill-language', lang);
      console.log('Saved language preference to localStorage:', lang);
    }
    
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