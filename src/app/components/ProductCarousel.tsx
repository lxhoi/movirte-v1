"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from "./ProductCarousel.module.css";

const PRODUCTS = [
  {
    title: "Obsidian Tailoring Coat",
    price: "$420",
    image: "/images/product-obsidian-tailoring.svg",
    colors: ["#111111", "#8B7355", "#E8DFD3"],
  },
  {
    title: "Heritage Drape Dress",
    price: "$360",
    image: "/images/product-heritage-dress.svg",
    colors: ["#8C7156", "#EADFCC", "#2E2620"],
  },
  {
    title: "Midnight Contrast Set",
    price: "$390",
    image: "/images/product-midnight-set.svg",
    colors: ["#F4EFE7", "#0F0F0F", "#B89E79"],
  },
  {
    title: "Stone Layering Jacket",
    price: "$330",
    image: "/images/product-stone-layering.svg",
    colors: ["#D9CDBD", "#8A7761", "#F6F2EC"],
  },
  {
    title: "Silk Column Dress",
    price: "$410",
    image: "/images/product-silk-column.svg",
    colors: ["#F7F2EA", "#BFA98A", "#5E4B36"],
  },
  {
    title: "Atelier Knit Top",
    price: "$240",
    image: "/images/product-atelier-knit.svg",
    colors: ["#B89E79", "#544536", "#171717"],
  },
] as const;

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
        {PRODUCTS.map((product) => (
          <article
            key={product.title}
            className={styles.card}
            data-product-card="true"
          >
            <div className={styles.imageWrap}>
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 25vw"
                className={styles.image}
              />
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
          </article>
        ))}
      </div>
    </section>
  );
}
