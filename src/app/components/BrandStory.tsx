"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import styles from "./BrandStory.module.css";

export default function BrandStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="brand-story"
      className={`${styles.section} ${isVisible ? styles.visible : ""}`}
    >
      <div className={styles.mediaWrap}>
        <Image
          src="/images/banner-bg-image.webp"
          alt="Close-up editorial brand story artwork for MOVIRTE"
          fill
          sizes="100vw"
          className={styles.image}
        />
        <div className={styles.imageOverlay} />

        <div className={styles.overlayCard}>
          <span className={styles.overlayEyebrow}>Editorial Feature</span>
          <p className={styles.overlayText}>
            Sculptural draping, tactile tailoring, and heirloom-inspired detail.
          </p>
          <Link href="/clothing" className={styles.overlayCta}>
            Shop All T-Shirts
          </Link>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.ratingRow} aria-label="5 out of 5 star rating">
          <span className={styles.stars} aria-hidden="true">
            ★★★★★
          </span>
          <span className={styles.ratingText}>Loved by our first collectors</span>
        </div>

        <h2 className={styles.heading}>Where Heritage Meets Modern Luxury</h2>

        <div className={styles.body}>
          <p>
            MOVIRTE was shaped by the rhythm of inherited craft: garments
            remembered through touch, stories carried in silhouettes, and a
            belief that modern dressing can still feel ceremonial.
          </p>
          <p>
            Every piece is designed to move between worlds with ease. Clean
            structure meets soft restraint, creating a wardrobe that feels
            elevated, intentional, and deeply connected to origin.
          </p>
        </div>

        <Link href="/about" className={styles.button}>
          Join The Movement
        </Link>
      </div>
    </section>
  );
}
