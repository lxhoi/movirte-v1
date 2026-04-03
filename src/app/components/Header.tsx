"use client";

import { useEffect, useMemo, useState, type MouseEvent } from "react";
import Image from "next/image";
import {
  Menu,
  Search,
  User,
  ShoppingBag,
  X,
  ChevronRight,
} from "lucide-react";
import { useLocale } from "next-intl";
import {
  getCartCount,
  getCartLines,
  getCartTotal,
  useCartStore,
} from "@/lib/stores/cart";
import { clothingFlyoutColumns } from "./clothingCategories";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import styles from "./Header.module.css";

const CLOTHING_FEATURED = [
  {
    href: "/clothing/t-shirts",
    label: "T-shirts",
    image: "/images/banner-bg-image.webp",
  },
  {
    href: "/clothing/tracksuits",
    label: "Tracksuits",
    image: "/images/midnight-contrast-set/251202_AZM_0837.webp",
  },
] as const;

const PRIMARY_LINKS = [
  { href: "/new-in", label: "New In" },
  { href: "/new-in", label: "Clothing" },
  { href: "/collections", label: "Collections" },
  { href: "/accessories", label: "Accessories" },
  { href: "/about", label: "About Us" },
  { href: "/news", label: "News" },
] as const;

export default function Header() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";
  const cart = useCartStore((state) => state.cart);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const closeCart = useCartStore((state) => state.closeCart);
  const isCartOpen = useCartStore((state) => state.isOpen);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isClothingFlyoutOpen, setIsClothingFlyoutOpen] = useState(false);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const [isPinned, setIsPinned] = useState(!isHomePage);
  const [useLightHeader, setUseLightHeader] = useState(false);
  const showLightHeader =
    useLightHeader || (isHomePage && (isHeaderHovered || isClothingFlyoutOpen));
  const canShowClothingFlyout = !isHomePage || showLightHeader;
  const cartLines = useMemo(() => getCartLines(cart), [cart]);
  const cartCount = useMemo(() => getCartCount(cart), [cart]);
  const cartSubtotal = useMemo(() => getCartTotal(cart), [cart]);

  useEffect(() => {
    const onScroll = () => {
      const header = document.querySelector("header");
      const headerHeight = header instanceof HTMLElement ? header.offsetHeight : 88;

      if (!isHomePage) {
        setIsPinned(true);
        setUseLightHeader(window.scrollY >= headerHeight);
        return;
      }

      setIsPinned(window.scrollY >= 42);
      setUseLightHeader(window.scrollY > 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [isHomePage]);

  useEffect(() => {
    document.body.style.overflow =
      isMenuOpen || isSearchOpen || isCartOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen, isSearchOpen, isCartOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    setIsClothingFlyoutOpen(false);
    setIsHeaderHovered(false);
    closeCart();
  }, [pathname, locale]);

  const handleLocaleChange = (nextLocale: string) => {
    router.replace(pathname, { locale: nextLocale });
  };

  const handleHeaderMouseLeave = (
    event: MouseEvent<HTMLElement | HTMLDivElement>,
  ) => {
    const nextTarget = event.relatedTarget;

    if (nextTarget instanceof Node && event.currentTarget.contains(nextTarget)) {
      return;
    }

    setIsHeaderHovered(false);
  };

  return (
    <>
      <header
        className={`${styles.header} ${isPinned ? styles.headerPinned : ""} ${
          showLightHeader ? styles.headerLight : ""
        } ${isPinned && !showLightHeader ? styles.headerPinnedDark : ""}`}
        onMouseEnter={() => setIsHeaderHovered(true)}
        onMouseLeave={handleHeaderMouseLeave}
      >
        <div
          className={`${styles.inner} ${showLightHeader ? styles.innerPinned : ""} ${
            isPinned && !showLightHeader ? styles.innerPinnedDark : ""
          }`}
        >
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

          <div
            className={styles.primaryNavWrap}
            onMouseEnter={() => setIsHeaderHovered(true)}
            onMouseLeave={handleHeaderMouseLeave}
          >
            <nav className={styles.primaryNav} aria-label="Primary">
              {PRIMARY_LINKS.map((link) =>
                link.label === "Clothing" ? (
                  <div
                    key={`${link.href}-${link.label}`}
                    className={styles.flyoutTrigger}
                    onMouseEnter={() => {
                      if (canShowClothingFlyout) {
                        setIsClothingFlyoutOpen(true);
                      }
                    }}
                  >
                    <Link href={link.href} className={styles.navLink}>
                      {link.label}
                    </Link>
                  </div>
                ) : (
                  <Link
                    key={`${link.href}-${link.label}`}
                    href={link.href}
                    className={styles.navLink}
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </nav>

            <div
              className={`${styles.clothingFlyout} ${
                isClothingFlyoutOpen && canShowClothingFlyout
                  ? styles.clothingFlyoutOpen
                  : ""
              }`}
              onMouseEnter={() => {
                if (canShowClothingFlyout) {
                  setIsClothingFlyoutOpen(true);
                }
              }}
              onMouseLeave={() => setIsClothingFlyoutOpen(false)}
            >
              <div className={styles.flyoutContent}>
                <div className={styles.flyoutColumns}>
                  {clothingFlyoutColumns.map((column, columnIndex) => (
                    <ul key={`column-${columnIndex}`} className={styles.flyoutList}>
                      {column.map((item) => (
                        <li key={`${columnIndex}-${item.label}`}>
                          <Link href={item.href} className={styles.flyoutLink}>
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>

                <div className={styles.flyoutFeatures}>
                  {CLOTHING_FEATURED.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={styles.flyoutCard}
                    >
                      <div className={styles.flyoutImageWrap}>
                        <Image
                          src={item.image}
                          alt={item.label}
                          fill
                          sizes="(max-width: 1280px) 30vw, 24vw"
                          className={styles.flyoutImage}
                        />
                      </div>
                      <span className={styles.flyoutLabel}>{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

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
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              aria-expanded={isSearchOpen}
              aria-controls="search-panel"
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
              key={`${link.href}-${link.label}`}
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

      <div
        className={`${styles.searchBackdrop} ${
          isSearchOpen ? styles.searchBackdropVisible : ""
        }`}
        onClick={() => setIsSearchOpen(false)}
        aria-hidden="true"
      />

      <aside
        id="search-panel"
        className={`${styles.searchPanel} ${
          isSearchOpen ? styles.searchPanelOpen : ""
        }`}
        aria-hidden={!isSearchOpen}
        aria-label="Search panel"
      >
        <div className={styles.searchBar}>
          <div className={styles.searchField}>
            <Search size={18} strokeWidth={1.5} className={styles.searchIcon} />
            <input
              type="search"
              name="search"
              placeholder="Search"
              className={styles.searchInput}
              autoComplete="off"
            />
          </div>

          <button
            type="button"
            className={styles.searchClose}
            onClick={() => setIsSearchOpen(false)}
            aria-label="Close search panel"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>
      </aside>

      <div
        className={`${styles.cartBackdrop} ${
          isCartOpen ? styles.cartBackdropVisible : ""
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      <aside
        className={`${styles.cartPanel} ${isCartOpen ? styles.cartPanelOpen : ""}`}
        aria-hidden={!isCartOpen}
        aria-label="Shopping bag"
      >
        <div className={styles.cartHeader}>
          <div>
            <p className={styles.cartEyebrow}>Shopping bag</p>
            <h2 className={styles.cartTitle}>
              {cartCount} item{cartCount === 1 ? "" : "s"}
            </h2>
          </div>

          <button
            type="button"
            className={styles.cartClose}
            onClick={closeCart}
            aria-label="Close cart"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <div className={styles.cartBody}>
          {cartLines.length > 0 ? (
            <div className={styles.cartList}>
              {cartLines.map((line) => (
                <article key={line.id} className={styles.cartItem}>
                  <div className={styles.cartImageWrap}>
                    {line.merchandise.product.featuredImage ? (
                      <Image
                        src={line.merchandise.product.featuredImage.url}
                        alt={
                          line.merchandise.product.featuredImage.altText ||
                          line.merchandise.product.title
                        }
                        fill
                        sizes="120px"
                        className={styles.cartImage}
                      />
                    ) : (
                      <div className={styles.cartImageFallback} />
                    )}
                  </div>

                  <div className={styles.cartItemInfo}>
                    <div className={styles.cartItemTop}>
                      <h3 className={styles.cartItemTitle}>
                        {line.merchandise.product.title}
                      </h3>
                      <p className={styles.cartItemPrice}>
                        {line.cost.totalAmount.currencyCode}{" "}
                        {line.cost.totalAmount.amount}
                      </p>
                    </div>

                    <p className={styles.cartItemVariant}>
                      {line.merchandise.title}
                    </p>

                    {line.merchandise.selectedOptions.length > 0 ? (
                      <ul className={styles.cartOptions}>
                        {line.merchandise.selectedOptions.map((option) => (
                          <li key={`${line.id}-${option.name}`}>
                            {option.name}: {option.value}
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    <p className={styles.cartQuantity}>Quantity: {line.quantity}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.cartEmpty}>
              <p className={styles.cartEmptyTitle}>Your bag is empty</p>
              <p className={styles.cartEmptyText}>
                Add a few pieces and they&apos;ll appear here in your bag drawer.
              </p>
              <Link href="/new-in" className={styles.cartContinue} onClick={closeCart}>
                Continue shopping
              </Link>
            </div>
          )}
        </div>

        <div className={styles.cartFooter}>
          <div className={styles.cartSummary}>
            <span>Subtotal</span>
            <strong>
              {cart?.cost.subtotalAmount.currencyCode ?? "USD"} {cartSubtotal}
            </strong>
          </div>

          <p className={styles.cartNote}>
            Taxes and shipping are calculated at checkout.
          </p>

          {cart?.checkoutUrl ? (
            <a
              href={cart.checkoutUrl}
              className={styles.cartCheckout}
              target="_blank"
              rel="noreferrer"
            >
              Checkout
            </a>
          ) : (
            <Link href="/new-in" className={styles.cartCheckout} onClick={closeCart}>
              Shop now
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
