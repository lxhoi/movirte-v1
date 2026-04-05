import { Link } from "@/i18n/navigation";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.media}>
        <video
          className={styles.image}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/movirte-hero.png"
          aria-hidden="true"
        >
          <source src="/images/hero.mp4" type="video/mp4" />
        </video>
        <div className={styles.scrim} />
      </div>

      <div className={styles.overlay}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Modern Atelier / Vietnam</p>
          <h1 className={styles.brand}>MOVIRTE</h1>
          <p className={styles.tagline}>Carrying Heritage Forward.</p>
          <Link href="/new-in" className={styles.cta}>
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}
