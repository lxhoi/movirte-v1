"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { featuredProducts } from "./catalogProducts";
import { Link } from "@/i18n/navigation";
import { getProductUrl } from "@/lib/utils";
import styles from "./ProductCarousel.module.css";

export default function ProductCarousel() {
  const railRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStateRef = useRef({ startX: 0, scrollLeft: 0 });

  const scrollByCard = (direction: 1 | -1) => {
    const rail = railRef.current;

    if (!rail) return;

    const card = rail.querySelector<HTMLElement>(`[data-product-card="true"]`);
    const gap = 24;
    const cardWidth = card?.offsetWidth ?? rail.clientWidth;

    rail.scrollBy({
      left: direction * (cardWidth + gap),
      behavior: "smooth",
    });
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;

    if (!rail) return;

    setIsDragging(true);
    dragStateRef.current = {
      startX: event.clientX,
      scrollLeft: rail.scrollLeft,
    };

    rail.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;

    if (!rail || !isDragging) return;

    const delta = event.clientX - dragStateRef.current.startX;
    rail.scrollLeft = dragStateRef.current.scrollLeft - delta;
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;

    if (!rail) return;

    setIsDragging(false);

    if (rail.hasPointerCapture(event.pointerId)) {
      rail.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <section
      id="new-in"
      className={styles.section}
      aria-labelledby="new-in-heading"
    >
      <div className={styles.header}>
        <div>
          <p className={styles.kicker}>Latest Arrival</p>
          <h2 id="new-in-heading" className={styles.heading}>
            New In
          </h2>
        </div>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.controlButton}
            onClick={() => scrollByCard(-1)}
            aria-label="Scroll to previous products"
          >
            <ArrowLeft size={18} strokeWidth={1.8} />
          </button>
          <button
            type="button"
            className={styles.controlButton}
            onClick={() => scrollByCard(1)}
            aria-label="Scroll to next products"
          >
            <ArrowRight size={18} strokeWidth={1.8} />
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        className={`${styles.rail} ${isDragging ? styles.railDragging : ""}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {featuredProducts.map((product) => (
          <article
            key={product.title}
            className={styles.card}
            data-product-card="true"
          >
            <Link href={getProductUrl(product.handle)} className={styles.cardLink}>
              <div className={styles.imageWrap}>
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 25vw"
                  className={styles.image}
                />
                {product.secondaryImage ? (
                  <Image
                    src={product.secondaryImage}
                    alt={`${product.title} alternate view`}
                    fill
                    sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 25vw"
                    className={`${styles.image} ${styles.secondaryImage}`}
                  />
                ) : null}
              </div>

              <div className={styles.meta}>
                <div className={styles.titleRow}>
                  <h3 className={styles.title}>{product.title}</h3>
                  <p className={styles.price}>{product.price}</p>
                </div>

                <div className={styles.swatches} aria-label={`${product.title} color options`}>
                  {product.colors.map((color) => (
                    <span
                      key={color}
                      className={styles.swatch}
                      style={{ backgroundColor: color }}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
