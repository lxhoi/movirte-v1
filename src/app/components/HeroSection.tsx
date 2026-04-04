import Image from "next/image";
import { Link } from "@/i18n/navigation";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.media}>
        <Image
          src="/images/movirte-hero.png"
          alt="Editorial hero artwork for MOVIRTE"
          fill
          priority
          className={styles.image}
          sizes="100vw"
        />
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
