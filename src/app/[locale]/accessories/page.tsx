import { newInCatalog } from "@/app/components/catalogProducts";
import { NewInCollection } from "../new-in/NewInCollection";
import styles from "../new-in/page.module.css";

export default function AccessoriesPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Wardrobe / Accessories</p>
        <h1 className={styles.title}>Accessories</h1>
        <p className={styles.description}>
          Explore MOVIRTE accessories, from branded finishing pieces to smaller
          ceremonial objects that complete the wardrobe.
        </p>
      </section>

      <NewInCollection products={newInCatalog} />
    </div>
  );
}
