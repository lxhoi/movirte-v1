import styles from "../legal.module.css";

export default function ReturnsPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Footer Page / Help</p>
        <h1 className={styles.title}>Returns and Exchanges</h1>
      </section>

      <section className={styles.body}>
        <p className={styles.lead}>
          We want every piece to feel right. Eligible returns and exchanges are
          accepted within the stated return window when items are unworn and in
          original condition.
        </p>

        <div className={styles.section}>
          <h2>Return conditions</h2>
          <ul className={styles.list}>
            <li>Items must be unworn, unwashed, and unaltered</li>
            <li>Original tags and packaging must be included</li>
            <li>Final sale items are not eligible unless faulty</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2>Exchanges</h2>
          <p>
            Exchanges are subject to stock availability. If the requested size
            or color is unavailable, a refund or store credit may be offered.
          </p>
        </div>

        <div className={styles.section}>
          <h2>Processing</h2>
          <p>
            Once your return is received and inspected, we will notify you when
            the refund or exchange has been approved and processed.
          </p>
        </div>
      </section>
    </div>
  );
}
