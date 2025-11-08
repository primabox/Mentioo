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
        detailKurzuNezahajeny: resolve(__dirname, "detail-kurzu-nezahajeny.html"),
        detailLekce: resolve(__dirname, "detail-lekce.html"),
        profilLektora: resolve(__dirname, "profil-lektora.html"),
        nakupniKosik: resolve(__dirname, "nakupni-kosik.html"),
        nakupniKosikPrazdny: resolve(__dirname, "nakupni-kosik-prazdny.html"),
        mujProfil: resolve(__dirname, "muj-profil.html"),
        kategorieKurzu: resolve(__dirname, "kategorie-kurzu.html"),
        pokladna: resolve(__dirname, "pokladna.html"),
        pokladna2: resolve(__dirname, "pokladna2.html"),
        thankYou: resolve(__dirname, "thankYou.html"),
      },
    },
  },
});