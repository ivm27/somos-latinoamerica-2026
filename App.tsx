import React, { useState, useEffect, useCallback } from 'react';
// FIXED: Extensionless imports for Vercel/Vite production stability
import Header from './components/Header';
import Navigation from './components/Navigation';
import NewsGrid from './components/NewsGrid';
import LiveUploadModal from './components/LiveUploadModal';
import { CloudOff } from 'lucide-react';
import { LanguageProvider, useLanguage } from './LanguageContext';
import { getNews as fetchRealNews } from './services/newsService'; 
import { Article } from './types'; 
import { COUNTRIES } from './constants';

const AppContent: React.FC = () => {
  const [isPanicMode, setIsPanicMode] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]); 
  const [loading, setLoading] = useState(true); 
  const [selectedCountry, setSelectedCountry] = useState<string>('All Latin America'); 
  
  // selectedTopic is updated by Navigation.tsx and consumed here
  const { t, language, selectedTopic } = useLanguage();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const loadArticles = useCallback(async () => {
    setLoading(true);
    try {
      // Logic: If "All Latin America" is picked, we send undefined to show everything
      const locationFilter = (selectedCountry === 'All Latin America') ? undefined : selectedCountry;
      
      // We pass the language, the clean category (topic), and the country
      const fetched = await fetchRealNews(language, selectedTopic || undefined, locationFilter);
      
      setArticles(fetched);
    } catch (e) {
      console.error("Fetch error:", e);
      setArticles([]); // Fallback to empty state on error
    } finally {
      setLoading(false);
    }
  }, [language, selectedTopic, selectedCountry]);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  if (isPanicMode) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-neutral-950">
        <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-xl text-center">
          <CloudOff className="mx-auto mb-4 text-red-500" size={48} />
          <h1 className="text-xl font-bold mb-4">{t('panic.title')}</h1>
          <button onClick={() => setIsPanicMode(false)} className="bg-black text-white px-6 py-2 rounded-lg">
            {t('panic.button')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen transition-colors duration-300 dark:bg-neutral-950 dark:text-white">
      <Header 
        onPanic={() => setIsPanicMode(true)} 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme} 
        onCountryChange={setSelectedCountry} 
        selectedCountry={selectedCountry} 
        countries={['All Latin America', ...COUNTRIES]} 
      />
      <Navigation />
      {/* NewsGrid receives the articles fetched from Gemini */}
      <NewsGrid articles={articles} loading={loading} onRefresh={loadArticles} />
      <LiveUploadModal />
      <footer className="py-10 text-center text-gray-400 text-sm">
        {t('footer')}
      </footer>
    </div>
  );
};

const App: React.FC = () => (
  <LanguageProvider>
    <AppContent />
  </LanguageProvider>
);

export default App;