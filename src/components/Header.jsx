import { Link } from 'react-router-dom'
import { FiMoon, FiSun, FiSearch, FiBookmark } from 'react-icons/fi'
import { motion } from 'framer-motion'

const RGBAnimationBackground = () => {
  const colors = [
    'rgba(255, 99, 132, 0.3)',  // Pink
    'rgba(54, 162, 235, 0.3)',  // Blue
    'rgba(255, 206, 86, 0.3)',  // Yellow
    'rgba(75, 192, 192, 0.3)',  // Teal
    'rgba(153, 102, 255, 0.3)', // Purple
    'rgba(255, 159, 64, 0.3)'   // Orange
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {Array(12).fill(0).map((_, i) => {
        const color = colors[Math.floor(Math.random() * colors.length)]
        const size = Math.random() * 100 + 50
        const delay = Math.random() * 5
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full blur-xl"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{
              y: -100,
              x: Math.random() * 100 - 50,
              rotate: 0
            }}
            animate={{
              y: [null, window.innerHeight + 100],
              x: [null, Math.random() * 100 - 50],
              rotate: 360
            }}
            transition={{
              duration: 20 + Math.random() * 40,
              repeat: Infinity,
              repeatDelay: delay,
              ease: "linear"
            }}
          />
        )
      })}
    </div>
  )
}

export default function Header({ darkMode, toggleDarkMode }) {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-gray-900 dark:to-gray-800 shadow-xl relative overflow-hidden">
      <RGBAnimationBackground />
      
      <div className="container mx-auto px-6 py-5 flex justify-between items-center relative">
        <Link 
          to="/" 
          className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100 hover:from-blue-100 hover:to-white transition-all duration-300"
        >
          Quran<span className="font-light">App</span>
        </Link>
        
        <div className="flex items-center space-x-6">
          {/* <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link 
              to="/search" 
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200 flex items-center justify-center"
              aria-label="Search"
            >
              <FiSearch className="text-xl text-white" />
            </Link>
          </motion.div> */}
          
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link 
              to="/bookmarks" 
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200 flex items-center justify-center"
              aria-label="Bookmarks"
            >
              <FiBookmark className="text-xl text-white" />
            </Link>
          </motion.div>
          
          <motion.button 
            onClick={toggleDarkMode}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200"
            aria-label="Toggle dark mode"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {darkMode ? (
              <FiSun className="text-xl text-yellow-300" />
            ) : (
              <FiMoon className="text-xl text-white" />
            )}
          </motion.button>
        </div>
      </div>
    </header>
  )
}