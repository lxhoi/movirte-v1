"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import styles from "./PromoPopup.module.css";

export default function PromoPopup() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    if (pathname === "/") {
      setIsOpen(true);
      setIsMinimized(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setIsMinimized(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(true);
  };

  const handleLauncherClick = () => {
    setIsOpen(true);
    setIsMinimized(false);
  };

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ""}`}
        aria-hidden={!isOpen}
      >
        <section
          className={`${styles.modal} ${isOpen ? styles.modalVisible : ""}`}
          aria-hidden={!isOpen}
        >
          <button
            type="button"
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="Close promotion"
          >
            <X size={16} strokeWidth={2} />
          </button>

          <p className={styles.banner}>Sign up for 10% off your first order</p>

          <div className={styles.mediaWrap}>
            <Image
              src="/images/banner-bg-image.webp"
              alt="MOVIRTE promotional campaign"
              fill
              sizes="(max-width: 768px) 90vw, 420px"
              className={styles.media}
            />
          </div>

          <div className={styles.content}>
            <p className={styles.offer}>10% OFF</p>
            <h2 className={styles.heading}>YOUR FIRST ORDER?</h2>

            <Link href="/new-in" className={styles.primaryAction}>
              Reveal My Code
            </Link>

            <button type="button" className={styles.secondaryAction} onClick={handleClose}>
              No Thanks, I&apos;ll Pay Full Price
            </button>
          </div>
        </section>
      </div>

      <button
        type="button"
        className={`${styles.launcher} ${isMinimized ? styles.launcherVisible : ""}`}
        onClick={handleLauncherClick}
        aria-label="Open promotion"
      >
        Get 10% Off
      </button>
    </>
  );
}
