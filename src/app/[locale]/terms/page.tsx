import styles from "../legal.module.css";

export default function TermsPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Footer Page / Legal</p>
        <h1 className={styles.title}>Terms of Service</h1>
      </section>

      <section className={styles.body}>
        <p className={styles.lead}>
          These terms outline the general conditions for browsing, purchasing,
          and interacting with MOVIRTE online.
        </p>

        <div className={styles.section}>
          <h2>Use of site</h2>
          <p>
            By using this website, you agree to use it lawfully and not to
            interfere with the experience of other visitors or the operation of
            the store.
          </p>
        </div>

        <div className={styles.section}>
          <h2>Orders and payment</h2>
          <p>
            All orders are subject to availability, payment approval, and review
            by our team. We reserve the right to cancel or limit any order if
            fraud, pricing issues, or inventory discrepancies are detected.
          </p>
        </div>

        <div className={styles.section}>
          <h2>Product information</h2>
          <p>
            We make every effort to display colors, fit, and fabrication as
            accurately as possible, though appearance may vary by device and
            lighting conditions.
          </p>
        </div>
      </section>
    </div>
  );
}
