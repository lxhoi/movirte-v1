import Image from "next/image";
import { Link } from "@/i18n/navigation";
import styles from "./page.module.css";

type StoryBlock = {
  image: string;
  alt: string;
  paragraphs: string[];
  quote?: string;
  caption?: string;
  footerTitle?: string;
  footerLink?: string;
};

type MoreStory = {
  href: string;
  title: string;
};

const storyBlocks: StoryBlock[] = [
  {
    image: "/images/banner-bg-image.webp",
    alt: "MOVIRTE campaign billboard",
    paragraphs: [
      "MOVIRTE entered its latest milestone following strong demand and a growing global audience connected by identity, culture, and modern ceremonial dress.",
      "What began as a focused vision has continued to expand through a community that wears the brand as a signal of belonging, memory, and craft.",
      "This moment reflects both the scale of that opportunity and the strength of a brand shaped by purpose, storytelling, and emotional detail.",
    ],
  },
  {
    image: "/images/heritage-drape-dress/251202_AZM_0915.webp",
    alt: "MOVIRTE editorial retail display",
    paragraphs: [
      "Founded in 2018, MOVIRTE has grown by translating heritage into a contemporary wardrobe language grounded in texture, silhouette, and symbol.",
      "Each collection chapter extends that conversation, proving that deeply personal references can resonate with a broad and engaged audience.",
    ],
  },
  {
    image: "/images/inside-the-world/the-uniform-for-movement.webp",
    alt: "MOVIRTE archive and stock shelves",
    paragraphs: [
      "Beyond product, the brand continues to build an ecosystem around image, community, and consistency, carrying heritage forward with clarity and intention.",
      "The journey remains anchored in the people who shaped it first and in the supporters who continue to move it outward.",
    ],
  },
  {
    image: "/images/heritage-drape-dress/KHACHKAR_WHITE_EDIT_3.webp",
    alt: "MOVIRTE garments in store",
    paragraphs: [
      "Every milestone reinforces a simple truth: MOVIRTE grows because its language feels lived-in, rooted, and relevant across borders.",
    ],
    quote:
      "To our community and supporters around the world, thank you for believing in us.",
    caption: "MOVIRTE Studio",
  },
  {
    image: "/images/inside-the-world/quite-tailoring-in-motion.webp",
    alt: "MOVIRTE exterior campaign image",
    paragraphs: [],
    footerTitle: "Visit MOVIRTE online and discover the latest collection.",
    footerLink: "www.movirte.com",
  },
] ;

const moreStories: MoreStory[] = [
  {
    href: "/news",
    title: "MOVIRTE Unveils MINAS x NAREK Collaboration in Yerevan",
  },
  {
    href: "/news",
    title: "MOVIRTE’s Six-Week Sell-out Milestone Continues to Expand",
  },
];

export default function NewsPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.kicker}>Editorial Feature</p>
        <h1 className={styles.title}>MOVIRTE&apos;s Six-Week Milestone</h1>
        <h2 className={styles.subtitle}>A Community Carried Forward.</h2>
        <p className={styles.intro}>
          A defining moment for MOVIRTE, shaped by demand, identity, and a
          growing audience drawn to heritage reimagined through modern dress.
        </p>
      </section>

      <article className={styles.story}>
        {storyBlocks.map((block) => (
          <section key={block.image} className={styles.block}>
            <div className={styles.imageWrap}>
              <Image
                src={block.image}
                alt={block.alt}
                fill
                sizes="(max-width: 768px) 100vw, 640px"
                className={styles.image}
              />
            </div>

            {block.paragraphs.length > 0 ? (
              <div className={styles.copy}>
                {block.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ) : null}

            {block.quote ? <blockquote className={styles.quote}>{block.quote}</blockquote> : null}
            {block.caption ? <p className={styles.caption}>{block.caption}</p> : null}

            {block.footerTitle ? (
              <div className={styles.footerNote}>
                <p>{block.footerTitle}</p>
                <p>{block.footerLink}</p>
              </div>
            ) : null}
          </section>
        ))}
      </article>

      <section className={styles.moreStories}>
        <p className={styles.moreKicker}>Explore More</p>
        <p className={styles.moreIntro}>
          Follow the journey of MOVIRTE through the latest news, milestones,
          and stories.
        </p>

        <div className={styles.storyLinks}>
          {moreStories.map((story) => (
            <Link key={story.title} href={story.href} className={styles.storyLink}>
              {story.title}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
