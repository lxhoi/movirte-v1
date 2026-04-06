"use client";

import { useState, type CSSProperties } from "react";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  const [motionStyle, setMotionStyle] = useState<CSSProperties>({
    "--hero-shift-x": "0px",
    "--hero-shift-y": "0px",
  } as CSSProperties);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    setMotionStyle({
      "--hero-shift-x": `${x * 60}px`,
      "--hero-shift-y": `${y * 42}px`,
    } as CSSProperties);
  };

  const handlePointerLeave = () => {
    setMotionStyle({
      "--hero-shift-x": "0px",
      "--hero-shift-y": "0px",
    } as CSSProperties);
  };

  return (
    <section
      id="hero"
      className={styles.hero}
      style={motionStyle}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className={styles.media}>
        <video
          className={styles.image}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero-5.png"
          aria-hidden="true"
        >
          <source src="/images/loop.mp4" type="video/mp4" />
        </video>
        <div className={styles.scrim} />
      </div>

      <div className={styles.overlay}>
        <div className={styles.copy}>
          <h1 className={styles.brand}>
            <span className={styles.brandWord}>Carrying</span>
            <span className={styles.brandDash} aria-hidden="true" />
            <span className={styles.brandWord}>Heritage</span>
            <span className={styles.brandDash} aria-hidden="true" />
            <span className={styles.brandWord}>
              <span className={styles.brandAccent}>Forward.</span>
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
}
