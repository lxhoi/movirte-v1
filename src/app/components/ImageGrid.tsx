import Image from "next/image";
import styles from "./ImageGrid.module.css";

const GRID_ITEMS = [
  {
    title: "Quiet tailoring in motion",
    subtitle: "Campaign Chapter 01",
    image: "/images/lifestyle-grid-01.svg",
    large: true,
  },
  {
    title: "Studio light",
    subtitle: "Detail Focus",
    image: "/images/lifestyle-grid-02.svg",
  },
  {
    title: "Monochrome ease",
    subtitle: "After Hours",
    image: "/images/lifestyle-grid-03.svg",
  },
  {
    title: "Soft structure",
    subtitle: "Craft Notes",
    image: "/images/lifestyle-grid-04.svg",
  },
  {
    title: "Signature texture",
    subtitle: "Material Story",
    image: "/images/lifestyle-grid-05.svg",
  },
] as const;

export default function ImageGrid() {
  const [featured, ...supporting] = GRID_ITEMS;

  return (
    <section
      id="image-grid"
      className={styles.section}
      aria-labelledby="image-grid-heading"
    >
      <div className={styles.header}>
        <p className={styles.kicker}>Visual Journal</p>
        <h2 id="image-grid-heading" className={styles.heading}>
          Inside the world of MOVIRTE
        </h2>
      </div>

      <div className={styles.grid}>
        <article className={`${styles.card} ${styles.cardLarge}`}>
          <div className={styles.media}>
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              sizes="(max-width: 768px) 100vw, 58vw"
              className={styles.image}
            />
            <div className={styles.overlay}>
              <span className={styles.subtitle}>{featured.subtitle}</span>
              <h3 className={styles.title}>{featured.title}</h3>
            </div>
          </div>
        </article>

        <div className={styles.supportingGrid}>
          {supporting.map((item) => (
            <article key={item.title} className={styles.card}>
              <div className={styles.media}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 21vw"
                  className={styles.image}
                />
                <div className={styles.overlay}>
                  <span className={styles.subtitle}>{item.subtitle}</span>
                  <h3 className={styles.title}>{item.title}</h3>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
