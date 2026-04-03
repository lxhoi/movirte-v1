import { newInCatalog } from "@/app/components/catalogProducts";
import { NewInCollection } from "../new-in/NewInCollection";
import styles from "../new-in/page.module.css";

export default function CollectionsPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Wardrobe / Collections</p>
        <h1 className={styles.title}>Collections</h1>
        <p className={styles.description}>
          Explore MOVIRTE through distinct collection chapters, each centered on
          a different cultural reference, graphic language, and silhouette mood.
        </p>
      </section>

      <NewInCollection products={newInCatalog} />
    </div>
  );
}
