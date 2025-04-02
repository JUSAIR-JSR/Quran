import { Link } from 'react-router-dom'

export default function SurahCard({ surah }) {
  return (
    <Link 
      to={`/surah/${surah.number}`}
      className="block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 flex items-center justify-center bg-primary text-white rounded-full mr-4">
            {surah.number}
          </div>
          <div>
            <h3 className="font-bold text-lg">{surah.englishName}</h3>
            <p className="text-gray-600 dark:text-gray-400">{surah.englishNameTranslation}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="arabic-text text-xl">{surah.name}</p>
          <p className="text-gray-600 dark:text-gray-400">{surah.numberOfAyahs} verses</p>
        </div>
      </div>
    </Link>
  )
}