import Image from "next/image";
import { Link } from "@/i18n/navigation";
import styles from "./page.module.css";

const galleryImages = [
  {
    src: "/images/heritage-drape-dress/KHACHKAR_WHITE_EDIT_4.webp",
    alt: "MOVIRTE back print in a wine cellar",
    className: styles.galleryTall,
  },
  {
    src: "/images/heritage-drape-dress/251202_AZM_0930.webp",
    alt: "White MOVIRTE graphic tee",
    className: styles.galleryTop,
  },
  {
    src: "/images/midnight-contrast-set/251202_AZM_0820.webp",
    alt: "Dark MOVIRTE graphic tee",
    className: styles.galleryTop,
  },
  {
    src: "/images/obsidian-tailoring-coat/minasedit_2_copy.webp",
    alt: "MOVIRTE outerwear back graphic",
    className: styles.galleryBottom,
  },
  {
    src: "/images/banner-bg-image.webp",
    alt: "MOVIRTE printed tee in a display space",
    className: styles.galleryBottom,
  },
] as const;

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>About The Brand</p>

          <div className={styles.paragraphs}>
            <p>
              MOVIRTE is rooted in heritage, memory, and the idea that modern
              dressing can still feel ceremonial.
            </p>
            <p>
              Founded with a vision of carrying inherited craft forward, the
              label continues to grow through a global community drawn to
              identity, culture, and shared meaning.
            </p>
            <p>
              Every piece reflects that foundation, balancing strong graphic
              language with an intentional point of view that feels relevant
              today.
            </p>
            <p>
              MOVIRTE is shaped not only by what we create, but by the people
              who wear it.
            </p>
          </div>

          <Link href="/new-in" className={styles.cta}>
            MOVIRTE News
          </Link>
        </div>

        <div className={styles.posterWrap}>
          <Image
            src="/images/banner-bg-image.webp"
            alt="MOVIRTE campaign poster on a brick wall"
            fill
            sizes="(max-width: 1024px) 100vw, 48vw"
            className={styles.posterImage}
          />
        </div>
      </section>

      <section className={styles.statement}>
        <div className={styles.statementImageWrap}>
          <Image
            src="/images/inside-the-world/signature-texture.webp"
            alt="Close-up MOVIRTE zipper detail"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className={styles.statementImage}
          />
        </div>

        <p className={styles.statementText}>
          Bringing heritage and modern luxury into conversation, MOVIRTE speaks
          to identity through tactile detail, washed texture, and silhouettes
          shaped with emotional precision. The brand moves between memory and
          modernity, building garments that feel personal, grounded, and
          unmistakably intentional.
        </p>
      </section>

      <section className={styles.gallery}>
        {galleryImages.map((image) => (
          <div key={image.src} className={`${styles.galleryItem} ${image.className}`}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className={styles.galleryImage}
            />
          </div>
        ))}
      </section>
    </div>
  );
}
