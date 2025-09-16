import { NextResponse } from "next/server";

export async function GET() {
  const products = [
    // BUZOS
    {
      id: 1,
      category: "buzo",
      title: "Buzo Tour 2025",
      overview: "Buzo oversize edición especial de la gira 2025.",
      poster_path: "/buzo1-vertical.jpg",
      backdrop_path: "/buzo1-horizontal.jpg",
      variants: [
        { id: "1a", color: "Marron", image: "/buzo1-marron.png", sizes: ["S", "M", "L", "XL"] },
        { id: "1b", color: "Azul", image: "/buzo1-azul.png", sizes: ["S", "M", "L", "XL"] },
        { id: "1c", color: "Negro", image: "/buzo1-negro.png", sizes: ["S", "M", "L", "XL"] }
      ]
    },

    // REMERAS
    {
      id: 2,
      category: "remera",
      title: "Remera Logo",
      overview: "Remera clásica con el logo oficial de la banda.",
      poster_path: "/remera1-vertical.jpg",
      backdrop_path: "/remera1-horizontal.jpg",
      variants: [
        { id: "2a", color: "estampa1", image: "/remera-estampa-1.png", sizes: ["S", "M", "L", "XL"] },
        { id: "2b", color: "estampa2", image: "/remera-estampa-2.png", sizes: ["S", "M", "L", "XL"] },
        { id: "2c", color: "estampa3", image: "/remera-estampa-3.png", sizes: ["S", "M", "L", "XL"] }
      ]
    },

    // GORRAS
    {
      id: 3,
      category: "gorra",
      title: "Gorra Snapback",
      overview: "Gorra snapback edición limitada.",
      poster_path: "/gorra1-vertical.jpg",
      backdrop_path: "/gorra1-horizontal.jpg",
      variants: [
        { id: "3a", color: "Negro", image: "/gorra1-negra.jpg" },
        { id: "3b", color: "Rojo", image: "/gorra1-roja.jpg" },
        { id: "3c", color: "Blanco", image: "/gorra1-blanca.jpg" }
      ]
    },

    // BOLSAS
    {
      id: 4,
      category: "bolsa",
      title: "Bolsa Edición Tour",
      overview: "Bolsa de tela con el logo oficial de la banda.",
      poster_path: "/bolsa1-vertical.jpg",
      backdrop_path: "/bolsa1-horizontal.jpg",
      variants: [
        { id: "4a", color: "Negra", image: "/bolsa1-negra.jpg" },
        { id: "4b", color: "Blanca", image: "/bolsa1-blanca.jpg" },
        { id: "4c", color: "Azul", image: "/bolsa1-azul.jpg" }
      ]
    },

    // SOMBREROS TIPO VAQUERO
    {
      id: 5,
      category: "sombrero",
      title: "Sombrero Vaquero",
      overview: "Sombrero tipo vaquero edición limitada.",
      poster_path: "/sombrero1-vertical.jpg",
      backdrop_path: "/sombrero1-horizontal.jpg",
      variants: [
        { id: "5a", color: "Rosa", image: "/sombrero1-rosa.png" },
        { id: "5b", color: "Blanco", image: "/sombrero1-blanco.png" },
      ]
    },

    // DISCOS
    {
      id: 6,
      category: "disco",
      title: "Álbum X",
      overview: "Primer disco con sonidos pop y rock.",
      poster_path: "/disco1-vertical.jpg",
      backdrop_path: "/disco1-horizontal.jpg",
      video_url: "https://www.youtube.com/watch?v=xxxxxxx",
      variants: [
        { id: "6a", version: "CD", image: "/disco1-cd.jpg" },
        { id: "6b", version: "Vinilo", image: "/disco1-vinilo.jpg" },
        { id: "6c", version: "Cassette", image: "/disco1-cassette.jpg" }
      ]
    },
    {
      id: 7,
      category: "disco",
      title: "Álbum Obsession",
      overview: "Segundo disco con una mezcla de rock y electrónica.",
      poster_path: "/disco2-vertical.jpg",
      backdrop_path: "/disco2-horizontal.jpg",
      video_url: "https://www.youtube.com/watch?v=yyyyyyy",
      variants: [
        { id: "7a", version: "CD", image: "/obsession-lp-black.png" },
        { id: "7b", version: "Vinilo", image: "/obsession-picture-disc.png" },
        { id: "7c", version: "Cassette", image: "/obsession-deluxe-cd.png" }
      ]
    }
  ];

  return NextResponse.json(products);
}

