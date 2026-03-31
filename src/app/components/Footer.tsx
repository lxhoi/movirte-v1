"use client";

import { Camera, Users, Music2, ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import styles from "./Footer.module.css";

const QUICK_LINKS = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
];

const HELP_LINKS = [
  { href: "/returns", label: "Returns and Exchanges" },
  { href: "/shipping", label: "Shipping" },
  { href: "/stockists", label: "Where to Purchase MOVIRTE" },
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
      <div className={styles.newsletterSection}>
        <div className={styles.newsletterCopy}>
          <h2 className={styles.heading}>Join The Movement</h2>
          <p className={styles.description}>
            To Start Earning Points &amp; Gain Access To Exclusive Discounts
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
            placeholder="Email"
            autoComplete="email"
          />
          <button type="submit" className={styles.submitButton} aria-label="Subscribe">
            <ArrowRight size={18} strokeWidth={1.7} />
          </button>
        </form>
      </div>

      <div className={styles.main}>
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
        <div className={styles.localeMeta}>
          <button type="button" className={styles.metaLink}>
            Vietnam (₫)
          </button>
          <span className={styles.metaDivider}>•</span>
          <button
            type="button"
            className={styles.metaLink}
            onClick={() => handleLocaleChange(locale === "en" ? "vi" : "en")}
          >
            {locale === "en" ? "English" : "Tiếng Việt"}
          </button>
        </div>

        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} MOVIRTE
        </p>

        <div className={styles.paymentRow}>
          <span className={styles.paymentPill}>Amex</span>
          <span className={styles.paymentPill}>Apple Pay</span>
          <span className={styles.paymentPill}>G Pay</span>
          <span className={styles.paymentPill}>Klarna</span>
          <span className={styles.paymentPill}>Mastercard</span>
          <span className={styles.paymentPill}>Visa</span>
        </div>
      </div>
    </footer>
  );
}
