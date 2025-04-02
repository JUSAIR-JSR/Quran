import { useBookmarks } from '../context/BookmarkContext'
import { useEffect, useState } from 'react'
import axios from 'axios'
import AyahItem from '../components/AyahItem'
import LoadingSpinner from '../components/LoadingSpinner'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaBookmark, FaTimes } from 'react-icons/fa'

export default function Bookmarks() {
  const { bookmarks, removeBookmarkById } = useBookmarks()
  const [bookmarkedAyahs, setBookmarkedAyahs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBookmarkedAyahs = async () => {
      try {
        const ayahs = await Promise.all(
          bookmarks.map(async (bookmark) => {
            const [ayahRes, surahRes] = await Promise.all([
              axios.get(`https://api.alquran.cloud/v1/ayah/${bookmark.surahId}:${bookmark.ayahNumber}/ar.alafasy`),
              axios.get(`https://api.alquran.cloud/v1/surah/${bookmark.surahId}/en`)
            ])
            return {
              ...ayahRes.data.data,
              surahName: surahRes.data.data.englishName,
              surahId: bookmark.surahId,
              bookmarkId: bookmark.id
            }
          })
        )
        setBookmarkedAyahs(ayahs)
      } catch (error) {
        console.error('Error fetching bookmarked ayahs:', error)
        toast.error('Failed to load bookmarks')
      } finally {
        setLoading(false)
      }
    }

    fetchBookmarkedAyahs()
  }, [bookmarks])

  const handleRemoveBookmark = (bookmarkId) => {
    removeBookmarkById(bookmarkId)
    toast.success('Bookmark removed')
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <ToastContainer position="bottom-right" />
      
      <h1 className="text-3xl font-bold mb-8 text-center text-primary dark:text-primary-light">
        <FaBookmark className="inline mr-3" />
        Bookmarked Verses
      </h1>
      
      {bookmarkedAyahs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No bookmarks yet. Start bookmarking verses to see them here.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {bookmarkedAyahs.map((ayah) => (
            <div 
              key={ayah.bookmarkId} 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 relative"
            >
              {/* Verse Number and Surah Name */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg font-bold mr-3">
                    {ayah.numberInSurah}
                  </div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {ayah.surahName} ({ayah.surahId}:{ayah.numberInSurah})
                  </span>
                </div>
                
                {/* Remove Bookmark Button */}
                <button
                  onClick={() => handleRemoveBookmark(ayah.bookmarkId)}
                  className="p-2 rounded-full text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                  title="Remove bookmark"
                >
                  <FaTimes className="text-lg" />
                </button>
              </div>
              
              {/* Arabic Text */}
              <p className="arabic-text text-center text-6xl leading-loose  mb-4">
                {ayah.text}
              </p>
              
              
            </div>
          ))}
        </div>
      )}
    </div>
  )
}