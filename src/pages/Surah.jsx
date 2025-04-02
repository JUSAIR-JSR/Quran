import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { FiCopy, FiCheck, FiSearch } from 'react-icons/fi'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'
import { useBookmarks } from '../context/BookmarkContext'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AyahItem = ({ ayah, surahId }) => {
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks()
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(ayah.text)
    setCopied(true)
    toast.success('Verse copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  const toggleBookmark = () => {
    if (isBookmarked(surahId, ayah.numberInSurah)) {
      removeBookmark(surahId, ayah.numberInSurah)
      toast.success('Bookmark removed')
    } else {
      addBookmark(surahId, ayah.numberInSurah)
      toast.success('Verse bookmarked')
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 relative mb-6">
      {/* Verse Number - Right Side */}
      <div className="absolute right-4 top-4 w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full font-bold">
        {ayah.numberInSurah}
      </div>

      {/* Bookmark - Left Side */}
      <button
        onClick={toggleBookmark}
        className="absolute left-4 top-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        title={isBookmarked(surahId, ayah.numberInSurah) ? 'Remove bookmark' : 'Add bookmark'}
      >
        {isBookmarked(surahId, ayah.numberInSurah) ? (
          <FaBookmark className="text-yellow-500 text-xl" />
        ) : (
          <FaRegBookmark className="text-gray-500 dark:text-gray-400 text-xl" />
        )}
      </button>

      {/* Copy - Left Side (below Bookmark) */}
      <button
        onClick={handleCopy}
        className="absolute left-4 top-16 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        title="Copy verse"
      >
        {copied ? (
          <FiCheck className="text-green-500 text-xl" />
        ) : (
          <FiCopy className="text-blue-500 dark:text-blue-400 text-xl" />
        )}
      </button>

      {/* Content - Centered */}
      <div className="text-center px-10">
        {/* Arabic Text */}
        <p className="arabic-text text-2xl md:text-3xl leading-loose mb-4">
          {ayah.text}
        </p>
       
      </div>
    </div>
  )
}

export default function Surah() {
  const { id } = useParams()
  const [surah, setSurah] = useState(null)
  const [ayahs, setAyahs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchSurah = async () => {
      try {
        setLoading(true)
        const [surahRes, ayahsRes] = await Promise.all([
          axios.get(`https://api.alquran.cloud/v1/surah/${id}/en`),
          axios.get(`https://api.alquran.cloud/v1/surah/${id}/ar.alafasy`)
        ])
        
        setSurah(surahRes.data.data)
        setAyahs(ayahsRes.data.data.ayahs)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchSurah()
  }, [id])

  const filteredAyahs = ayahs.filter(ayah => 
    ayah.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ayah.numberInSurah.toString().includes(searchTerm)
  )

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )

  if (error) return (
    <div className="text-center py-12">
      <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-lg max-w-md mx-auto">
        Error loading surah: {error}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen pb-16">
      <ToastContainer position="bottom-right" />

      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 mx-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {surah.englishName} ({surah.name})
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {surah.englishNameTranslation} • {surah.revelationType} • {surah.numberOfAyahs} verses
            </p>
          </div>

          <div className="relative mt-4 md:mt-0">
            <input
              type="text"
              placeholder="Search in this surah..."
              className="pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Ayahs List */}
      <div className="px-4">
        {filteredAyahs.map((ayah) => (
          <AyahItem 
            key={ayah.numberInSurah} 
            ayah={ayah} 
            surahId={id}
          />
        ))}

        {filteredAyahs.length === 0 && (
          <div className="text-center py-16 text-gray-500 dark:text-gray-400 text-xl">
            No verses found matching your search
          </div>
        )}
      </div>
    </div>
  )
}