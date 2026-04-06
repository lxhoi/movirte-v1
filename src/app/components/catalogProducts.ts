export type CatalogProduct = {
  handle: string;
  title: string;
  price: string;
  image: string;
  secondaryImage?: string;
  colors: string[];
};

export type ProductDetail = {
  handle: string;
  title: string;
  price: string;
  compareAtPrice?: string;
  description: string[];
  gallery: string[];
  colors: string[];
  sizes: string[];
  sku: string;
  shippingNote: string;
  detailSections: Array<{
    title: string;
    content: string;
  }>;
};

export const productDetails: ProductDetail[] = [
  {
    handle: "obsidian-tailoring-coat",
    title: "Obsidian Tailoring Coat",
    price: "$420",
    compareAtPrice: "$510",
    gallery: [
      "/images/obsidian-tailoring-coat/minasedit_front.webp",
      "/images/obsidian-tailoring-coat/minasedit_front2.webp",
      "/images/obsidian-tailoring-coat/minasedit_1_copy.webp",
      "/images/obsidian-tailoring-coat/minasedit_2_copy.webp",
      "/images/obsidian-tailoring-coat/minasedit_3_copy.webp",
    ],
    colors: ["#111111", "#8B7355", "#E8DFD3"],
    sizes: ["XS", "S", "M", "L", "XL"],
    sku: "MOV-OBS-001",
    shippingNote: "Worldwide shipping available. Dispatches within 2-4 business days.",
    description: [
      "A longline tailored coat cut with sharp shoulders, softened structure, and an understated ceremonial attitude.",
      "The Obsidian Tailoring Coat is designed to move between formal and everyday wardrobes, pairing sculpted lines with an easy drape through the body.",
      "Finished with a clean closure, quiet detailing, and a deep monochrome palette, it anchors the collection with a refined sense of presence.",
    ],
    detailSections: [
      {
        title: "Product details",
        content:
          "Structured outer shell with soft internal construction, tonal finishing, and a silhouette intended for layering.",
      },
      {
        title: "Shipping & duties",
        content:
          "Duties and taxes are calculated at checkout. Express and standard delivery options are available by region.",
      },
      {
        title: "Returns & exchanges",
        content:
          "Returns are accepted within 14 days on unworn items with original tags and packaging.",
      },
    ],
  },
  {
    handle: "heritage-drape-dress",
    title: "Heritage Drape Dress",
    price: "$360",
    compareAtPrice: "$430",
    gallery: [
      "/images/heritage-drape-dress/251202_AZM_0915.webp",
      "/images/heritage-drape-dress/KHACHKAR_WHITE_EDIT_1_ee01bcee-c6d3-4ea8-a20f-287d2527e168.webp",
      "/images/heritage-drape-dress/KHACHKAR_WHITE_EDIT_3.webp",
      "/images/heritage-drape-dress/251202_AZM_0930.webp",
      "/images/heritage-drape-dress/251202_AZM_0932.webp",
    ],
    colors: ["#8C7156", "#EADFCC", "#2E2620"],
    sizes: ["XS", "S", "M", "L"],
    sku: "MOV-HDD-002",
    shippingNote: "Tailored shipping windows shown at checkout based on your region.",
    description: [
      "A fluid column silhouette with sculpted drape lines, balancing softness and ceremony in one gesture.",
      "The Heritage Drape Dress is built for evening movement and quiet drama, with volume concentrated in the fold and release of the fabric.",
      "It carries the collection's emphasis on memory and ritual through a lighter, more formal expression.",
    ],
    detailSections: [
      {
        title: "Product details",
        content:
          "Draped formal dress with elongated line, soft handfeel, and tonal finish designed for occasion dressing.",
      },
      {
        title: "Shipping & duties",
        content:
          "International delivery available. Duties are prepaid where supported and displayed before payment.",
      },
      {
        title: "Returns & exchanges",
        content:
          "Eligible for exchange or return within 14 days provided the garment remains unworn and unaltered.",
      },
    ],
  },
  {
    handle: "midnight-contrast-set",
    title: "Midnight Contrast Set",
    price: "$390",
    compareAtPrice: "$470",
    gallery: [
      "/images/midnight-contrast-set/251202_AZM_0820.webp",
      "/images/midnight-contrast-set/251202_AZM_0823.jpg",
      "/images/midnight-contrast-set/251202_AZM_0825.webp",
      "/images/midnight-contrast-set/251202_AZM_0827.webp",
      "/images/midnight-contrast-set/251202_AZM_0837.webp",
      "/images/midnight-contrast-set/251202_AZM_0839.jpg",
    ],
    colors: ["#F4EFE7", "#0F0F0F", "#B89E79"],
    sizes: ["S", "M", "L", "XL"],
    sku: "MOV-MCS-003",
    shippingNote: "Express shipping available in select markets for this set.",
    description: [
      "A coordinated set shaped by athletic ease and precise contrast placement for a polished off-duty silhouette.",
      "The Midnight Contrast Set blends relaxed utility with a deliberate graphic rhythm, creating a look that feels both composed and effortless.",
      "It is intended to be worn together or broken apart for everyday layering throughout the season.",
    ],
    detailSections: [
      {
        title: "Product details",
        content:
          "Two-piece set with contrast trim, relaxed proportion, and clean finishing for modular everyday wear.",
      },
      {
        title: "Shipping & duties",
        content:
          "Available for worldwide dispatch with shipping methods and estimated delivery shown in checkout.",
      },
      {
        title: "Returns & exchanges",
        content:
          "Returns accepted within 14 days on complete sets in original condition.",
      },
    ],
  },
  {
    handle: "stone-layering-jacket",
    title: "Stone Layering Jacket",
    price: "$330",
    compareAtPrice: "$395",
    gallery: [
      "/images/stone-layering-jacket/KhachkarWashedGrey.webp",
      "/images/stone-layering-jacket/KhachkarWashedGrey2.jpg",
      "/images/stone-layering-jacket/251202_AZM_0940.webp",
      "/images/stone-layering-jacket/251202_AZM_0942.webp",
      "/images/stone-layering-jacket/251202_AZM_0943.jpg",
      "/images/stone-layering-jacket/251202_AZM_0948.jpg",
    ],
    colors: ["#D9CDBD", "#8A7761", "#F6F2EC"],
    sizes: ["S", "M", "L", "XL"],
    sku: "MOV-SLJ-004",
    shippingNote: "Ships with protective garment packaging and regional tracking.",
    description: [
      "A utilitarian outer layer with softened volume and stone-toned texture that complements the collection's quieter palette.",
      "The Stone Layering Jacket is intended for transitional weather and modular dressing, sitting easily over knitwear or shirting.",
      "Subtle structure through the shoulders and hem gives it a composed silhouette without sacrificing movement.",
    ],
    detailSections: [
      {
        title: "Product details",
        content:
          "Light outer layer with textured finish, eased shoulder, and proportion designed for repeated layering.",
      },
      {
        title: "Shipping & duties",
        content:
          "Rates and duties are calculated automatically according to destination at checkout.",
      },
      {
        title: "Returns & exchanges",
        content:
          "This item may be returned or exchanged within 14 days if kept in original, unworn condition.",
      },
    ],
  },
];