/* 
import { NextResponse } from "next/server";

export async function GET() {
  const products = [
    // BUZOS
    {
      id: 1,
      category: "buzo",
      title: "Buzo Tour 2025",
      overview: "Buzo oversize edición especial de la gira 2025.",
      poster_path: "/buzo1-vertical.jpg",
      backdrop_path: "/buzo1-horizontal.jpg",
      variants: [
        { id: "1a", color: "Marron", image: "https://s3.amazonaws.com/dev1.mtimg.com/product_photos/imgs/000/104/614/full/The_20Driver_20Era_Obsession_20Brown_20Tour_20Hoodie_20Stacked_TS_STORE_20MOCK_20copy.png?1748273262", sizes: ["S", "M", "L", "XL"] },
        { id: "1b", color: "Azul", image: "https://s3.amazonaws.com/dev1.mtimg.com/product_photos/imgs/000/104/611/full/The_20Driver_20Era_Obsession_20Tour_20Hoodie_20Stacked_TS_STORE_20MOCK_20copy.png?1748272508", sizes: ["S", "M", "L", "XL"] },
        { id: "1c", color: "Negro", image: "https://s3.amazonaws.com/dev1.mtimg.com/product_photos/imgs/000/112/407/full/The_20Driver_20Era_Obsession_20Tour_20Hoodie_20LA_20S_TS.png?1753390435", sizes: ["S", "M", "L", "XL"] }
      ]
    },

    // REMERAS
    {
      id: 2,
      category: "remera",
      title: "Remera Logo",
      overview: "Remera clásica con el logo oficial de la banda.",
      poster_path: "/remera1-vertical.jpg",
      backdrop_path: "/remera1-horizontal.jpg",
      variants: [
        { id: "2a", color: "Negro", image: "/remera1-negra.jpg", sizes: ["S", "M", "L", "XL"] },
        { id: "2b", color: "Blanco", image: "/remera1-blanca.jpg", sizes: ["S", "M", "L", "XL"] },
        { id: "2c", color: "Azul", image: "/remera1-azul.jpg", sizes: ["S", "M", "L", "XL"] }
      ]
    },

    // GORRAS
    {
      id: 3,
      category: "gorra",
      title: "Gorra Snapback",
      overview: "Gorra snapback edición limitada.",
      poster_path: "/gorra1-vertical.jpg",
      backdrop_path: "/gorra1-horizontal.jpg",
      variants: [
        { id: "3a", color: "Negro", image: "/gorra1-negra.jpg" },
        { id: "3b", color: "Rojo", image: "/gorra1-roja.jpg" },
        { id: "3c", color: "Blanco", image: "/gorra1-blanca.jpg" }
      ]
    },

    // BOLSAS
    {
      id: 4,
      category: "bolsa",
      title: "Bolsa Edición Tour",
      overview: "Bolsa de tela con el logo oficial de la banda.",
      poster_path: "/bolsa1-vertical.jpg",
      backdrop_path: "/bolsa1-horizontal.jpg",
      variants: [
        { id: "4a", color: "Negra", image: "/bolsa1-negra.jpg" },
        { id: "4b", color: "Blanca", image: "/bolsa1-blanca.jpg" },
        { id: "4c", color: "Azul", image: "/bolsa1-azul.jpg" }
      ]
    },

    // SOMBREROS TIPO VAQUERO
    {
      id: 5,
      category: "sombrero",
      title: "Sombrero Vaquero",
      overview: "Sombrero tipo vaquero edición limitada.",
      poster_path: "/sombrero1-vertical.jpg",
      backdrop_path: "/sombrero1-horizontal.jpg",
      variants: [
        { id: "5a", color: "Marrón", image: "/sombrero1-marron.jpg" },
        { id: "5b", color: "Negro", image: "/sombrero1-negro.jpg" },
        { id: "5c", color: "Beige", image: "/sombrero1-beige.jpg" }
      ]
    },

    // DISCOS
    {
      id: 6,
      category: "disco",
      title: "Álbum X",
      overview: "Primer disco con sonidos pop y rock.",
      poster_path: "/disco1-vertical.jpg",
      backdrop_path: "/disco1-horizontal.jpg",
      video_url: "https://www.youtube.com/watch?v=xxxxxxx",
      variants: [
        { id: "6a", version: "CD", image: "/disco1-cd.jpg" },
        { id: "6b", version: "Vinilo", image: "/disco1-vinilo.jpg" },
        { id: "6c", version: "Cassette", image: "/disco1-cassette.jpg" }
      ]
    },
    {
      id: 7,
      category: "disco",
      title: "Álbum Y",
      overview: "Segundo disco con una mezcla de rock y electrónica.",
      poster_path: "/disco2-vertical.jpg",
      backdrop_path: "/disco2-horizontal.jpg",
      video_url: "https://www.youtube.com/watch?v=yyyyyyy",
      variants: [
        { id: "7a", version: "CD", image: "/disco2-cd.jpg" },
        { id: "7b", version: "Vinilo", image: "/disco2-vinilo.jpg" },
        { id: "7c", version: "Cassette", image: "/disco2-cassette.jpg" }
      ]
    }
  ];

  return NextResponse.json(products);
}
*/