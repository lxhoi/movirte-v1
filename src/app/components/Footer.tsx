"use client";

import Image from "next/image";
import { Camera, Users, Music2, ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import styles from "./Footer.module.css";

const FOOTER_IMAGES = [
  {
    eyebrow: "Saigon Atelier",
    title: "Crafted in quiet contrast",
    image: "/images/footer-strip-01.svg",
  },
  {
    eyebrow: "Campaign Notes",
    title: "Heritage silhouettes reimagined",
    image: "/images/footer-strip-02.svg",
  },
  {
    eyebrow: "Studio Moments",
    title: "Textures, tailoring, and light",
    image: "/images/footer-strip-03.svg",
  },
  {
    eyebrow: "New Season",
    title: "The uniform for movement",
    image: "/images/footer-strip-04.svg",
  },
];

const QUICK_LINKS = [
  { href: "/new-in", label: "New In" },
  { href: "/clothing", label: "Clothing" },
  { href: "/collections", label: "Collections" },
  { href: "/accessories", label: "Accessories" },
];

const HELP_LINKS = [
  { href: "/contact", label: "Contact Us" },
  { href: "/shipping", label: "Shipping Policy" },
  { href: "/returns", label: "Return Policy" },
  { href: "/faq", label: "FAQ" },
];

const SOCIAL_LINKS = [
  { href: "https://instagram.com", label: "Instagram", icon: Camera },
  { href: "https://facebook.com", label: "Facebook", icon: Users },
  { href: "https://tiktok.com", label: "TikTok", icon: Music2 },
];

export default function Footer() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const handleLocaleChange = (nextLocale: string) => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.imageStrip} aria-hidden="true">
        {FOOTER_IMAGES.map((image, index) => (
          <div key={image.title} className={styles.imageCard} data-tone={index + 1}>
            <Image
              src={image.image}
              alt={image.title}
              fill
              sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 25vw"
              className={styles.image}
            />
            <div className={styles.imageOverlay}>
              <span className={styles.imageEyebrow}>{image.eyebrow}</span>
              <p className={styles.imageTitle}>{image.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.newsletterSection}>
        <div className={styles.newsletterCopy}>
          <span className={styles.kicker}>Newsletter</span>
          <h2 className={styles.heading}>Join The Movement</h2>
          <p className={styles.description}>
            Receive collection drops, editorial notes, and private access to
            members-only releases.
          </p>
        </div>

        <form className={styles.newsletterForm}>
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            className={styles.input}
            placeholder="Email address"
            autoComplete="email"
          />
          <button type="submit" className={styles.submitButton}>
            Subscribe
            <ArrowRight size={16} strokeWidth={1.7} />
          </button>
        </form>
      </div>

      <div className={styles.main}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            MOVIRTE
          </Link>
          <p className={styles.tagline}>Carrying Heritage Forward.</p>
        </div>

        <div className={styles.links}>
          <div className={styles.column}>
            <h3>Quick Links</h3>
            <ul>
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.column}>
            <h3>Help</h3>
            <ul>
              {HELP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.column}>
            <h3>Our Socials</h3>
            <ul className={styles.socialList}>
              {SOCIAL_LINKS.map((link) => {
                const Icon = link.icon;

                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.socialLink}
                    >
                      <Icon size={16} strokeWidth={1.7} />
                      <span>{link.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} MOVIRTE. All rights reserved.
        </p>

        <div className={styles.controls}>
          <div className={styles.selectorGroup} aria-label="Locale selector">
            <button
              type="button"
              className={`${styles.selectorButton} ${
                locale === "vi" ? styles.selectorButtonActive : ""
              }`}
              onClick={() => handleLocaleChange("vi")}
              aria-pressed={locale === "vi"}
            >
              VN
            </button>
            <button
              type="button"
              className={`${styles.selectorButton} ${
                locale === "en" ? styles.selectorButtonActive : ""
              }`}
              onClick={() => handleLocaleChange("en")}
              aria-pressed={locale === "en"}
            >
              EN
            </button>
          </div>

          <div className={styles.selectorGroup} aria-label="Currency selector">
            <button type="button" className={styles.selectorButton}>
              USD
            </button>
            <button type="button" className={styles.selectorButton}>
              VND
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
