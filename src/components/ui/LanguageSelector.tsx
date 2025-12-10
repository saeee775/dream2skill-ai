// apps/web/src/components/ui/LanguageSelector.tsx - UPDATED
'use client';

import { Globe, ChevronDown, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export function LanguageSelector() {
  const { language, setLanguage, availableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLanguage = availableLanguages[language];

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode as any);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 group"
        aria-label="Select language"
      >
        <Globe className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
        <span className="text-white font-medium">
          {currentLanguage.nativeName}
        </span>
        <ChevronDown className={`w-4 h-4 text-cyan-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-64 bg-gray-900/95 backdrop-blur-xl border border-cyan-500/20 rounded-lg shadow-2xl shadow-cyan-500/10 py-2 z-50 max-h-80 overflow-y-auto animate-fadeIn">
          <div className="px-3 py-2">
            <h3 className="text-sm text-cyan-400 font-medium mb-2">Select Language</h3>
          </div>
          
          {Object.values(availableLanguages).map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full px-4 py-3 text-left hover:bg-cyan-500/10 transition-colors flex items-center justify-between ${
                language === lang.code ? 'bg-cyan-500/10' : ''
              }`}
            >
              <div className="flex flex-col items-start">
                <span className="text-white font-medium">{lang.nativeName}</span>
                <span className="text-gray-400 text-sm">{lang.name}</span>
              </div>
              
              {language === lang.code && (
                <Check className="w-4 h-4 text-cyan-400" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}