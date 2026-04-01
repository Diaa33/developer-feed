import React from 'react';

export default function ArticleCard({ article, isBookmarked, onToggleBookmark }) {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  }).format(new Date(article.published_at));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img src={article.user.profile_image} alt={article.user.name} className="w-8 h-8 rounded-full" />
          <div className="text-xs">
            <p className="font-bold text-gray-900">{article.user.name}</p>
            <p className="text-gray-500">{formattedDate}</p>
          </div>
        </div>
        <button
          onClick={() => onToggleBookmark(article)}
          className={`p-2 rounded-full transition-colors ${
            isBookmarked ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-400 hover:text-gray-600'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        </button>
      </div>

      <a href={article.url} target="_blank" rel="noopener noreferrer" className="block mb-3 hover:text-blue-600 transition-colors">
        <h2 className="text-lg font-bold line-clamp-2 leading-tight">{article.title}</h2>
      </a>

      <div className="flex flex-wrap gap-2 mb-4">
        {article.tag_list?.slice(0, 3).map(tag => (
          <span key={tag} className="px-2 py-0.5 bg-gray-50 text-gray-500 text-[10px] rounded border border-gray-100 font-medium">#{tag}</span>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-3 border-t border-gray-50">
        <span>❤️ {article.public_reactions_count} reactions</span>
        <span>⏱️ {article.reading_time_minutes} min</span>
      </div>
    </div>
  );
}