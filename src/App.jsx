import React, { useState } from 'react';
import { useFetchArticles } from './hooks/useFetchArticles';
import { useBookmarks } from './hooks/useBookmarks';
import ArticleCard from './components/ArticleCard';

export default function App() {
  const { articles, loading, error } = useFetchArticles();
  const { bookmarks, toggleBookmark, isBookmarked } = useBookmarks();
  const [activeTab, setActiveTab] = useState('feed'); 

  const displayedArticles = activeTab === 'feed' ? articles : bookmarks;

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
            <span className="bg-blue-600 text-white px-2 py-1 rounded-md text-xl">{'</>'}</span>
            Developer<span className="text-blue-600">Feed</span>
          </h1>
          <nav className="flex bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('feed')}
              className={`px-5 py-2 rounded-md text-sm font-semibold transition-all ${
                activeTab === 'feed' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Latest Articles
            </button>
            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`px-5 py-2 rounded-md text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'bookmarks' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Bookmarks 
              <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                {bookmarks.length}
              </span>
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {loading && activeTab === 'feed' && (
          <div className="flex flex-col justify-center items-center py-32 gap-4">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-blue-600"></div>
            <p className="text-gray-500 font-medium">Fetching articles...</p>
          </div>
        )}

        {error && activeTab === 'feed' && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-6 rounded-xl text-center max-w-lg mx-auto mt-10">
            <p className="font-bold">Error loading articles: {error}</p>
          </div>
        )}

        {!loading && !error && displayedArticles.length === 0 && (
          <div className="text-center py-32 text-gray-500 bg-white rounded-2xl border border-dashed border-gray-200 mt-10">
            <p className="text-lg font-medium">
              {activeTab === 'bookmarks' ? "No bookmarks yet." : "No articles found."}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedArticles.map(article => (
            <ArticleCard
              key={article.id}
              article={article}
              isBookmarked={isBookmarked(article.id)}
              onToggleBookmark={toggleBookmark}
            />
          ))}
        </div>
      </main>
    </div>
  );
}