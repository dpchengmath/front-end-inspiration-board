import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "https://github.com/dpchengmath/front-end-inspiration-board",
  plugins: [react()],
})
