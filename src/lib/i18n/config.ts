// apps/web/src/lib/i18n/config.ts
export const languages = {
  en: { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr' },
  hi: { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', dir: 'ltr' },
  mr: { code: 'mr', name: 'Marathi', nativeName: 'मराठी', dir: 'ltr' },
  ta: { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', dir: 'ltr' },
  te: { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', dir: 'ltr' },
  bn: { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', dir: 'ltr' },
  gu: { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', dir: 'ltr' },
  kn: { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', dir: 'ltr' },
  ml: { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', dir: 'ltr' },
  or: { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', dir: 'ltr' },
  pa: { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', dir: 'ltr' },
  ur: { code: 'ur', name: 'Urdu', nativeName: 'اردو', dir: 'rtl' },
} as const;

export type LanguageCode = keyof typeof languages;