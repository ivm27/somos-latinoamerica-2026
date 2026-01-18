import React, { useState, useEffect } from 'react';
import { 
  MapPin, CheckCircle, Globe, MessageSquare, Share2, ShieldCheck, 
  EyeOff, MoreHorizontal, ChevronDown, Send, User, Mail, 
  Facebook, Linkedin, ImageIcon, Code, Copy, Check, Loader2 
} from 'lucide-react';
import { Article } from '../types';
import { GLOBAL_LANGUAGES, INDIGENOUS_LANGUAGES } from '../constants';
import { useLanguage } from '../LanguageContext';

const NewsCard: React.FC<{ article: Article }> = React.memo(({ article }) => {
  const [isTranslateOpen, setIsTranslateOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { t, language, changeLanguage } = useLanguage();

  // Mapping display names to the exact codes in your i18n setup
  const onLanguageSelect = (lang: string) => {
    let langCode = 'es';
    if (lang === 'English') langCode = 'en';
    if (lang === 'Deutsch') langCode = 'de';
    if (lang === 'Français' || lang === 'French') langCode = 'fr';
    if (lang === 'Portuguese') langCode = 'pt';
    
    changeLanguage(langCode);
    setIsTranslateOpen(false);
  };

  return (
    <article className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-800 flex flex-col h-full overflow-hidden">
      <div className="relative h-56 bg-gray-100">
        <img 
          src={article.image || 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80&w=800'} 
          alt={article.title} 
          className="w-full h-full object-cover" 
          onError={(e) => (e.currentTarget.src = 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80&w=800')}
        />
        <div className="absolute top-4 left-4">
             <span className="px-2.5 py-1 bg-brand-orange text-white text-[10px] font-bold uppercase rounded-md">{article.category}</span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-xl font-bold text-gray-900 dark:text-neutral-200 mb-3 line-clamp-3">{article.title}</h2>
        <div className="flex items-center text-gray-400 text-[10px] font-semibold mb-4">
            <span>📅 {article.date || '18/01/2026'}</span>
        </div>
        <div className="mb-6 flex-grow">
            <p className={`text-gray-600 dark:text-neutral-400 text-sm leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}>
              {article.description}
            </p>
            <button onClick={() => setIsExpanded(!isExpanded)} className="text-brand-orange text-xs font-bold mt-2 flex items-center gap-1">
                {isExpanded ? t('read_less') : t('read_more')} <ChevronDown size={12} className={isExpanded ? 'rotate-180' : ''} />
            </button>
        </div>

        <div className="flex flex-col gap-4 mt-auto">
            <div className="flex items-center justify-between">
                <div className="relative">
                    <button onClick={() => setIsTranslateOpen(!isTranslateOpen)} className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-50 dark:bg-neutral-800 text-gray-600 dark:text-neutral-400">
                        <Globe size={12} /> <span>{language.toUpperCase()}</span> <ChevronDown size={12} />
                    </button>
                    {isTranslateOpen && (
                        <div className="absolute bottom-full left-0 mb-2 w-48 bg-white dark:bg-neutral-900 rounded-xl shadow-xl border border-gray-100 dark:border-neutral-800 py-2 z-50">
                             {['Original', 'English', 'Deutsch', 'Français', 'Portuguese'].map(lang => (
                                 <div key={lang} onClick={() => onLanguageSelect(lang)} className="px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-neutral-800 cursor-pointer text-gray-700 dark:text-neutral-300">{lang}</div>
                             ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="pt-3 border-t border-gray-50 dark:border-neutral-800 flex justify-between items-center text-[10px] text-gray-400 font-medium">
               <span>{t('source')}: <span className="text-gray-600 dark:text-neutral-400 font-bold">{article.source}</span></span>
            </div>
        </div>
      </div>
    </article>
  );
});

export default NewsCard;