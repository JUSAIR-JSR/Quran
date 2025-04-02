import { useEffect, useRef } from 'react'
import { HashRouter  as Router, Routes, Route } from 'react-router-dom'
import { BookmarkProvider } from './context/BookmarkContext'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Surah from './pages/Surah'
import Bookmarks from './pages/Bookmarks'
import SearchResults from './pages/SearchResults'
import NotFound from './pages/NotFound'

const ParticleBackground = () => {
  const canvasRef = useRef(null)
  const { darkMode } = useTheme()

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()

    // Color schemes for light/dark modes
    const lightColors = [
      'rgba(59, 130, 246, 0.3)',  // blue-500
      'rgba(16, 185, 129, 0.3)',  // emerald-500
      'rgba(99, 102, 241, 0.3)',  // indigo-500
      'rgba(236, 72, 153, 0.3)'   // pink-500
    ]
    
    const darkColors = [
      'rgba(96, 165, 250, 0.3)',  // blue-400
      'rgba(52, 211, 153, 0.3)',  // emerald-400
      'rgba(129, 140, 248, 0.3)', // indigo-400
      'rgba(244, 114, 182, 0.3)'  // pink-400
    ]

    const connectionColors = {
      light: 'rgba(34, 211, 238, 0.2)',  // cyan-400
      dark: 'rgba(34, 211, 238, 0.15)'   // cyan-400 (darker)
    }

    const colors = darkMode ? darkColors : lightColors
    const connectionColor = darkMode ? connectionColors.dark : connectionColors.light

    // Arabic calligraphy characters for particles
    const arabicChars = ['ﷲ', 'ﷺ', '﷽', 'آ', 'أ', 'إ', 'ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ']
    const particleCount = Math.floor(window.innerWidth * window.innerHeight / 50000)

    class Particle {
      constructor() {
        this.reset()
        this.char = arabicChars[Math.floor(Math.random() * arabicChars.length)]
        this.size = Math.random() * 25 + 15 
        this.alpha = Math.random() * 0.5 + 0.2
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.speedX = Math.random() * 2 - 1
        this.speedY = Math.random() * 2 - 1
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Reset if off screen
        if (this.x > canvas.width + 100 || this.x < -100 || 
            this.y > canvas.height + 100 || this.y < -100) {
          this.reset()
        }
      }

      draw() {
        ctx.font = `${this.size}px 'Amiri Quran', serif`
        ctx.fillStyle = this.color.replace('0.3', this.alpha)
        ctx.fillText(this.char, this.x, this.y)
      }
    }

    // Create particles
    const particles = []
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    let animationId
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw particles and connections
      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 180) {
            ctx.strokeStyle = connectionColor.replace('0.2)', `${(0.25 - distance/180 * 0.25)})`)
            ctx.lineWidth = 0.8
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      resizeCanvas()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [darkMode])

  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 opacity-30 dark:opacity-20"
    />
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <BookmarkProvider>
        <Router >
          <ParticleBackground />
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/surah/:id" element={<Surah />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </Router>
      </BookmarkProvider>
    </ThemeProvider>
  )
}