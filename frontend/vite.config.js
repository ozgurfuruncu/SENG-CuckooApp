import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    // Windows'ta Docker volume içinde dosya değişikliklerini yakalamak için:
    watch: { usePolling: true },
  },
});
