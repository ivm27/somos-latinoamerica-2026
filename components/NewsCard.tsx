import React, { useState, useEffect } from 'react';
import { 
  MapPin, CheckCircle, Globe, MessageSquare, Share2, ShieldCheck, 
  EyeOff, MoreHorizontal, ChevronDown, Send, User, Mail, 
  Facebook, Linkedin, ImageIcon, Code, Copy, Check, Loader2 
} from 'lucide-react';
import { Article } from '../types';
import { GLOBAL_LANGUAGES, INDIGENOUS_LANGUAGES } from '../constants';
import { useLanguage } from '../LanguageContext';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Re-using your custom SVG icons
const BlueskyIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 566 500" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
     <path d="M135.72 44.03c66.496 49.921 113.224 118.839 124.28 155.475 2.601 8.621 4.644 15.179 5.99 21.047 1.346-5.868 3.389-12.426 5.99-21.047 11.056-36.636 57.784-105.554 124.28-155.475 23.243-17.448 135.723-97.051 135.723-12.027 0 26.304-4.253 44.185-9.715 57.175-19.462 46.289-98.384 128.718-124.779 152.884-38.22 34.994-67.434 26.473-20.725 106.775 30.739 52.85 91.564 96.657 122.39 100.957 26.34 3.674 48.973 1.04 43.197-30.081-3.329-17.935-13.623-28.761-19.896-33.879-43.136-35.19-86.328-36.31-103.543-30.569-42.502 14.175-35.592 73.742 22.846 64.954 62.463-9.395 117.84-51.758 134.137-123.288 1.487-6.529 6.25-33.229 2.064-59.563-8.834-55.572-51.488-84.18-87.892-93.571-33.72-8.7-72.336 2.09-106.84 31.81-42.368 36.495-81.565 89.263-100.34 114.735l-15 20.25-15-20.25c-18.775-25.472-57.972-78.24-100.34-114.735-34.504-29.72-73.12-40.51-106.84-31.81-36.404 9.391-79.058 37.999-87.892 93.571-4.186 26.334.577 53.034 2.064 59.563 16.297 71.53 71.674 113.893 134.137 123.288 58.438 8.788 65.348-50.779 22.846-64.954-17.215-5.741-60.407-4.621-103.543 30.569-6.273 5.118-16.567 15.944-19.896 33.879-5.776 31.121 16.857 33.755 43.197 30.081 30.826-4.3 91.651-48.107 122.39-100.957 46.709-80.302 17.495-71.781-20.725-106.775-26.395-24.166-105.317-106.595-124.779-152.884-5.462-12.99-9.715-30.871-9.715-57.175 0-85.024 112.48-5.421 135.723 12.027z"/>
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const TelegramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm5.86 8.085-2.004 9.42c-.15.656-.532.818-1.076.51l-2.978-2.193-1.438 1.385c-.159.158-.293.293-.601.293l.215-3.03 5.517-4.992c.24-.213-.053-.332-.373-.12l-6.819 4.292-2.937-.92c-.639-.201-.652-.64.134-.95l11.474-4.425c.531-.192.996.12.887.73z"/>
  </svg>
);

const CommentsSection = React.memo(({ t }: { t: any }) => {
  const [inputValue, setInputValue] = useState("");
  const comments = [
    { id: 1, user: "Ana M.", text: "¡Es hora de que el gobierno escuche!", time: "5m" },
    { id: 2, user: "Carlos R.", text: "Compartiendo esto ahora mismo. Es vital.", time: "12m" }
  ];

  return (
    <div className="pt-4 border-t border-gray-100 dark:border-neutral-800 animate-in fade-in slide-in-from-top-1 duration-200" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-bold text-gray-900 dark:text-neutral-300 uppercase tracking-wide">{t('comments.title')}</h4>
            <span className="text-[10px] font-bold text-gray-500 dark:text-neutral-500 bg-gray-100 dark:bg-neutral-800 px-2 py-0.5 rounded-full">2</span>
        </div>
        <div className="space-y-4 mb-4">
            {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3 items-start">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-neutral-800 dark:to-neutral-700 flex items-center justify-center flex-shrink-0 text-gray-500 dark:text-neutral-400 border border-gray-100 dark:border-neutral-700">
                        <User size={14} />
                    </div>
                    <div className="flex-1 bg-gray-50 dark:bg-neutral-800/50 rounded-r-xl rounded-bl-xl p-3">
                        <div className="flex items-baseline justify-between mb-1">
                            <span className="text-xs font-bold text-gray-900 dark:text-neutral-200">{comment.user}</span>
                            <span className="text-[10px] text-gray-400 dark:text-neutral-500">{comment.time}</span>
                        </div>
                        <p className="text-xs text-gray-700 dark:text-neutral-400 leading-relaxed">{comment.text}</p>
                    </div>
                </div>
            ))}
        </div>
        <div className="relative flex items-center group">
            <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={t('comments.placeholder')} 
                className="w-full pl-4 pr-10 py-2.5 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-full text-xs text-gray-900 dark:text-neutral-200 focus:outline-none focus:ring-1 focus:ring-brand-orange focus:border-brand-orange transition-all shadow-sm group-hover:border-gray-300 dark:group-hover:border-neutral-600 placeholder:text-gray-400"
            />
            <button className="absolute right-1.5 p-1.5 bg-brand-orange text-white rounded-full hover:bg-orange-700 transition-colors shadow-sm">
                <Send size={12} />
            </button>
        </div>
    </div>
  );
});

