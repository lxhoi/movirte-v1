import styles from "../legal.module.css";

export default function LocationsPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Footer Page / Help</p>
        <h1 className={styles.title}>Locations</h1>
      </section>

      <section className={styles.body}>
        <p className={styles.lead}>
          Discover where to experience MOVIRTE in person, from studio
          appointments to selected retail partners.
        </p>

        <div className={styles.section}>
          <h2>Ho Chi Minh City</h2>
          <p>
            Private studio appointments and collection previews are available by
            request for local clients and press.
          </p>
        </div>

        <div className={styles.section}>
          <h2>Partner stockists</h2>
          <p>
            A curated list of partner stores and temporary presentation spaces
            will be announced here as retail placements are confirmed.
          </p>
        </div>

        <div className={styles.section}>
          <h2>Appointments</h2>
          <p>
            For fittings, wholesale conversations, or private viewing requests,
            please contact the brand directly through the official channels.
          </p>
        </div>
      </section>
    </div>
  );
}
