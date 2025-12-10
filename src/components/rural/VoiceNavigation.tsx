// apps/web/src/components/rural/VoiceNavigation.tsx
'use client';

import { Mic, MicOff, Volume2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export function VoiceNavigation() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const { t } = useLanguage();

  const handleVoiceCommand = () => {
    if (!isSupported) {
      alert('Voice navigation is not supported in your browser');
      return;
    }

    setIsListening(true);
    
    // Simulate voice recognition (replace with actual Web Speech API)
    setTimeout(() => {
      setIsListening(false);
      
      // Simulated responses in different languages
      const commands = [
        t('nav.courses'),
        t('nav.home'),
        t('dashboard.welcome'),
        "Search for farming courses",
        "Download offline lessons",
        "Change language to Hindi",
      ];
      
      const randomCommand = commands[Math.floor(Math.random() * commands.length)];
      setTranscript(randomCommand);
      
      // Clear transcript after 3 seconds
      setTimeout(() => setTranscript(''), 3000);
      
      // Simulate action based on command
      if (randomCommand.includes('courses')) {
        // router.push('/learning');
      } else if (randomCommand.includes('home')) {
        // router.push('/');
      }
    }, 2000);
  };

  // Check for browser support
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      setIsSupported(!!SpeechRecognition);
    }
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        <button
          onClick={handleVoiceCommand}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110 ${
            isListening
              ? 'bg-red-500 animate-pulse shadow-red-500/50'
              : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-purple-500/50'
          }`}
          aria-label="Voice navigation"
        >
          {isListening ? (
            <MicOff className="w-6 h-6 text-white" />
          ) : (
            <Mic className="w-6 h-6 text-white" />
          )}
        </button>
        
        {transcript && (
          <div className="absolute bottom-full right-0 mb-3 w-72 p-4 bg-gray-900/95 backdrop-blur-xl border border-purple-500/20 rounded-lg shadow-2xl animate-fadeIn">
            <div className="flex items-center gap-2 mb-2">
              <Volume2 className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400 text-sm font-medium">
                {t('features.voice.title')}
              </span>
            </div>
            <p className="text-white text-sm">"{transcript}"</p>
            <div className="mt-2 text-xs text-gray-400">
              Processing your command...
            </div>
            <div className="absolute bottom-0 right-4 translate-y-1/2 rotate-45 w-3 h-3 bg-gray-900 border-r border-b border-purple-500/20"></div>
          </div>
        )}
      </div>
      
      {!isSupported && (
        <div className="mt-2 text-xs text-gray-400 text-center max-w-[60px] mx-auto">
          Voice not supported
        </div>
      )}
    </div>
  );
}