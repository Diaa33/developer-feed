import { useState, useEffect } from 'react';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('dev_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('dev_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (article) => {
    setBookmarks(prev => {
      const exists = prev.some(b => b.id === article.id);
      return exists ? prev.filter(b => b.id !== article.id) : [...prev, article];
    });
  };

  const isBookmarked = (id) => bookmarks.some(b => b.id === id);

  return { bookmarks, toggleBookmark, isBookmarked };
}