import reactRefresh from '@vitejs/plugin-react-refresh'

/**
 * https://vitejs.dev/config/
 * @type { import('vite').UserConfig }
 */
export default {
  plugins: [reactRefresh()],
  server: {
    host: '0.0.0.0',
    hmr: {
      port: 443,
    },
  proxy: {
      '/query': {
        target: 'https://BTSBACKEND77.ecs162-s22.repl.co',
        changeOrigin: true,
        secure: false,
        ws: true
      }
    }
  }
}
