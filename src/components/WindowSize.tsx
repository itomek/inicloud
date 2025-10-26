import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function WindowSize() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-black transition-colors">
      <Link
        to="/"
        className="absolute top-4 left-4 text-blue-600 dark:text-blue-400 hover:underline"
      >
        ← Back to Dashboard
      </Link>

      <div className="text-gray-600 dark:text-gray-400 text-6xl font-light tracking-wide">
        {dimensions.width} × {dimensions.height}
      </div>
    </div>
  )
}
