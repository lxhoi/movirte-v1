import { notFound } from "next/navigation";
import {
  accessoryCategories,
  getAccessoryCategory,
  getProductsForAccessoryCategory,
} from "@/app/components/accessoryCategories";
import { NewInCollection } from "../../new-in/NewInCollection";
import styles from "../../new-in/page.module.css";

export function generateStaticParams() {
  return accessoryCategories.map((category) => ({ category: category.slug }));
}

export default async function AccessoryCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const category = getAccessoryCategory(categorySlug);

  if (!category) {
    notFound();
  }

  const products = getProductsForAccessoryCategory(category.slug);

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
