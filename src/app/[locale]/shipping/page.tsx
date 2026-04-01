import styles from "../legal.module.css";

export default function ShippingPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Footer Page / Help</p>
        <h1 className={styles.title}>Shipping</h1>
      </section>

      <section className={styles.body}>
        <p className={styles.lead}>
          MOVIRTE ships both locally and internationally, with delivery options
          shown at checkout based on destination and order contents.
        </p>

        <div className={styles.section}>
          <h2>Dispatch timing</h2>
          <p>
            Orders are typically processed within a few business days, excluding
            holidays, weekends, and collection launch peaks.
          </p>
        </div>

        <div className={styles.section}>
          <h2>Delivery</h2>
          <p>
            Shipping times vary by region. Tracking information will be sent
            once your order is dispatched.
          </p>
        </div>

        <div className={styles.section}>
          <h2>Duties and taxes</h2>
          <p>
            International orders may be subject to duties, taxes, or customs
            charges determined by the destination country.
          </p>
        </div>
      </section>
    </div>
  );
}
