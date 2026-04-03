import { newInCatalog, type CatalogProduct } from "./catalogProducts";

export type ClothingCategory = {
  slug: string;
  label: string;
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  matchingTitles: string[];
};

export const clothingCategories: ClothingCategory[] = [
  {
    slug: "view-all",
    label: "View All",
    href: "/clothing",
    eyebrow: "Wardrobe / Clothing",
    title: "Clothing",
    description:
      "A full edit of MOVIRTE clothing, from washed tailoring to graphic essentials, presented in the same dense collection layout.",
    matchingTitles: [],
  },
  {
    slug: "t-shirts",
    label: "T-shirts",
    href: "/clothing/t-shirts",
    eyebrow: "Clothing / T-shirts",
    title: "T-shirts",
    description:
      "Graphic and washed tees with a ceremonial edge, cut for relaxed everyday wear.",
    matchingTitles: ["Obsidian Tailoring Coat"],
  },
  {
    slug: "hoodies-sweatshirt",
    label: "Hoodies & Sweatshirt",
    href: "/clothing/hoodies-sweatshirt",
    eyebrow: "Clothing / Hoodies",
    title: "Hoodies & Sweatshirt",
    description:
      "Soft layering pieces and heavier jersey silhouettes designed for movement and comfort.",
    matchingTitles: ["Midnight Contrast Set"],
  },
  {
    slug: "tracksuits",
    label: "Tracksuits",
    href: "/clothing/tracksuits",
    eyebrow: "Clothing / Tracksuits",
    title: "Tracksuits",
    description:
      "Relaxed coordinated sets with a refined finish, built for off-duty uniform dressing.",
    matchingTitles: ["Midnight Contrast Set"],
  },
  {
    slug: "shorts",
    label: "Shorts",
    href: "/clothing/shorts",
    eyebrow: "Clothing / Shorts",
    title: "Shorts",
    description:
      "Easy summer separates and shortened silhouettes with the same MOVIRTE graphic language.",
    matchingTitles: ["Stone Layering Jacket"],
  },
  {
    slug: "bottoms",
    label: "Bottoms",
    href: "/clothing/bottoms",
    eyebrow: "Clothing / Bottoms",
    title: "Bottoms",
    description:
      "Tailored and relaxed lower-body silhouettes designed to anchor the collection.",
    matchingTitles: ["Stone Layering Jacket"],
  },
  {
    slug: "shirts",
    label: "Shirts",
    href: "/clothing/shirts",
    eyebrow: "Clothing / Shirts",
    title: "Shirts",
    description:
      "Structured tops with clean lines, crisp proportions, and subtle ceremonial detail.",
    matchingTitles: ["Obsidian Tailoring Coat"],
  },
  {
    slug: "activewear",
    label: "Activewear",
    href: "/clothing/activewear",
    eyebrow: "Clothing / Activewear",
    title: "Activewear",
    description:
      "Performance-minded essentials reworked through the brand's monochrome and graphic lens.",
    matchingTitles: ["Midnight Contrast Set"],
  },
  {
    slug: "swim",
    label: "Swim",
    href: "/clothing/swim",
    eyebrow: "Clothing / Swim",
    title: "Swim",
    description:
      "Holiday-ready pieces kept minimal, graphic, and aligned with the broader wardrobe palette.",
    matchingTitles: ["Heritage Drape Dress"],
  },
  {
    slug: "jackets-outerwear",
    label: "Jackets/Outerwear",
    href: "/clothing/jackets-outerwear",
    eyebrow: "Clothing / Outerwear",
    title: "Jackets & Outerwear",
    description:
      "Layers with weight and structure, built to frame the full silhouette through every season.",
    matchingTitles: ["Obsidian Tailoring Coat", "Stone Layering Jacket"],
  },
  {
    slug: "kids",
    label: "Kids",
    href: "/clothing/kids",
    eyebrow: "Clothing / Kids",
    title: "Kids",
    description:
      "A softer, scaled-down expression of the collection's shapes and visual codes.",
    matchingTitles: ["Heritage Drape Dress"],
  },
  {
    slug: "caps-accessories",
    label: "Caps & Accessories",
    href: "/clothing/caps-accessories",
    eyebrow: "Clothing / Accessories",
    title: "Caps & Accessories",
    description:
      "The finishing layer: small-format pieces that carry the same graphic identity.",
    matchingTitles: ["Heritage Drape Dress"],
  },
];

export const clothingFlyoutColumns = [
  clothingCategories.slice(0, 6),
  clothingCategories.slice(6),
] as const;

export function getClothingCategory(slug: string) {
  return clothingCategories.find((category) => category.slug === slug) ?? null;
}

export function getProductsForClothingCategory(slug: string): CatalogProduct[] {
  const category = getClothingCategory(slug);

  if (!category || category.matchingTitles.length === 0) {
    return newInCatalog;
  }

  return newInCatalog.filter((product) =>
    category.matchingTitles.includes(product.title),
  );
}
