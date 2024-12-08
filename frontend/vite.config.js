import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/nutriapi': {
                target: 'http://backend:3000',
                changeOrigin: true,
                historyApiFallback: true,
                rewrite: (path) => path.replace(/^\/nutriapi/, ''),
            },
        },
    },
});
