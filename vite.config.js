import base44 from "@base44/vite-plugin"
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
          base44({
                  // Support for legacy code that imports the ba
                       // can be removed if the code has been updated
                       legacySDKImports: process.env.BASE44_LEGACY_SDK
          }),
          react(),
        ]
});
