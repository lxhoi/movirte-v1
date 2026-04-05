import Image from "next/image";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.media}>
        <Image
          className={styles.image}
          src="/images/hero-5.png"
          alt="Editorial hero artwork for MOVIRTE"
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.scrim} />
      </div>

      <div className={styles.overlay}>
        <div className={styles.copy}>
          <h1 className={styles.brand}>
            Carrying Heritage
            <span className={styles.brandAccent}> Forward.</span>
          </h1>
        </div>
      </div>
    </section>
  );
}
