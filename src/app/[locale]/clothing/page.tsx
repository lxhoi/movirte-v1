import { newInCatalog } from "@/app/components/catalogProducts";
import { NewInCollection } from "../new-in/NewInCollection";
import styles from "../new-in/page.module.css";

export default function ClothingPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Wardrobe / Clothing</p>
        <h1 className={styles.title}>Clothing</h1>
        <p className={styles.description}>
          A focused edit of MOVIRTE clothing: washed tailoring, graphic tees,
          structured sets, and soft essentials presented in the same dense
          catalog view as the collection reference.
        </p>
      </section>

      <NewInCollection products={newInCatalog} />
    </div>
  );
}