export function getProductDetailByHandle(handle: string): ProductDetail | undefined {
  return productDetails.find((product) => product.handle === handle);
}

export function getAllProductHandles(): string[] {
  return productDetails.map((product) => product.handle);
}

export const featuredProducts: CatalogProduct[] = [
  {
    handle: "obsidian-tailoring-coat",
    title: "Obsidian Tailoring Coat",
    price: "$420",
    image: "/images/obsidian-tailoring-coat/minasedit_front.webp",
    secondaryImage: "/images/obsidian-tailoring-coat/minasedit_front2.webp",
    colors: ["#111111", "#8B7355", "#E8DFD3"],
  },
  {
    handle: "heritage-drape-dress",
    title: "Heritage Drape Dress",
    price: "$360",
    image:
      "/images/heritage-drape-dress/KHACHKAR_WHITE_EDIT_1_ee01bcee-c6d3-4ea8-a20f-287d2527e168.webp",
    secondaryImage: "/images/heritage-drape-dress/KHACHKAR_WHITE_EDIT_3.webp",
    colors: ["#8C7156", "#EADFCC", "#2E2620"],
  },
  {
    handle: "midnight-contrast-set",
    title: "Midnight Contrast Set",
    price: "$390",
    image: "/images/midnight-contrast-set/251202_AZM_0820.webp",
    secondaryImage: "/images/midnight-contrast-set/251202_AZM_0837.webp",
    colors: ["#F4EFE7", "#0F0F0F", "#B89E79"],
  },
  {
    handle: "stone-layering-jacket",
    title: "Stone Layering Jacket",
    price: "$330",
    image: "/images/stone-layering-jacket/KhachkarWashedGrey.webp",
    secondaryImage: "/images/stone-layering-jacket/KhachkarWashedGrey2.jpg",
    colors: ["#D9CDBD", "#8A7761", "#F6F2EC"],
  },
  {
    handle: "silk-column-dress",
    title: "Silk Column Dress",
    price: "$410",
    image: "/images/product-silk-column.svg",
    colors: ["#F7F2EA", "#BFA98A", "#5E4B36"],
  },
  {
    handle: "atelier-knit-top",
    title: "Atelier Knit Top",
    price: "$240",
    image: "/images/product-atelier-knit.svg",
    colors: ["#B89E79", "#544536", "#171717"],
  },
];

