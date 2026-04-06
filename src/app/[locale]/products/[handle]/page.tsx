import { notFound } from "next/navigation";
import Image from "next/image";
import { getAllProductHandles, getProductDetailByHandle } from "@/app/components/catalogProducts";
import ProductPurchasePanel from "./ProductPurchasePanel";
import styles from "./page.module.css";

export function generateStaticParams() {
  return getAllProductHandles().map((handle) => ({ handle }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = getProductDetailByHandle(handle);

  if (!product) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <section className={styles.productShell}>
        <div className={styles.galleryRail}>
          {product.gallery.map((image, index) => (
            <button
              key={`${product.handle}-thumb-${index}`}
              type="button"
              className={`${styles.thumbnail} ${index === 0 ? styles.thumbnailActive : ""}`}
              aria-label={`View image ${index + 1} of ${product.title}`}
            >
              <div className={styles.thumbnailInner}>
                <Image
                  src={image}
                  alt={`${product.title} thumbnail ${index + 1}`}
                  fill
                  sizes="72px"
                  className={styles.thumbnailImage}
                />
              </div>
            </button>
          ))}
        </div>

        <div className={styles.heroImagePanel}>
          <div className={styles.heroImageFrame}>
            <Image
              src={product.gallery[0]}
              alt={product.title}
              fill
              sizes="(max-width: 1200px) 100vw, 55vw"
              className={styles.heroImage}
            />
          </div>
        </div>

        <aside className={styles.infoPanel}>
          <div className={styles.infoBlock}>
            <p className={styles.productTitle}>{product.title}</p>
            <div className={styles.priceRow}>
              <span className={styles.price}>{product.price}</span>
              {product.compareAtPrice ? (
                <span className={styles.compareAtPrice}>{product.compareAtPrice}</span>
              ) : null}
            </div>
          </div>

          <div className={styles.descriptionBlock}>
            {product.description.map((paragraph) => (
              <p key={paragraph} className={styles.description}>
                {paragraph}
              </p>
            ))}
          </div>

          <ProductPurchasePanel product={product} />

          <div className={styles.fulfillmentCard}>
            <p className={styles.fulfillmentTitle}>{product.shippingNote}</p>
            <div className={styles.fulfillmentSteps}>
              <div className={styles.fulfillmentStep}>
                <span className={styles.fulfillmentIcon}>1</span>
                <div>
                  <p className={styles.fulfillmentLabel}>Ordered</p>
                  <p className={styles.fulfillmentMeta}>Today</p>
                </div>
              </div>
              <div className={styles.fulfillmentLine} />
              <div className={styles.fulfillmentStep}>
                <span className={styles.fulfillmentIcon}>2</span>
                <div>
                  <p className={styles.fulfillmentLabel}>Shipped</p>
                  <p className={styles.fulfillmentMeta}>1-2 days</p>
                </div>
              </div>
              <div className={styles.fulfillmentLine} />
              <div className={styles.fulfillmentStep}>
                <span className={styles.fulfillmentIcon}>3</span>
                <div>
                  <p className={styles.fulfillmentLabel}>Delivered</p>
                  <p className={styles.fulfillmentMeta}>3-5 days</p>
                </div>
              </div>
            </div>
          </div>

          <p className={styles.sku}>SKU: {product.sku}</p>

          <div className={styles.sectionStack}>
            {product.detailSections.map((section) => (
              <details key={section.title} className={styles.detailSection} open>
                <summary className={styles.detailSummary}>
                  <span>{section.title}</span>
                  <span className={styles.detailPlus}>+</span>
                </summary>
                <p className={styles.detailContent}>{section.content}</p>
              </details>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}
