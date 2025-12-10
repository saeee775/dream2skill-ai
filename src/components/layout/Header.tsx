// apps/web/src/components/layout/Header.tsx
'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSelector } from '@/components/ui/LanguageSelector';
import { Menu, X, User, Home, BookOpen, PlayCircle, LogOut } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-cyan-500/20 supports-[backdrop-filter]:bg-black/60">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
              <span className="text-white font-bold text-lg">D2S</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent leading-tight">
                Dream2Skill AI
              </span>
              <span className="text-xs text-gray-400">For Rural India</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/" 
              className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-cyan-500/10"
            >
              <Home className="w-4 h-4" />
              {t('nav.home')}
            </Link>
            <Link 
              href="/learning" 
              className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-cyan-500/10"
            >
              <BookOpen className="w-4 h-4" />
              {t('nav.courses')}
            </Link>
            <Link 
              href="/demo" 
              className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-cyan-500/10"
            >
              <PlayCircle className="w-4 h-4" />
              {t('nav.demo')}
            </Link>
            
            {/* Language Selector */}
            <div className="ml-2">
              <LanguageSelector />
            </div>
            
            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center gap-3">
                <Link 
                  href="/dashboard" 
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                >
                  <User className="w-4 h-4" />
                  {t('nav.dashboard')}
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg border border-red-500/20 text-red-400 hover:border-red-500/40 hover:bg-red-500/10 transition-all"
                >
                  {t('nav.logout')}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link 
                  href="/auth/login" 
                  className="px-4 py-2 rounded-lg border border-cyan-500/20 text-cyan-400 hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all"
                >
                  {t('nav.login')}
                </Link>
                <Link 
                  href="/auth/register" 
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                >
                  {t('nav.register')}
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-cyan-400" />
            ) : (
              <Menu className="w-6 h-6 text-cyan-400" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-cyan-500/20 pt-4 animate-slideDown">
            <div className="flex flex-col gap-2">
              <Link 
                href="/" 
                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-cyan-500/10 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="w-5 h-5" />
                {t('nav.home')}
              </Link>
              <Link 
                href="/learning" 
                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-cyan-500/10 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <BookOpen className="w-5 h-5" />
                {t('nav.courses')}
              </Link>
              <Link 
                href="/demo" 
                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-cyan-500/10 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <PlayCircle className="w-5 h-5" />
                {t('nav.demo')}
              </Link>
              
              <div className="px-4 py-3">
                <div className="mb-2 text-sm text-cyan-400 font-medium">Language</div>
                <LanguageSelector />
              </div>
              
              {user ? (
                <>
                  <Link 
                    href="/dashboard" 
                    className="flex items-center gap-3 px-4 py-3 text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    {t('nav.dashboard')}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-left"
                  >
                    <LogOut className="w-5 h-5" />
                    {t('nav.logout')}
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/auth/login" 
                    className="px-4 py-3 text-center border border-cyan-500/20 text-cyan-400 hover:border-cyan-500/40 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.login')}
                  </Link>
                  <Link 
                    href="/auth/register" 
                    className="px-4 py-3 text-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.register')}
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}