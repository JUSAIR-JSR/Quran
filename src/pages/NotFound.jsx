import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-light"
      >
        Go to Home
      </Link>
    </div>
  )
}