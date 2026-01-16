import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../LanguageContext'; 
import { ChevronDown } from 'lucide-react';

const Navigation: React.FC = () => {
  const { t, language, selectedTopic, setSelectedTopic } = useLanguage();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownPos, setDropdownPos] = useState<{top: number, left: number} | null>(null);

  const tabKeys = ['Arte', 'Ciencias', 'Clima', 'Comunidades', 'Deportes', 'Derechos', 'Educacion', 'LGBTQ', 'Negocios', 'Politica', 'Salud'];
  const businessFilters = ['economy', 'finance', 'markets', 'technology'];
  const artFilters = ['dance', 'film', 'literature', 'music', 'television', 'theater', 'visual_arts'];

  const sortedTabs = useMemo(() => {
    return tabKeys.map(key => ({ key, label: t(`tabs.${key}`) })).sort((a, b) => a.label.localeCompare(b.label));
  }, [language, t]);

  const handleTabClick = (key: string, e: React.MouseEvent<HTMLButtonElement>) => {
    const isDropdownTab = key === 'Negocios' || key === 'Arte';
    if (!isDropdownTab) {
      setSelectedTopic(selectedTopic === key ? null : key);
      setActiveDropdown(null);
      return;
    }
    
    e.stopPropagation();
    if (activeDropdown === key) {
      setActiveDropdown(null);
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      setActiveDropdown(key);
      setDropdownPos({ top: rect.bottom + window.scrollY + 4, left: rect.left });
    }
  };

  useEffect(() => {
    const close = () => { setActiveDropdown(null); };
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, []);

  return (
    <>
      <nav className="sticky top-[4rem] sm:top-[5rem] z-40 bg-white/90 dark:bg-neutral-950/90 backdrop-blur border-b border-gray-100 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 py-2 w-full">
            {sortedTabs.map(({ key, label }) => {
              const isSelected = selectedTopic === key || selectedTopic?.startsWith(`${key}-`);
              const isDropdownActive = activeDropdown === key;
              const activeClass = "bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-neutral-100 font-bold shadow-sm ring-1 ring-gray-200";
              const inactiveClass = "text-gray-600 dark:text-neutral-400 hover:bg-gray-50";
              return (
                <button key={key} onClick={(e) => handleTabClick(key, e)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 flex-shrink-0 ${isSelected || isDropdownActive ? activeClass : inactiveClass}`}>
                  {label}
                  {(key === 'Negocios' || key === 'Arte') && <ChevronDown size={14} className={isDropdownActive ? 'rotate-180' : ''} />}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
      {activeDropdown && dropdownPos && (
        <div className="fixed w-48 bg-white dark:bg-neutral-900 rounded-xl shadow-2xl border border-gray-100 dark:border-neutral-800 py-2 z-[60]" style={{ top: dropdownPos.top - window.scrollY, left: dropdownPos.left }}>
          {(activeDropdown === 'Negocios' ? businessFilters : artFilters).map(f => (
            <button key={f} onClick={() => { setSelectedTopic(`${activeDropdown}-${f}`); setActiveDropdown(null); }} className="w-full text-left px-5 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-neutral-800 text-gray-700 dark:text-neutral-300 hover:text-brand-orange dark:hover:text-brand-orange">
              {t(`${activeDropdown === 'Negocios' ? 'business_submenu' : 'art_submenu'}.${f}`)}
            </button>
          ))}
        </div>
      )}
    </>
  );
};
export default Navigation;