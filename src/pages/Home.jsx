import { useEffect, useState } from 'react'
import axios from 'axios'
import SurahCard from '../components/SurahCard'
import LoadingSpinner from '../components/LoadingSpinner'

export default function Home() {
  const [surahs, setSurahs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await axios.get('https://api.alquran.cloud/v1/surah')
        setSurahs(response.data.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchSurahs()
  }, [])

  if (loading) return <LoadingSpinner />
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {surahs.map(surah => (
        <SurahCard key={surah.number} surah={surah} />
      ))}
    </div>
  )
}