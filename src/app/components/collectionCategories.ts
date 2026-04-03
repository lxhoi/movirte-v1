import { newInCatalog, type CatalogProduct } from "./catalogProducts";

export type CollectionCategory = {
  slug: string;
  label: string;
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  matchingTitles: string[];
};

export const collectionCategories: CollectionCategory[] = [
  {
    slug: "balian-armenian-ceramics",
    label: "Balian Armenian Ceramics Collection",
    href: "/collections/balian-armenian-ceramics",
    eyebrow: "Collections / Balian",
    title: "Balian Armenian Ceramics",
    description:
      "Graphic pieces inspired by Armenian ceramics, translated into wearable statement silhouettes.",
    matchingTitles: ["Heritage Drape Dress"],
  },
  {
    slug: "les-gens-darmenie",
    label: "Les Gens D’Arménie Collection",
    href: "/collections/les-gens-darmenie",
    eyebrow: "Collections / Les Gens D'Arménie",
    title: "Les Gens D’Arménie",
    description:
      "A signature MOVIRTE chapter rooted in identity, typography, and graphic memory.",
    matchingTitles: ["Obsidian Tailoring Coat", "Stone Layering Jacket"],
  },
  {
    slug: "fight-club",
    label: "Fight Club Collection",
    href: "/collections/fight-club",
    eyebrow: "Collections / Fight Club",
    title: "Fight Club",
    description:
      "Sharper, more aggressive graphics and silhouettes with a darker, athletic attitude.",
    matchingTitles: ["Midnight Contrast Set"],
  },
  {
    slug: "crest",
    label: "Crest Collection",
    href: "/collections/crest",
    eyebrow: "Collections / Crest",
    title: "Crest",
    description:
      "Symbol-driven pieces centered on emblems, shields, and ceremonial iconography.",
    matchingTitles: ["Stone Layering Jacket"],
  },
  {
    slug: "eternal-freedom",
    label: "Eternal Freedom Collection",
    href: "/collections/eternal-freedom",
    eyebrow: "Collections / Eternal Freedom",
    title: "Eternal Freedom",
    description:
      "A freer, more expressive range of washed garments built around movement and memory.",
    matchingTitles: ["Obsidian Tailoring Coat", "Midnight Contrast Set"],
  },
  {
    slug: "special-blends",
    label: "Special Blends Collection",
    href: "/collections/special-blends",
    eyebrow: "Collections / Special Blends",
    title: "Special Blends",
    description:
      "A textured and graphic collection with a moodier palette and vintage-inspired finish.",
    matchingTitles: ["Midnight Contrast Set", "Stone Layering Jacket"],
  },
  {
    slug: "resort",
    label: "Resort Collection",
    href: "/collections/resort",
    eyebrow: "Collections / Resort",
    title: "Resort",
    description:
      "Lighter, travel-ready pieces made for warm weather and off-duty styling.",
    matchingTitles: ["Heritage Drape Dress"],
  },
  {
    slug: "active",
    label: "Active Collection",
    href: "/collections/active",
    eyebrow: "Collections / Active",
    title: "Active",
    description:
      "Performance-informed shapes and coordinated sets with a clean, modern edge.",
    matchingTitles: ["Midnight Contrast Set"],
  },
  {
    slug: "armenian-khachkar",
    label: "Armenian Khachkar Collection",
    href: "/collections/armenian-khachkar",
    eyebrow: "Collections / Armenian Khachkar",
    title: "Armenian Khachkar",
    description:
      "Pieces built around the cross-stone motif, reimagined through fabric, silhouette, and print.",
    matchingTitles: ["Stone Layering Jacket", "Heritage Drape Dress"],
  },
];

export const collectionFlyoutLinks = collectionCategories;

export function getCollectionCategory(slug: string) {
  return collectionCategories.find((category) => category.slug === slug) ?? null;
}

export function getProductsForCollectionCategory(slug: string): CatalogProduct[] {
  const category = getCollectionCategory(slug);

  if (!category) {
    return newInCatalog;
  }

  return newInCatalog.filter((product) =>
    category.matchingTitles.includes(product.title),
  );
}
