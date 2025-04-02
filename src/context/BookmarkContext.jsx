import { createContext, useContext, useEffect, useState } from 'react'

const BookmarkContext = createContext()

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState(() => {
    const localData = localStorage.getItem('quran-bookmarks')
    return localData ? JSON.parse(localData) : []
  })

  useEffect(() => {
    localStorage.setItem('quran-bookmarks', JSON.stringify(bookmarks))
  }, [bookmarks])

  const addBookmark = (surahId, ayahNumber) => {
    setBookmarks(prev => {
      const existing = prev.find(b => b.surahId === surahId && b.ayahNumber === ayahNumber)
      if (existing) return prev
      return [...prev, { 
        surahId, 
        ayahNumber, 
        createdAt: Date.now(),
        id: `${surahId}:${ayahNumber}:${Date.now()}` // Unique ID
      }]
    })
  }

  const removeBookmark = (surahId, ayahNumber) => {
    setBookmarks(prev => prev.filter(b => !(b.surahId === surahId && b.ayahNumber === ayahNumber)))
  }

  const removeBookmarkById = (bookmarkId) => {
    setBookmarks(prev => prev.filter(b => b.id !== bookmarkId))
  }

  const clearAllBookmarks = () => {
    setBookmarks([])
  }

  const isBookmarked = (surahId, ayahNumber) => {
    return bookmarks.some(b => b.surahId === surahId && b.ayahNumber === ayahNumber)
  }

  return (
    <BookmarkContext.Provider value={{ 
      bookmarks, 
      addBookmark, 
      removeBookmark,
      removeBookmarkById,
      clearAllBookmarks,
      isBookmarked 
    }}>
      {children}
    </BookmarkContext.Provider>
  )
}

export const useBookmarks = () => useContext(BookmarkContext)