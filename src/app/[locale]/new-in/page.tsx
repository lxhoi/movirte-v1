import Image from "next/image";
import { newInCatalog } from "@/app/components/catalogProducts";
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

      <section className={styles.toolbar}>
        <p className={styles.count}>{newInCatalog.length} products</p>
        <div className={styles.meta}>
          <span>New Arrivals</span>
          <span>Featured</span>
        </div>
      </section>

      <section className={styles.grid}>
        {newInCatalog.map((product, index) => (
          <article key={`${product.title}-${index}`} className={styles.card}>
            <div className={styles.imageWrap}>
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className={styles.image}
              />
            </div>

            <div className={styles.details}>
              <h2 className={styles.name}>{product.title}</h2>
              <p className={styles.price}>{product.price}</p>
            </div>

            <div className={styles.swatches} aria-hidden="true">
              {product.colors.map((color) => (
                <span
                  key={`${product.title}-${color}`}
                  className={styles.swatch}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
