import { notFound } from "next/navigation";
import {
  getClothingCategory,
  getProductsForClothingCategory,
  clothingCategories,
} from "@/app/components/clothingCategories";
import { NewInCollection } from "../../new-in/NewInCollection";
import styles from "../../new-in/page.module.css";

export function generateStaticParams() {
  return clothingCategories
    .filter((category) => category.slug !== "view-all")
    .map((category) => ({ category: category.slug }));
}

export default async function ClothingCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const category = getClothingCategory(categorySlug);

  if (!category || category.slug === "view-all") {
    notFound();
  }

  const products = getProductsForClothingCategory(category.slug);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>{category.eyebrow}</p>
        <h1 className={styles.title}>{category.title}</h1>
        <p className={styles.description}>{category.description}</p>
      </section>

      <NewInCollection products={products} />
    </div>
  );
}
