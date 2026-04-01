import styles from "../legal.module.css";

export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Footer Page / Legal</p>
        <h1 className={styles.title}>Privacy Policy</h1>
      </section>

      <section className={styles.body}>
        <p className={styles.lead}>
          MOVIRTE collects only the information needed to process orders,
          support customers, and improve the store experience.
        </p>

        <div className={styles.section}>
          <h2>Information we collect</h2>
          <ul className={styles.list}>
            <li>Contact details such as name, email, and shipping address</li>
            <li>Order history and transaction details</li>
            <li>Basic analytics and browsing behavior</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2>How information is used</h2>
          <p>
            We use this information to fulfill purchases, communicate order
            updates, respond to support requests, and maintain site performance.
          </p>
        </div>

        <div className={styles.section}>
          <h2>Data choices</h2>
          <p>
            Customers may request access, correction, or deletion of their data
            where applicable by contacting the brand directly.
          </p>
        </div>
      </section>
    </div>
  );
}
