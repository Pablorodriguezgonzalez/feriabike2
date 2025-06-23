import { defineConfig } from "vite";
import react from '@vitejs/plugin-react'; // 👈 este es el plugin necesario
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),          
    tailwindcss(),    
  ],
});
