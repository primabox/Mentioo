import { defineConfig } from "vite";
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        detailKurzu: resolve(__dirname, "detail-kurzu.html"),
        detailKurzuPrihlaseny: resolve(__dirname, "detail-kurzu-prihlaseny.html"),
        detailKurzuPrihlasenyHotovo: resolve(__dirname, "detail-kurzu-prihlaseny-hotovo.html"),
        detailLekce: resolve(__dirname, "detail-lekce.html"),
        profilLektora: resolve(__dirname, "profil-lektora.html"),
      },
    },
  },
});
