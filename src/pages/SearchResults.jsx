import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import AyahItem from '../components/AyahItem'
import LoadingSpinner from '../components/LoadingSpinner'

export default function SearchResults() {
  const location = useLocation()
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  // In a real implementation, you would fetch search results here
  // based on the search query from location.search

  if (loading) return <LoadingSpinner />

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Search Results</h1>
      {results.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No results found</p>
      ) : (
        <div className="space-y-4">
          {results.map((ayah) => (
            <AyahItem
              key={`${ayah.surah.number}:${ayah.numberInSurah}`}
              ayah={ayah}
              surahId={ayah.surah.number}
            />
          ))}
        </div>
      )}
    </div>
  )
}