import Image from "next/image";
import { ArrowDownRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
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
      </div>
    </section>
  );
}
