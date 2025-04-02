import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Safely check localStorage and matchMedia
    try {
      const savedMode = localStorage.getItem('darkMode')
      if (savedMode !== null) {
        return savedMode === 'true'
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    } catch (e) {
      console.error("Error accessing theme preferences:", e)
      return false // Fallback to light mode
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('darkMode', darkMode)
      // More reliable class toggle
      const html = document.documentElement
      darkMode ? html.classList.add('dark') : html.classList.remove('dark')
      
      // Add transition for smooth theme change
      html.style.transition = 'background-color 300ms ease, color 300ms ease'
    } catch (e) {
      console.error("Error setting theme:", e)
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev)
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}