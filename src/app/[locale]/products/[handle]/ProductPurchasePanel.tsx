"use client";

import { useMemo, useState } from "react";
import type { ProductDetail } from "@/app/components/catalogProducts";
import { useCartStore } from "@/lib/stores/cart";
import styles from "./page.module.css";

export default function ProductPurchasePanel({ product }: { product: ProductDetail }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] ?? "Default");
  const [isAdded, setIsAdded] = useState(false);
  const addCartItem = useCartStore((state) => state.addCartItem);

  const buttonLabel = useMemo(
    () => (isAdded ? "Added to bag" : "Add to bag"),
    [isAdded],
  );

  const handleAddToBag = () => {
    addCartItem({
      handle: product.handle,
      title: product.title,
      image: product.gallery[0],
      price: product.price,
      size: selectedSize,
    });

    setIsAdded(true);
    window.setTimeout(() => {
      setIsAdded(false);
    }, 1600);
  };

  return (
    <>
      <div className={styles.selectorBlock}>
        <p className={styles.selectorLabel}>Size:</p>
        <div className={styles.sizeGrid}>
          {product.sizes.map((size) => (
            <button
              key={`${product.handle}-${size}`}
              type="button"
              className={`${styles.sizeChip} ${selectedSize === size ? styles.sizeChipActive : ""}`}
              onClick={() => setSelectedSize(size)}
              aria-pressed={selectedSize === size}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <p className={styles.stockNote}>Ready to ship</p>

      <div className={styles.actionStack}>
        <button
          type="button"
          className={`${styles.primaryAction} ${isAdded ? styles.primaryActionAdded : ""}`}
          onClick={handleAddToBag}
        >
          <span>{buttonLabel}</span>
          {isAdded ? <span className={styles.addedBadge}>+1</span> : null}
        </button>
        <button type="button" className={styles.secondaryAction}>
          Notify me when available
        </button>
        <button type="button" className={styles.ghostAction}>
          Add to wishlist
        </button>
      </div>
    </>
  );
}
