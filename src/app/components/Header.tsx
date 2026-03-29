"use client";

import { useEffect, useState } from "react";
import {
  Menu,
  Search,
  User,
  ShoppingBag,
  X,
  ChevronRight,
} from "lucide-react";
import { useLocale } from "next-intl";
import { getCartCount, useCartStore } from "@/lib/stores/cart";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import styles from "./Header.module.css";

const PRIMARY_LINKS = [
  { href: "/new-in", label: "New In" },
  { href: "/clothing", label: "Clothing" },
  { href: "/collections", label: "Collections" },
  { href: "/accessories", label: "Accessories" },
  { href: "/about", label: "About Us" },
  { href: "/news", label: "News" },
] as const;

export default function Header() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const cartCount = useCartStore((state) => getCartCount(state.cart));
  const toggleCart = useCartStore((state) => state.toggleCart);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname, locale]);

  const handleLocaleChange = (nextLocale: string) => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <>
      <header
        className={`${styles.header} ${isScrolled ? styles.headerScrolled : ""}`}
      >
        <div className={styles.inner}>
          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-drawer"
          >
            <Menu size={18} strokeWidth={1.7} />
          </button>

          <nav className={styles.primaryNav} aria-label="Primary">
            {PRIMARY_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.logoWrap}>
            <Link href="/" className={styles.logo}>
              MOVIRTE
            </Link>
          </div>

          <div className={styles.utilityNav}>
            <Link href="/members-club" className={styles.membersClub}>
              Members Club
            </Link>

            <div className={styles.localeToggle} aria-label="Locale toggle">
              <button
                type="button"
                className={`${styles.localeButton} ${
                  locale === "vi" ? styles.localeButtonActive : ""
                }`}
                onClick={() => handleLocaleChange("vi")}
                aria-pressed={locale === "vi"}
              >
                VN
              </button>
              <span className={styles.localeDivider} aria-hidden="true">
                /
              </span>
              <button
                type="button"
                className={`${styles.localeButton} ${
                  locale === "en" ? styles.localeButtonActive : ""
                }`}
                onClick={() => handleLocaleChange("en")}
                aria-pressed={locale === "en"}
              >
                EN
              </button>
            </div>

            <button
              type="button"
              className={styles.iconButton}
              aria-label="Search"
            >
              <Search size={18} strokeWidth={1.7} />
            </button>

            <Link href="/account" className={styles.iconButton} aria-label="Account">
              <User size={18} strokeWidth={1.7} />
            </Link>

            <button
              type="button"
              className={styles.iconButton}
              onClick={toggleCart}
              aria-label={`Cart with ${cartCount} item${cartCount === 1 ? "" : "s"}`}
            >
              <ShoppingBag size={18} strokeWidth={1.7} />
              <span className={styles.cartBadge}>{cartCount}</span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`${styles.drawerBackdrop} ${
          isMenuOpen ? styles.drawerBackdropVisible : ""
        }`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      <aside
        id="mobile-nav-drawer"
        className={`${styles.mobileDrawer} ${
          isMenuOpen ? styles.mobileDrawerOpen : ""
        }`}
        aria-label="Mobile navigation"
      >
        <div className={styles.drawerHeader}>
          <p className={styles.drawerTitle}>Menu</p>
          <button
            type="button"
            className={styles.iconButton}
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            <X size={18} strokeWidth={1.7} />
          </button>
        </div>

        <nav className={styles.drawerNav} aria-label="Mobile primary">
          {PRIMARY_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.drawerLink}
              onClick={() => setIsMenuOpen(false)}
            >
              <span>{link.label}</span>
              <ChevronRight size={16} strokeWidth={1.5} />
            </Link>
          ))}
        </nav>

        <div className={styles.drawerUtilities}>
          <Link
            href="/members-club"
            className={styles.drawerUtilityLink}
            onClick={() => setIsMenuOpen(false)}
          >
            Members Club
          </Link>
          <Link
            href="/account"
            className={styles.drawerUtilityLink}
            onClick={() => setIsMenuOpen(false)}
          >
            Account
          </Link>
          <button
            type="button"
            className={styles.drawerUtilityButton}
            onClick={toggleCart}
          >
            Cart
            <span className={styles.drawerCartCount}>{cartCount}</span>
          </button>
        </div>

        <div className={styles.drawerFooter}>
          <span className={styles.drawerFooterLabel}>Language</span>
          <div className={styles.localeToggle} aria-label="Mobile locale toggle">
            <button
              type="button"
              className={`${styles.localeButton} ${
                locale === "vi" ? styles.localeButtonActive : ""
              }`}
              onClick={() => handleLocaleChange("vi")}
              aria-pressed={locale === "vi"}
            >
              VN
            </button>
            <span className={styles.localeDivider} aria-hidden="true">
              /
            </span>
            <button
              type="button"
              className={`${styles.localeButton} ${
                locale === "en" ? styles.localeButtonActive : ""
              }`}
              onClick={() => handleLocaleChange("en")}
              aria-pressed={locale === "en"}
            >
              EN
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
