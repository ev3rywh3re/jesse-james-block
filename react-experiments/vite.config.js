import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // The output directory for our built files, relative to the project root
    outDir: '../assets/dist/react-app',
    // Ensure the output directory is empty before building
    emptyOutDir: true,
    // Generate a manifest file for advanced integration if needed later
    manifest: true,
    rollupOptions: {
      // Overwrite default output file naming to be predictable
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`
      }
    }
  }
})
