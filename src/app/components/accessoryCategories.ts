import { newInCatalog, type CatalogProduct } from "./catalogProducts";

export type AccessoryCategory = {
  slug: string;
  label: string;
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  matchingTitles: string[];
};

export const accessoryCategories: AccessoryCategory[] = [
  {
    slug: "hats",
    label: "Hats",
    href: "/accessories/hats",
    eyebrow: "Accessories / Hats",
    title: "Hats",
    description:
      "Headwear and finishing pieces that carry the same bold graphic language as the ready-to-wear.",
    matchingTitles: ["Stone Layering Jacket"],
  },
  {
    slug: "jewellery",
    label: "Jewellery",
    href: "/accessories/jewellery",
    eyebrow: "Accessories / Jewellery",
    title: "Jewellery",
    description:
      "Symbol-driven objects and small-format statements that echo the collection's ceremonial references.",
    matchingTitles: ["Heritage Drape Dress"],
  },
  {
    slug: "socks",
    label: "Socks",
    href: "/accessories/socks",
    eyebrow: "Accessories / Socks",
    title: "Socks",
    description:
      "Everyday essentials refined through texture, palette, and signature branding.",
    matchingTitles: ["Midnight Contrast Set"],
  },
  {
    slug: "sports-accessories",
    label: "Sports Accessories",
    href: "/accessories/sports-accessories",
    eyebrow: "Accessories / Sports",
    title: "Sports Accessories",
    description:
      "Utility pieces for movement and training, reworked with a sharp graphic edge.",
    matchingTitles: ["Midnight Contrast Set", "Stone Layering Jacket"],
  },
];

export const accessoryFlyoutLinks = accessoryCategories;

export function getAccessoryCategory(slug: string) {
  return accessoryCategories.find((category) => category.slug === slug) ?? null;
}

export function getProductsForAccessoryCategory(slug: string): CatalogProduct[] {
  const category = getAccessoryCategory(slug);

  if (!category) {
    return newInCatalog;
  }

  return newInCatalog.filter((product) =>
    category.matchingTitles.includes(product.title),
  );
}
