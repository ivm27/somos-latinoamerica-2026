import React from 'react';
// FIXED: Removed .tsx extension for Vercel/Vite production compatibility
import NewsCard from './NewsCard';
import { useLanguage } from '../LanguageContext';
import { Article } from '../types';
import { RefreshCw } from 'lucide-react';

interface NewsGridProps {
  articles: Article[];
  loading: boolean;
  onRefresh?: () => void;
}

const NewsGrid: React.FC<NewsGridProps> = ({ articles, loading, onRefresh }) => {
  const { t } = useLanguage(); 
  
  // Split articles for layout: 3 featured, 3 secondary
  const featuredArticles = articles.slice(0, 3);
  const nextRowArticles = articles.slice(3, 6);

  // Skeleton Loader Component - Updated for high-contrast Dark Mode
  const ArticleSkeleton = () => (
    <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-800 overflow-hidden h-full flex flex-col animate-pulse">
      <div className="h-52 bg-gray-200 dark:bg-neutral-800 w-full"></div>
      <div className="p-5 flex-1 flex flex-col space-y-4">
        <div className="flex justify-between">
          <div className="h-3 bg-gray-200 dark:bg-neutral-800 w-1/3 rounded"></div>
          <div className="h-3 bg-gray-200 dark:bg-neutral-800 w-1/4 rounded"></div>
        </div>
        <div className="h-6 bg-gray-200 dark:bg-neutral-800 w-full rounded"></div>
        <div className="h-6 bg-gray-200 dark:bg-neutral-800 w-2/3 rounded"></div>
        <div className="h-20 bg-gray-200 dark:bg-neutral-800 w-full rounded"></div>
        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-neutral-800 flex justify-between items-center">
           <div className="h-4 bg-gray-200 dark:bg-neutral-800 w-20 rounded"></div>
           <div className="flex gap-2">
             <div className="h-8 w-8 bg-gray-200 dark:bg-neutral-800 rounded-full"></div>
             <div className="h-8 w-8 bg-gray-200 dark:bg-neutral-800 rounded-full"></div>
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Featured Row */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 dark:bg-green-500/60 opacity-75 ${loading ? 'hidden' : ''}`}></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 dark:bg-green-500/60"></span>
            </span>
            {/* FIXED: Added high-contrast font and casing for "RED DESCENTRALIZADA" branding */}
            <h2 className="text-xs font-black text-gray-500 dark:text-neutral-500 uppercase tracking-widest">{t('network_active')}</h2>
          </div>
          
          <div className="flex items-center gap-2">
            {loading && (
                <div className="text-xs text-gray-400 dark:text-neutral-500 flex items-center gap-2 mr-2">
                <RefreshCw size={12} className="animate-spin" />
                Scanning Network...
                </div>
            )}
            {onRefresh && !loading && (
                <button 
                    onClick={onRefresh}
                    className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-400 dark:text-neutral-500 transition-colors"
                    title="Refresh Feed"
                >
                    <RefreshCw size={14} />
                </button>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {loading ? (
            <>
              <ArticleSkeleton />
              <ArticleSkeleton />
              <ArticleSkeleton />
            </>
          ) : (
            featuredArticles.map((article) => (
              <NewsCard 
                key={article.id} 
                article={article} 
              />
            ))
          )}
          {/* FIXED: Enhanced the "No news found" state with branding-compliant text */}
          {!loading && featuredArticles.length === 0 && (
             <div className="col-span-full text-center py-20 border-2 border-dashed border-gray-100 dark:border-neutral-800 rounded-3xl">
                <p className="text-gray-400 dark:text-neutral-500 font-medium">
                  {t('panic.desc') || "No current news found for this category."}
                </p>
             </div>
          )}
        </div>
      </div>

      {/* Secondary Row - Teaser for scroll */}
      {nextRowArticles.length > 0 && (
        <div className="opacity-80 hover:opacity-100 transition-opacity duration-500">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {loading ? (
               <>
                <ArticleSkeleton />
                <ArticleSkeleton />
                <ArticleSkeleton />
               </>
            ) : (
              nextRowArticles.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))
            )}
          </div>
        </div>
      )}

    </main>
  );
};

export default NewsGrid;