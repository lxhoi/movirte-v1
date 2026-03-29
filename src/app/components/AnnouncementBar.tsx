"use client";

import { useEffect, useState } from "react";
import styles from "./AnnouncementBar.module.css";

const PROMOTIONAL_MESSAGES = [
  "Free shipping on all orders over $150",
  "New season arrivals are now live",
  "Crafted silhouettes inspired by heritage tailoring",
];

const ROTATION_INTERVAL_MS = 4000;

export default function AnnouncementBar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isVisible || PROMOTIONAL_MESSAGES.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) =>
        (currentIndex + 1) % PROMOTIONAL_MESSAGES.length,
      );
    }, ROTATION_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <aside
      className={styles.bar}
      aria-label="Store announcements"
      role="status"
    >
      <div className={styles.inner}>
        <div className={styles.viewport}>
          <p key={PROMOTIONAL_MESSAGES[activeIndex]} className={styles.message}>
            <span className={styles.kicker}>Atelier Notes</span>
            <span className={styles.divider} aria-hidden="true">
              /
            </span>
            <span>{PROMOTIONAL_MESSAGES[activeIndex]}</span>
          </p>
        </div>

        <button
          type="button"
          className={styles.closeButton}
          onClick={() => setIsVisible(false)}
          aria-label="Dismiss announcement bar"
        >
          <span aria-hidden="true">Close</span>
        </button>
      </div>
    </aside>
  );
}
