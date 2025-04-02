import { motion } from 'framer-motion'
import { useBookmarks } from '../context/BookmarkContext'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'

export default function AyahItem({ ayah, surahId, isPlaying }) {
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks()
  const bookmarked = isBookmarked(surahId, ayah.numberInSurah)

  const toggleBookmark = () => {
    if (bookmarked) {
      removeBookmark(surahId, ayah.numberInSurah)
    } else {
      addBookmark(surahId, ayah.numberInSurah)
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={`bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-all ${
        isPlaying ? 'ring-2 ring-secondary dark:ring-secondary-light' : ''
      }`}
    >
      <div className="flex justify-between items-start ">
        <div className="flex items-start">
          <div className=" w-10 h-10 flex items-center justify-center bg-primary text-white rounded-full mr-4 mt-1 dark:bg-primary-light">
            {ayah.numberInSurah}
          </div>
          <div>
            <p className="arabic-text text-2xl leading-loose mb-3">{ayah.text}</p>
            <p className="text-gray-600 dark:text-gray-400">
              Ayah {ayah.numberInSurah} - Translation would appear here
            </p>
          </div>
        </div>
        <button
          onClick={toggleBookmark}
          className={`p-2 rounded-full ${
            bookmarked
              ? 'text-secondary dark:text-secondary-light'
              : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
          }`}
          aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          {bookmarked ? (
            <FaBookmark className="text-xl" />
          ) : (
            <FaRegBookmark className="text-xl" />
          )}
        </button>
      </div>
    </motion.div>
  )
}