import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// El build es publica al repositori `adaLIVE` i es serveix via GitHub Pages a
// https://iruslanav.github.io/adaLIVE/  →  per això el base ha de ser '/adaLIVE/'.
// Es pot sobreescriure amb la variable d'entorn VITE_BASE (p. ex. './' per a proves locals).
export default defineConfig({
  base: process.env.VITE_BASE ?? '/adaLIVE/',
  plugins: [react()],
})
