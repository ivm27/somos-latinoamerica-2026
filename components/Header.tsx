
import React, { useState } from 'react';
import { ChevronDown, AlertTriangle, Mic, Image, Video, Globe, MapPin, Moon, Sun, Radio } from 'lucide-react';
import { GLOBAL_LANGUAGES, INDIGENOUS_LANGUAGES } from '../constants';
import { useLanguage } from '../LanguageContext';

interface HeaderProps {
  onPanic: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  onCountryChange: (country: string) => void;
  selectedCountry: string;
  countries: string[];
}

const Header: React.FC<HeaderProps> = ({ onPanic, isDarkMode, toggleTheme, onCountryChange, selectedCountry, countries }) => {
  const { language, setLanguage, t, setSelectedTopic, setActiveUploadType } = useLanguage(); 
  const [activeMenu, setActiveMenu] = useState<'lang' | 'country' | 'live' | null>(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0, align: 'left' as 'left' | 'right' });

  const toggleMenu = (type: 'lang' | 'country' | 'live', e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeMenu === type) { setActiveMenu(null); return; }
    const rect = e.currentTarget.getBoundingClientRect();
    const isRightSide = rect.left > window.innerWidth / 2;
    setMenuPos({ top: rect.bottom + 8, left: isRightSide ? rect.right : rect.left, align: isRightSide ? 'right' : 'left' });
    setActiveMenu(type);
  };

  const handleLogoClick = () => { setSelectedTopic(null); onCountryChange('All Latin America'); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const buttonBaseClasses = `flex items-center gap-2 px-3 py-2 rounded-full border transition-all duration-200 text-xs font-semibold tracking-wide whitespace-nowrap ${isDarkMode ? 'bg-neutral-800/50 border-neutral-700 text-neutral-200' : 'bg-white border-gray-200 text-gray-700 shadow-sm'}`;

  return (
    <>
      <header className={`sticky top-0 z-50 border-b backdrop-blur-md ${isDarkMode ? 'bg-neutral-950/80 border-neutral-800' : 'bg-white/80 border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex flex-col cursor-pointer group" onClick={handleLogoClick}>
            <div className="flex flex-col items-start sm:flex-row sm:items-center sm:gap-1.5">
              <h1 className="text-xl sm:text-3xl font-black tracking-tighter leading-none group-hover:text-brand-orange">SOMOS</h1>
              <span className="text-[10px] sm:text-3xl font-bold sm:font-light tracking-widest sm:tracking-tight uppercase sm:normal-case">{t('latin_america')}</span>
            </div>
            <span className="text-[8px] sm:text-[11px] font-medium text-gray-500">{t('tagline1')}</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-3">
            <button onClick={(e) => toggleMenu('country', e)} className={buttonBaseClasses}>
              <MapPin size={14} className="text-brand-orange" />
              <span className="uppercase truncate max-w-[80px] sm:max-w-[140px]">{selectedCountry === 'All Latin America' ? t('country') : (t(`countries.${selectedCountry}`) || selectedCountry)}</span>
              <ChevronDown size={14} className={activeMenu === 'country' ? 'rotate-180' : ''} />
            </button>
            <button onClick={(e) => toggleMenu('lang', e)} className={buttonBaseClasses}>
              <Globe size={14} className="text-blue-500" />
              <span className="uppercase">{language}</span>
              <ChevronDown size={14} className={activeMenu === 'lang' ? 'rotate-180' : ''} />
            </button>
            <button onClick={toggleTheme} className={buttonBaseClasses}>{isDarkMode ? <Sun size={16} /> : <Moon size={16} />}</button>
            <button onClick={(e) => toggleMenu('live', e)} className={`${buttonBaseClasses} text-red-600 border-red-100`}>
              <Radio size={16} className="animate-pulse" />
              <span className="font-bold hidden sm:inline">{t('live')}</span>
            </button>
            <button onClick={onPanic} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-red-600 text-white flex items-center justify-center"><AlertTriangle size={16} /></button>
          </div>
        </div>
      </header>
      {activeMenu && <div className="fixed inset-0 z-[55]" onClick={() => setActiveMenu(null)} />}
      {activeMenu === 'country' && (
        <div className="fixed z-[60] bg-white dark:bg-neutral-900 rounded-xl shadow-2xl border border-gray-100 dark:border-neutral-800 py-1 overflow-y-auto w-64" style={{ top: menuPos.top, left: menuPos.align === 'left' ? menuPos.left : undefined, right: menuPos.align === 'right' ? window.innerWidth - menuPos.left : undefined, maxHeight: '70vh' }}>
          {countries.map(c => <button key={c} onClick={() => { onCountryChange(c); setActiveMenu(null); }} className={`w-full text-left px-4 py-2.5 text-sm ${selectedCountry === c ? 'text-brand-orange bg-orange-50 font-bold border-l-4 border-brand-orange' : 'text-gray-600 dark:text-neutral-400 hover:bg-gray-50 dark:hover:bg-neutral-800'}`}>{t(`countries.${c}`) || c}</button>)}
        </div>
      )}
      {activeMenu === 'lang' && (
        <div className="fixed z-[60] bg-white dark:bg-neutral-900 rounded-xl shadow-2xl border border-gray-100 dark:border-neutral-800 py-2 w-48" style={{ top: menuPos.top, left: menuPos.align === 'left' ? menuPos.left : undefined, right: menuPos.align === 'right' ? window.innerWidth - menuPos.left : undefined }}>
          <div className="px-4 py-1.5 text-[10px] font-bold text-gray-400 uppercase">Global</div>
          {GLOBAL_LANGUAGES.map(l => <button key={l} onClick={() => { setLanguage(l); setActiveMenu(null); }} className={`w-full text-left px-4 py-2 text-sm ${language === l ? 'text-brand-orange font-bold' : 'text-gray-600 dark:text-neutral-400 hover:bg-gray-50'}`}>{l}</button>)}
          <div className="px-4 py-1.5 text-[10px] font-bold text-gray-400 uppercase mt-2">Indigenous</div>
          {INDIGENOUS_LANGUAGES.map(l => <button key={l} onClick={() => { setLanguage(l); setActiveMenu(null); }} className={`w-full text-left px-4 py-2 text-sm ${language === l ? 'text-brand-orange font-bold' : 'text-gray-600 dark:text-neutral-400 hover:bg-gray-50'}`}>{l}</button>)}
        </div>
      )}
      {activeMenu === 'live' && (
        <div className="fixed z-[60] bg-white dark:bg-neutral-900 rounded-xl shadow-2xl border border-gray-100 py-2 w-48" style={{ top: menuPos.top, left: menuPos.align === 'left' ? menuPos.left : undefined, right: menuPos.align === 'right' ? window.innerWidth - menuPos.left : undefined }}>
          <button onClick={() => { setActiveUploadType('audio'); setActiveMenu(null); }} className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50"><Mic size={16} className="text-red-500" /> {t('upload_audio')}</button>
          <button onClick={() => { setActiveUploadType('photo'); setActiveMenu(null); }} className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50"><Image size={16} className="text-blue-500" /> {t('upload_photos')}</button>
          <button onClick={() => { setActiveUploadType('video'); setActiveMenu(null); }} className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50"><Video size={16} className="text-green-500" /> {t('upload_video')}</button>
        </div>
      )}
    </>
  );
};
export default Header;
