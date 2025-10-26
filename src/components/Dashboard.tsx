import { Link } from 'react-router-dom'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">My Apps Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/checkov"
            className="block p-8 bg-gray-100 dark:bg-gray-900 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors border-2 border-transparent hover:border-blue-500"
          >
            <h2 className="text-2xl font-semibold mb-2">Checkov</h2>
            <p className="text-gray-600 dark:text-gray-400">
              A simple, lightweight app for creating and managing checklists
            </p>
          </Link>

          <Link
            to="/window-size"
            className="block p-8 bg-gray-100 dark:bg-gray-900 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors border-2 border-transparent hover:border-blue-500"
          >
            <h2 className="text-2xl font-semibold mb-2">Browser Size</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Real-time browser window dimensions display
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}