const NewsCard: React.FC<{ article: Article }> = React.memo(({ article }) => {
  const [isTranslateOpen, setIsTranslateOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Original');
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedContent, setTranslatedContent] = useState<{title: string, description: string} | null>(null);
  
  const { t } = useLanguage();

  // FIX: These names now match the "SANITIZED DATA" properties from App.tsx
  const displayTitle = translatedContent?.title || article.title;
  const displayDescription = translatedContent?.description || article.description;

  useEffect(() => {
    const handleTranslation = async () => {
      if (selectedLanguage === 'Original' || GLOBAL_LANGUAGES.includes(selectedLanguage as any)) {
        setTranslatedContent(null);
        return;
      }
      if (INDIGENOUS_LANGUAGES.includes(selectedLanguage as any)) {
        setIsTranslating(true);
        try {
          const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
          const genAI = new GoogleGenerativeAI(apiKey);
          const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

          const prompt = `Translate this news article into ${selectedLanguage}. 
          Return ONLY JSON: {"title": "...", "description": "..."}
          Title: "${article.title}"
          Description: "${article.description}"`;

          const result = await model.generateContent(prompt);
          const response = await result.response;
          const text = response.text().replace(/```json|```/gi, "").trim();
          const parsedResult = JSON.parse(text);
          if (parsedResult.title && parsedResult.description) {
            setTranslatedContent(parsedResult);
          }
        } catch (error) {
          console.error("Translation Error:", error);
        } finally {
          setIsTranslating(false);
        }
      }
    };
    handleTranslation();
  }, [selectedLanguage, article.title, article.description]);

  const shareOptions = [
    { name: 'Bluesky', icon: BlueskyIcon, bg: 'bg-[#0560FF] dark:bg-[#0560FF]/60' }, 
    { name: 'Email', icon: Mail, bg: 'bg-gray-500 dark:bg-neutral-600' },
    { name: 'Embed', icon: Code, bg: 'bg-gray-800 dark:bg-neutral-700' },
    { name: 'Facebook', icon: Facebook, bg: 'bg-[#1877F2] dark:bg-[#1877F2]/60' },
    { name: 'LinkedIn', icon: Linkedin, bg: 'bg-[#0A66C2] dark:bg-[#0A66C2]/60' },
    { name: 'Telegram', icon: TelegramIcon, bg: 'bg-[#0088cc] dark:bg-[#0088cc]/60' },
    { name: 'WhatsApp', icon: WhatsAppIcon, bg: 'bg-[#25D366] dark:bg-[#25D366]/60' },
    { name: 'X', icon: XIcon, bg: 'bg-black dark:bg-black' },
  ];

  const handleShare = (platform: string) => {
    let url = '';
    const text = displayTitle;
    const currentUrl = article.url || '';
    switch(platform) {
        case 'Embed':
            navigator.clipboard.writeText(`<iframe src="${currentUrl}" width="500" height="600"></iframe>`);
            setCopied(true); setTimeout(() => setCopied(false), 2000); return;
        case 'WhatsApp': url = `https://wa.me/?text=${encodeURIComponent(text + ' ' + currentUrl)}`; break;
        case 'Facebook': url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`; break;
        case 'X': url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(text)}`; break;
        case 'LinkedIn': url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`; break;
        case 'Email': url = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(currentUrl)}`; break;
        case 'Telegram': url = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(text)}`; break;
        case 'Bluesky': url = `https://bsky.app/intent/compose?text=${encodeURIComponent(text + ' ' + currentUrl)}`; break;
    }
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <article 
        onClick={() => article.url && window.open(article.url, '_blank')}
        className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer group relative overflow-hidden"
    >
      <div className="relative h-56 overflow-hidden bg-gray-100 dark:bg-neutral-800">
        {imageError ? (
            <div className="w-full h-full flex items-center justify-center text-gray-300"><ImageIcon size={48} /></div>
        ) : (
            <img src={article.image} alt={article.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-700" onError={() => setImageError(true)} />
        )}
        <div className="absolute top-4 left-4">
             <span className="px-2.5 py-1 bg-brand-orange text-white text-[10px] font-black uppercase rounded-md shadow-sm">{article.category}</span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h2 className={`text-xl font-bold text-gray-900 dark:text-neutral-200 mb-3 line-clamp-3 group-hover:text-brand-orange transition-all ${isTranslating ? 'blur-sm opacity-50' : ''}`}>
          {displayTitle}
        </h2>

        <div className="flex items-center text-gray-400 text-[10px] font-semibold mb-4 gap-2">
            <span>📅 {article.date}</span>
            {isTranslating && <span className="ml-auto flex items-center gap-1 text-brand-orange animate-pulse"><Loader2 size={10} className="animate-spin" /> AI Translating...</span>}
        </div>

        <div className="mb-6 flex-grow">
            <p className={`text-gray-600 dark:text-neutral-400 text-sm leading-relaxed transition-all ${isTranslating ? 'blur-sm opacity-50' : ''} ${isExpanded ? '' : 'line-clamp-3'}`}>
              {displayDescription}
            </p>
            <button onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }} className="text-brand-orange text-xs font-bold mt-2 flex items-center gap-1">
                {isExpanded ? t('read_less') : t('read_more')} <ChevronDown size={12} className={isExpanded ? 'rotate-180' : ''} />
            </button>
        </div>

        <div className="flex flex-col gap-4 mt-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
                <div className="relative">
                    <button onClick={() => setIsTranslateOpen(!isTranslateOpen)} className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-50 dark:bg-neutral-800/50 border border-gray-100 dark:border-neutral-700 text-gray-600 dark:text-neutral-400">
                        <Globe size={12} /> <span className="max-w-[80px] truncate">{selectedLanguage}</span> <ChevronDown size={12} className={isTranslateOpen ? 'rotate-180' : ''} />
                    </button>
                    {isTranslateOpen && (
                        <div className="absolute bottom-full left-0 mb-2 w-48 bg-white dark:bg-neutral-900 rounded-xl shadow-xl border border-gray-100 dark:border-neutral-800 py-2 max-h-60 overflow-y-auto z-50">
                             {['Original', ...GLOBAL_LANGUAGES, ...INDIGENOUS_LANGUAGES].map(lang => (
                                 <div key={lang} onClick={() => { setSelectedLanguage(lang); setIsTranslateOpen(false); }} className="px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-neutral-800 cursor-pointer text-gray-700 dark:text-neutral-300">{lang}</div>
                             ))}
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2 relative">
                    <button onClick={() => setIsCommentsOpen(!isCommentsOpen)} className={`p-2 rounded-full ${isCommentsOpen ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}><MessageSquare size={16} /></button>
                    <button onClick={() => setIsShareOpen(!isShareOpen)} className={`p-2 rounded-full ${isShareOpen ? 'bg-green-50 text-green-600' : 'text-gray-400 hover:text-gray-600'}`}><Share2 size={16} /></button>
                    
                    {isShareOpen && (
                        <div className="absolute bottom-full right-0 mb-3 w-[290px] bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-neutral-800 p-4 z-50" onClick={(e) => e.stopPropagation()}>
                            <div className="grid grid-cols-4 gap-4 mb-4">
                            {shareOptions.map((opt) => (
                                <button key={opt.name} onClick={() => handleShare(opt.name)} className="flex flex-col items-center gap-1.5">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${opt.bg}`}><opt.icon size={20} /></div>
                                    <span className="text-[10px] text-gray-500">{opt.name}</span>
                                </button>
                            ))}
                            </div>
                            <div className="flex items-center bg-gray-50 dark:bg-neutral-800 rounded-xl p-1.5 border border-gray-200">
                                <input readOnly value={article.url} className="flex-1 px-3 bg-transparent border-none text-xs text-gray-600 truncate" />
                                <button onClick={() => { navigator.clipboard.writeText(article.url); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className={`px-3 py-1.5 rounded-lg text-xs font-bold text-white ${copied ? 'bg-emerald-500' : 'bg-blue-500'}`}>{copied ? <Check size={14} /> : <Copy size={14} />}</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {isCommentsOpen && <CommentsSection t={t} />}
            <div className="pt-3 border-t border-gray-50 dark:border-neutral-800 flex justify-between items-center text-[10px] text-gray-400 font-medium">
               <span>{t('source')}: <span className="text-gray-600 dark:text-neutral-400 font-bold">{article.source}</span></span>
               <MoreHorizontal size={14} />
            </div>
        </div>
      </div>
    </article>
  );
});

export default NewsCard;