import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/Quran/", // Use your GitHub repo name (case-sensitive!)
})
