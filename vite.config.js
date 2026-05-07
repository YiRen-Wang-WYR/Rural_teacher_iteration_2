import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const useRemoteApi = Boolean(env.VITE_API_BASE_URL?.trim())

  return {
    base: '/',
    plugins: [vue()],
    server: {
      ...(useRemoteApi
        ? {}
        : {
            proxy: {
              '/api': {
                target: env.VITE_API_PROXY_TARGET?.trim() || 'http://127.0.0.1:8000',
                changeOrigin: true,
              },
            },
          }),
    },
  }
})