export const newInCatalog: CatalogProduct[] = [
  {
    handle: "obsidian-tailoring-coat",
    title: "Obsidian Tailoring Coat",
    price: "$420",
    image: "/images/obsidian-tailoring-coat/minasedit_front.webp",
    colors: ["#111111", "#8B7355", "#E8DFD3"],
  },
  {
    handle: "obsidian-tailoring-coat",
    title: "Obsidian Tailoring Coat",
    price: "$420",
    image: "/images/obsidian-tailoring-coat/minasedit_front2.webp",
    colors: ["#111111", "#8B7355", "#E8DFD3"],
  },
  {
    handle: "obsidian-tailoring-coat",
    title: "Obsidian Tailoring Coat",
    price: "$420",
    image: "/images/obsidian-tailoring-coat/minasedit_1_copy.webp",
    colors: ["#111111", "#8B7355", "#E8DFD3"],
  },
  {
    handle: "obsidian-tailoring-coat",
    title: "Obsidian Tailoring Coat",
    price: "$420",
    image: "/images/obsidian-tailoring-coat/minasedit_2_copy.webp",
    colors: ["#111111", "#8B7355", "#E8DFD3"],
  },
  {
    handle: "obsidian-tailoring-coat",
    title: "Obsidian Tailoring Coat",
    price: "$420",
    image: "/images/obsidian-tailoring-coat/minasedit_3_copy.webp",
    colors: ["#111111", "#8B7355", "#E8DFD3"],
  },
  {
    handle: "heritage-drape-dress",
    title: "Heritage Drape Dress",
    price: "$360",
    image: "/images/heritage-drape-dress/251202_AZM_0915.webp",
    colors: ["#8C7156", "#EADFCC", "#2E2620"],
  },
  {
    handle: "heritage-drape-dress",
    title: "Heritage Drape Dress",
    price: "$360",
    image:
      "/images/heritage-drape-dress/KHACHKAR_WHITE_EDIT_1_ee01bcee-c6d3-4ea8-a20f-287d2527e168.webp",
    colors: ["#8C7156", "#EADFCC", "#2E2620"],
  },
  {
    handle: "heritage-drape-dress",
    title: "Heritage Drape Dress",
    price: "$360",
    image: "/images/heritage-drape-dress/KHACHKAR_WHITE_EDIT_3.webp",
    colors: ["#8C7156", "#EADFCC", "#2E2620"],
  },
  {
    handle: "heritage-drape-dress",
    title: "Heritage Drape Dress",
    price: "$360",
    image: "/images/heritage-drape-dress/251202_AZM_0930.webp",
    colors: ["#8C7156", "#EADFCC", "#2E2620"],
  },
  {
    handle: "heritage-drape-dress",
    title: "Heritage Drape Dress",
    price: "$360",
    image: "/images/heritage-drape-dress/251202_AZM_0932.webp",
    colors: ["#8C7156", "#EADFCC", "#2E2620"],
  },
  {
    handle: "midnight-contrast-set",
    title: "Midnight Contrast Set",
    price: "$390",
    image: "/images/midnight-contrast-set/251202_AZM_0820.webp",
    colors: ["#F4EFE7", "#0F0F0F", "#B89E79"],
  },
  {
    handle: "midnight-contrast-set",
    title: "Midnight Contrast Set",
    price: "$390",
    image: "/images/midnight-contrast-set/251202_AZM_0823.jpg",
    colors: ["#F4EFE7", "#0F0F0F", "#B89E79"],
  },
  {
    handle: "midnight-contrast-set",
    title: "Midnight Contrast Set",
    price: "$390",
    image: "/images/midnight-contrast-set/251202_AZM_0825.webp",
    colors: ["#F4EFE7", "#0F0F0F", "#B89E79"],
  },
  {
    handle: "midnight-contrast-set",
    title: "Midnight Contrast Set",
    price: "$390",
    image: "/images/midnight-contrast-set/251202_AZM_0827.webp",
    colors: ["#F4EFE7", "#0F0F0F", "#B89E79"],
  },
  {
    handle: "midnight-contrast-set",
    title: "Midnight Contrast Set",
    price: "$390",
    image: "/images/midnight-contrast-set/251202_AZM_0837.webp",
    colors: ["#F4EFE7", "#0F0F0F", "#B89E79"],
  },
  {
    handle: "midnight-contrast-set",
    title: "Midnight Contrast Set",
    price: "$390",
    image: "/images/midnight-contrast-set/251202_AZM_0839.jpg",
    colors: ["#F4EFE7", "#0F0F0F", "#B89E79"],
  },
  {
    handle: "stone-layering-jacket",
    title: "Stone Layering Jacket",
    price: "$330",
    image: "/images/stone-layering-jacket/KhachkarWashedGrey.webp",
    colors: ["#D9CDBD", "#8A7761", "#F6F2EC"],
  },
  {
    handle: "stone-layering-jacket",
    title: "Stone Layering Jacket",
    price: "$330",
    image: "/images/stone-layering-jacket/KhachkarWashedGrey2.jpg",
    colors: ["#D9CDBD", "#8A7761", "#F6F2EC"],
  },
  {
    handle: "stone-layering-jacket",
    title: "Stone Layering Jacket",
    price: "$330",
    image: "/images/stone-layering-jacket/251202_AZM_0940.webp",
    colors: ["#D9CDBD", "#8A7761", "#F6F2EC"],
  },
  {
    handle: "stone-layering-jacket",
    title: "Stone Layering Jacket",
    price: "$330",
    image: "/images/stone-layering-jacket/251202_AZM_0942.webp",
    colors: ["#D9CDBD", "#8A7761", "#F6F2EC"],
  },
  {
    handle: "stone-layering-jacket",
    title: "Stone Layering Jacket",
    price: "$330",
    image: "/images/stone-layering-jacket/251202_AZM_0943.jpg",
    colors: ["#D9CDBD", "#8A7761", "#F6F2EC"],
  },
  {
    handle: "stone-layering-jacket",
    title: "Stone Layering Jacket",
    price: "$330",
    image: "/images/stone-layering-jacket/251202_AZM_0948.jpg",
    colors: ["#D9CDBD", "#8A7761", "#F6F2EC"],
  },
];
