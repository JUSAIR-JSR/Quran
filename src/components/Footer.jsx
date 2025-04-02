import { motion } from 'framer-motion'

const RGBAnimationBackground = () => {
  const colors = [
    'rgba(255, 99, 132, 0.2)',  // Pink
    'rgba(54, 162, 235, 0.2)',  // Blue
    'rgba(255, 206, 86, 0.2)',  // Yellow
    'rgba(75, 192, 192, 0.2)',  // Teal
    'rgba(153, 102, 255, 0.2)', // Purple
    'rgba(255, 159, 64, 0.2)'   // Orange
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {Array(8).fill(0).map((_, i) => {
        const color = colors[Math.floor(Math.random() * colors.length)]
        const size = Math.random() * 80 + 40
        const delay = Math.random() * 5
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full blur-lg"
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
              duration: 25 + Math.random() * 50,
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

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-gray-900 dark:to-gray-800 shadow-xl relative overflow-hidden py-6">
      <RGBAnimationBackground />
      
      <div className="container mx-auto px-6 text-center relative">
        <motion.p 
          className="text-white/90 text-sm md:text-base"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          © {new Date().getFullYear()} <span className="font-semibold">Quran</span><span className="font-light">App</span> - All rights reserved
        </motion.p>
        
        <motion.div 
          className="flex justify-center space-x-6 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <a href="#" className="text-white/70 hover:text-white transition-colors text-xs">Terms</a>
          <a href="#" className="text-white/70 hover:text-white transition-colors text-xs">Privacy</a>
          <a href="#" className="text-white/70 hover:text-white transition-colors text-xs">Contact</a>
        </motion.div>
      </div>
    </footer>
  )
}