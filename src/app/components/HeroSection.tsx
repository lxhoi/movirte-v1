import { ArrowDownRight, ArrowRight } from "lucide-react";
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
          <p className={styles.eyebrow}>Modern atelier / Vietnam</p>
          <h1 className={styles.brand}>
            Carrying Heritage
            <span className={styles.brandAccent}> Forward.</span>
          </h1>
          <p className={styles.tagline}>
            Tailoring motion, memory, and modern ritual into a new silhouette for
            everyday arrival.
          </p>

          <div className={styles.actions}>
            <Link href="/new-in" className={styles.ctaPrimary}>
              Shop New In
            </Link>
            <a href="#new-in" className={styles.ctaSecondary}>
              Explore the arrival
              <ArrowDownRight size={18} strokeWidth={1.7} />
            </a>
          </div>
        </div>

        <div className={styles.heroFoot}>
          <div>
            <p className={styles.footLabel}>Latest Arrival</p>
            <p className={styles.footText}>A new cadence of movement, cut in motion.</p>
          </div>

          <div className={styles.footActions}>
            <a href="#new-in" className={styles.footButton} aria-label="Go to latest arrival">
              <ArrowDownRight size={18} strokeWidth={1.8} />
            </a>
            <Link href="/new-in" className={styles.footButton} aria-label="Open new in collection">
              <ArrowRight size={18} strokeWidth={1.8} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
