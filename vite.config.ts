import { defineConfig } from 'vite'
import basicSsl from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react'

const cwd = process.cwd();
const REPOSITORY_NAME = cwd.split('\\').pop();

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: true
  },
  plugins: [react(), basicSsl()],
  base: `/${REPOSITORY_NAME}/`,
})
