import Header from './Header'
import Footer from './Footer'
import { useTheme } from '../context/ThemeContext'

export default function Layout({ children }) {
  const { darkMode, toggleDarkMode } = useTheme()
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  )
}