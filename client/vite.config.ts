import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // nécessaire pour le hot reload côté client
    },
    host: true, // nécessaire pour que le mappage du port du conteneur Docker fonctionne
    strictPort: true,
    port: 3000, // vous pouvez remplacer ce port par n'importe quel port
  },
});
