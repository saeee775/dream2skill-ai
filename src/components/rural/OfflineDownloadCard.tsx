// apps/web/src/components/rural/OfflineDownloadCard.tsx
'use client';

import { Download, Check, WifiOff, Clock, PlayCircle } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface OfflineDownloadCardProps {
  title: string;
  description?: string;
  size: string;
  lessonsCount: number;
  duration: string;
  progress?: number;
  onDownload: () => Promise<void>;
}

export function OfflineDownloadCard({ 
  title,
  description,
  size, 
  lessonsCount,
  duration,
  progress = 0,
  onDownload 
}: OfflineDownloadCardProps) {
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const { t } = useLanguage();

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await onDownload();
      setIsDownloaded(true);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border border-cyan-500/20 rounded-xl p-5 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
              <PlayCircle className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-1">{title}</h3>
              {description && (
                <p className="text-gray-400 text-sm mb-2">{description}</p>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <WifiOff className="w-3 h-3" />
              {size}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {duration}
            </span>
            <span>{lessonsCount} {t('common.lessons')}</span>
          </div>
          
          {progress > 0 && (
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <button
            onClick={handleDownload}
            disabled={isDownloaded || isDownloading}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 whitespace-nowrap ${
              isDownloaded
                ? 'bg-green-500/20 text-green-400 border border-green-500/30 cursor-default'
                : isDownloading
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg hover:shadow-cyan-500/25'
            }`}
          >
            {isDownloaded ? (
              <>
                <Check className="w-4 h-4" />
                {t('common.downloaded')}
              </>
            ) : isDownloading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                {t('common.downloading')}
              </span>
            ) : (
              <>
                <Download className="w-4 h-4" />
                {t('common.download')}
              </>
            )}
          </button>
          
          {!isDownloaded && (
            <span className="text-xs text-gray-500">
              {t('features.offline.desc')}
            </span>
          )}
        </div>
      </div>
      
      {isDownloaded && (
        <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
          <p className="text-green-400 text-sm flex items-center gap-2">
            <Check className="w-4 h-4" />
            {t('common.availableOffline')}
          </p>
        </div>
      )}
    </div>
  );
}