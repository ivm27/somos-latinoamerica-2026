import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, UploadType } from './types'; // FIXED: Removed .ts extension
import { UI_TEXT } from './constants'; // FIXED: Removed .ts extension

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
  selectedTopic: string | null;
  setSelectedTopic: (topic: string | null) => void;
  activeUploadType: UploadType;
  setActiveUploadType: (type: UploadType) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('Español');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [activeUploadType, setActiveUploadType] = useState<UploadType>(null);

  const t = (key: string) => {
    const keys = key.split('.');
    // Ensure we handle English/Spanish toggle correctly based on constants.ts
    const langKey = (language === 'English' || language === 'Español') ? language : 'Español';
    let value: any = UI_TEXT[langKey];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to Spanish if key is missing
        let fallback: any = UI_TEXT['Español'];
        let foundFallback = true;
        for (const fk of keys) {
          if (fallback && typeof fallback === 'object' && fk in fallback) {
            fallback = fallback[fk];
          } else {
            foundFallback = false;
            break;
          }
        }
        return foundFallback ? fallback : key; 
      }
    }
    return value;
  };

  return (
    <LanguageContext.Provider value={{ 
      language, setLanguage, t, 
      selectedTopic, setSelectedTopic,
      activeUploadType, setActiveUploadType
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};