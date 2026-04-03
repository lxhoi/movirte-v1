import { notFound } from "next/navigation";
import {
  collectionCategories,
  getCollectionCategory,
  getProductsForCollectionCategory,
} from "@/app/components/collectionCategories";
import { NewInCollection } from "../../new-in/NewInCollection";
import styles from "../../new-in/page.module.css";

export function generateStaticParams() {
  return collectionCategories.map((collection) => ({ collection: collection.slug }));
}

export default async function CollectionCategoryPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection: collectionSlug } = await params;
  const collection = getCollectionCategory(collectionSlug);

  if (!collection) {
    notFound();
  }

  const products = getProductsForCollectionCategory(collection.slug);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>{collection.eyebrow}</p>
        <h1 className={styles.title}>{collection.title}</h1>
        <p className={styles.description}>{collection.description}</p>
      </section>

      <NewInCollection products={products} />
    </div>
  );
}
