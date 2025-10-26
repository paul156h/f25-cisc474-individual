// apps/web-start/vite.config.ts
import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { cloudflare } from '@cloudflare/vite-plugin'

// Only include Cloudflare plugin if building for Cloudflare
const isCloudflare = process.env.CLOUDFLARE_BUILD === 'true'

export default defineConfig({
  base: '/',
  plugins: [
    viteTsConfigPaths({ projects: ['./tsconfig.json'] }),
    tailwindcss(),

    // ✅ Only include this when deploying to Cloudflare Pages
    ...(isCloudflare ? [cloudflare({ viteEnvironment: { name: 'ssr' } })] : []),

    // ✅ Disable prerendering for Render/local
    tanstackStart({
      spa: { enabled: !isCloudflare },
      prerender: isCloudflare ? {} : { filter: () => false },
    }),

    viteReact(),
  ],
})
