import { newInCatalog } from "@/app/components/catalogProducts";
import { NewInCollection } from "./NewInCollection";
import styles from "./page.module.css";

export default function NewInPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Latest Arrival / Collection</p>
        <h1 className={styles.title}>New In</h1>
        <p className={styles.description}>
          A running edit of new silhouettes, washed sets, graphic tees, and
          wardrobe staples. Built as a dense visual catalog inspired by the
          reference you shared.
        </p>
      </section>

      <NewInCollection products={newInCatalog} />
    </div>
  );
}
