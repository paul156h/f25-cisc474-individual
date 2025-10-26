import { defineConfig } from 'vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import { cloudflare } from '@cloudflare/vite-plugin';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [
    viteTsConfigPaths({ projects: ['./tsconfig.json'] }),
    tailwindcss(),
    // ✅ Try to read wrangler.json if it exists
    cloudflare({
      viteEnvironment: { name: 'ssr' },
      configPath: fs.existsSync(path.resolve('./wrangler.json'))
        ? './wrangler.json'
        : undefined,
    }),

    // ✅ Disable prerender explicitly
    tanstackStart({
      spa: { enabled: true },
      prerender: {
        filter: () => false, // skip prerender during Cloudflare build
      },
    }),

    viteReact(),
  ],
});
