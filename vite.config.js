import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: replace 'second-brain' below with your actual GitHub repo name
// if you name the repo something else. This must match exactly for
// GitHub Pages to load assets correctly.
export default defineConfig({
  plugins: [react()],
  base: '/second-brain/',
})
