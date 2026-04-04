"use client";

import { useEffect, useMemo, useState, type MouseEvent } from "react";
import Image from "next/image";
import {
  Globe,
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
import { accessoryFlyoutLinks } from "./accessoryCategories";
import { clothingFlyoutColumns } from "./clothingCategories";
import { collectionFlyoutLinks } from "./collectionCategories";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import styles from "./Header.module.css";

type RegionOption = {
  code: string;
  label: string;
  currencyCode: string;
  symbol: string;
};

type RegionGroup = {
  title: string;
  options: RegionOption[];
};

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

const REGION_GROUPS: RegionGroup[] = [
  {
    title: "Asia Pacific",
    options: [
      { code: "VN", label: "Vietnam", currencyCode: "VND", symbol: "₫" },
      { code: "JP", label: "Japan", currencyCode: "JPY", symbol: "¥" },
      { code: "KR", label: "South Korea", currencyCode: "KRW", symbol: "₩" },
      { code: "SG", label: "Singapore", currencyCode: "SGD", symbol: "S$" },
      { code: "AU", label: "Australia", currencyCode: "AUD", symbol: "A$" },
    ],
  },
  {
    title: "Europe",
    options: [
      { code: "GB", label: "United Kingdom", currencyCode: "GBP", symbol: "£" },
      { code: "FR", label: "France", currencyCode: "EUR", symbol: "€" },
      { code: "DE", label: "Germany", currencyCode: "EUR", symbol: "€" },
      { code: "IT", label: "Italy", currencyCode: "EUR", symbol: "€" },
    ],
  },
  {
    title: "North America",
    options: [
      { code: "US", label: "United States", currencyCode: "USD", symbol: "$" },
      { code: "CA", label: "Canada", currencyCode: "CAD", symbol: "C$" },
      { code: "MX", label: "Mexico", currencyCode: "MXN", symbol: "MX$" },
    ],
  },
  {
    title: "Middle East",
    options: [
      {
        code: "AE",
        label: "United Arab Emirates",
        currencyCode: "AED",
        symbol: "AED",
      },
      { code: "SA", label: "Saudi Arabia", currencyCode: "SAR", symbol: "SAR" },
    ],
  },
] ;

const REGIONS: RegionOption[] = [];

for (const group of REGION_GROUPS) {
  REGIONS.push(...group.options);
}

const DEFAULT_REGION: RegionOption = REGION_GROUPS[0].options[0];
const REGION_STORAGE_KEY = "movirte-region";
const LANGUAGE_OPTIONS = [
  { code: "en", label: "English", shortLabel: "EN" },
  { code: "vi", label: "Հայերեն", shortLabel: "HY" },
  { code: "fr", label: "Français", shortLabel: "FR" },
  { code: "ru", label: "Русский", shortLabel: "RU" },
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
  const [activeFlyout, setActiveFlyout] = useState<
    "clothing" | "collections" | "accessories" | null
  >(null);
  const [isRegionPickerOpen, setIsRegionPickerOpen] = useState(false);
  const [isLanguagePickerOpen, setIsLanguagePickerOpen] = useState(false);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const [isPinned, setIsPinned] = useState(!isHomePage);
  const [useLightHeader, setUseLightHeader] = useState(false);
  const [selectedRegionCode, setSelectedRegionCode] = useState(DEFAULT_REGION.code);
  const showLightHeader =
    useLightHeader || (isHomePage && (isHeaderHovered || activeFlyout !== null));
  const canShowClothingFlyout = !isHomePage || showLightHeader;
  const cartLines = useMemo(() => getCartLines(cart), [cart]);
  const cartCount = useMemo(() => getCartCount(cart), [cart]);
  const cartSubtotal = useMemo(() => getCartTotal(cart), [cart]);
  const selectedRegion =
    REGIONS.find((option) => option.code === selectedRegionCode) ?? DEFAULT_REGION;
  const selectedLanguage =
    LANGUAGE_OPTIONS.find((option) => option.code === locale) ?? LANGUAGE_OPTIONS[0];

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
      isMenuOpen ||
      isSearchOpen ||
      isCartOpen ||
      isRegionPickerOpen ||
      isLanguagePickerOpen
        ? "hidden"
        : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [
    isCartOpen,
    isLanguagePickerOpen,
    isMenuOpen,
    isRegionPickerOpen,
    isSearchOpen,
  ]);

  useEffect(() => {
    const storedRegion = window.localStorage.getItem(REGION_STORAGE_KEY);

    if (!storedRegion || !REGIONS.some((option) => option.code === storedRegion)) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setSelectedRegionCode(storedRegion);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(REGION_STORAGE_KEY, selectedRegionCode);
  }, [selectedRegionCode]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsMenuOpen(false);
      setIsSearchOpen(false);
      setIsRegionPickerOpen(false);
      setIsLanguagePickerOpen(false);
      setActiveFlyout(null);
      setIsHeaderHovered(false);
      closeCart();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [closeCart, locale, pathname]);

  useEffect(() => {
    if (!isRegionPickerOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsRegionPickerOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRegionPickerOpen]);

  useEffect(() => {
    if (!isLanguagePickerOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLanguagePickerOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLanguagePickerOpen]);

  const handleLocaleChange = (nextLocale: string) => {
    router.replace(pathname, { locale: nextLocale });
    setIsLanguagePickerOpen(false);
  };

  const handleRegionSelect = (regionCode: string) => {
    setSelectedRegionCode(regionCode);
    setIsRegionPickerOpen(false);
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
                        setActiveFlyout("clothing");
                      }
                    }}
                  >
                    <Link href={link.href} className={styles.navLink}>
                      {link.label}
                    </Link>
                  </div>
                ) : link.label === "Collections" ? (
                  <div
                    key={`${link.href}-${link.label}`}
                    className={styles.flyoutTrigger}
                    onMouseEnter={() => {
                      if (canShowClothingFlyout) {
                        setActiveFlyout("collections");
                      }
                    }}
                  >
                    <Link href={link.href} className={styles.navLink}>
                      {link.label}
                    </Link>
                  </div>
                ) : link.label === "Accessories" ? (
                  <div
                    key={`${link.href}-${link.label}`}
                    className={styles.flyoutTrigger}
                    onMouseEnter={() => {
                      if (canShowClothingFlyout) {
                        setActiveFlyout("accessories");
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
                activeFlyout === "clothing" && canShowClothingFlyout
                  ? styles.clothingFlyoutOpen
                  : ""
              }`}
              onMouseEnter={() => {
                if (canShowClothingFlyout) {
                  setActiveFlyout("clothing");
                }
              }}
              onMouseLeave={() => setActiveFlyout(null)}
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

            <div
              className={`${styles.clothingFlyout} ${
                activeFlyout === "collections" && canShowClothingFlyout
                  ? styles.clothingFlyoutOpen
                  : ""
              }`}
              onMouseEnter={() => {
                if (canShowClothingFlyout) {
                  setActiveFlyout("collections");
                }
              }}
              onMouseLeave={() => setActiveFlyout(null)}
            >
              <div className={styles.flyoutContent}>
                <div className={styles.collectionsListWrap}>
                  <ul className={styles.flyoutList}>
                    {collectionFlyoutLinks.map((item) => (
                      <li key={item.slug}>
                        <Link href={item.href} className={styles.flyoutLink}>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.flyoutFeatures}>
                  <Link
                    href="/collections/balian-armenian-ceramics"
                    className={styles.flyoutCard}
                  >
                    <div className={styles.flyoutImageWrap}>
                      <Image
                        src="/images/heritage-drape-dress/251202_AZM_0930.webp"
                        alt="Balian Collection"
                        fill
                        sizes="(max-width: 1280px) 30vw, 24vw"
                        className={styles.flyoutImage}
                      />
                    </div>
                    <span className={styles.flyoutLabel}>Balian Collection</span>
                  </Link>

                  <Link
                    href="/collections/les-gens-darmenie"
                    className={styles.flyoutCard}
                  >
                    <div className={styles.flyoutImageWrap}>
                      <Image
                        src="/images/stone-layering-jacket/KhachkarWashedGrey.webp"
                        alt="Les Gens Collection"
                        fill
                        sizes="(max-width: 1280px) 30vw, 24vw"
                        className={styles.flyoutImage}
                      />
                    </div>
                    <span className={styles.flyoutLabel}>Les Gens Collection</span>
                  </Link>
                </div>
              </div>
            </div>

            <div
              className={`${styles.clothingFlyout} ${
                activeFlyout === "accessories" && canShowClothingFlyout
                  ? styles.clothingFlyoutOpen
                  : ""
              }`}
              onMouseEnter={() => {
                if (canShowClothingFlyout) {
                  setActiveFlyout("accessories");
                }
              }}
              onMouseLeave={() => setActiveFlyout(null)}
            >
              <div className={styles.flyoutContent}>
                <div className={styles.collectionsListWrap}>
                  <ul className={styles.flyoutList}>
                    {accessoryFlyoutLinks.map((item) => (
                      <li key={item.slug}>
                        <Link href={item.href} className={styles.flyoutLink}>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.flyoutFeatures}>
                  <Link href="/accessories/hats" className={styles.flyoutCard}>
                    <div className={styles.flyoutImageWrap}>
                      <Image
                        src="/images/banner-bg-image.webp"
                        alt="Hats"
                        fill
                        sizes="(max-width: 1280px) 30vw, 24vw"
                        className={styles.flyoutImage}
                      />
                    </div>
                    <span className={styles.flyoutLabel}>Hats</span>
                  </Link>

                  <Link
                    href="/accessories/sports-accessories"
                    className={styles.flyoutCard}
                  >
                    <div className={styles.flyoutImageWrap}>
                      <Image
                        src="/images/midnight-contrast-set/251202_AZM_0827.webp"
                        alt="Sports Accessories"
                        fill
                        sizes="(max-width: 1280px) 30vw, 24vw"
                        className={styles.flyoutImage}
                      />
                    </div>
                    <span className={styles.flyoutLabel}>Sports Accessories</span>
                  </Link>
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

            <button
              type="button"
              className={styles.regionButton}
              onClick={() => setIsRegionPickerOpen(true)}
              aria-label={`Region and currency selector. Current region ${selectedRegion.label}, currency ${selectedRegion.currencyCode}.`}
              aria-expanded={isRegionPickerOpen}
              aria-controls="region-picker-dialog"
            >
              <Globe size={15} strokeWidth={1.6} />
              <span className={styles.regionButtonText}>
                {selectedRegion.code} ({selectedRegion.symbol})
              </span>
            </button>

            <button
              type="button"
              className={styles.languageButton}
              onClick={() => setIsLanguagePickerOpen(true)}
              aria-label={`Language selector. Current language ${selectedLanguage.label}.`}
              aria-expanded={isLanguagePickerOpen}
              aria-controls="language-picker-dialog"
            >
              <span className={styles.languageButtonText}>
                {selectedLanguage.shortLabel}
              </span>
            </button>

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
          <button
            type="button"
            className={styles.drawerUtilityButton}
            onClick={() => setIsRegionPickerOpen(true)}
          >
            Region
            <span className={styles.drawerUtilityMeta}>
              {selectedRegion.code} ({selectedRegion.symbol})
            </span>
          </button>
          <button
            type="button"
            className={styles.drawerUtilityButton}
            onClick={() => setIsLanguagePickerOpen(true)}
          >
            Language
            <span className={styles.drawerUtilityMeta}>
              {selectedLanguage.shortLabel}
            </span>
          </button>
        </div>

        <div className={styles.drawerFooter}>
          <span className={styles.drawerFooterLabel}>Language</span>
          <span className={styles.drawerUtilityMeta}>{selectedLanguage.label}</span>
        </div>
      </aside>

      <div
        className={`${styles.regionBackdrop} ${
          isRegionPickerOpen ? styles.regionBackdropVisible : ""
        }`}
        onClick={() => setIsRegionPickerOpen(false)}
        aria-hidden="true"
      />

      <aside
        id="region-picker-dialog"
        className={`${styles.regionModal} ${
          isRegionPickerOpen ? styles.regionModalOpen : ""
        }`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isRegionPickerOpen}
        aria-label="Update country or region"
      >
        <div className={styles.regionModalHeader}>
          <h2 className={styles.regionModalTitle}>Update country/region</h2>
          <button
            type="button"
            className={styles.regionModalClose}
            onClick={() => setIsRegionPickerOpen(false)}
            aria-label="Close region selector"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <div className={styles.regionModalBody}>
          {REGION_GROUPS.map((group) => (
            <section key={group.title} className={styles.regionGroup}>
              <h3 className={styles.regionGroupTitle}>{group.title}</h3>

              <div className={styles.regionOptionList}>
                {group.options.map((option) => {
                  const isActive = option.code === selectedRegion.code;

                  return (
                    <button
                      key={option.code}
                      type="button"
                      className={`${styles.regionOption} ${
                        isActive ? styles.regionOptionActive : ""
                      }`}
                      onClick={() => handleRegionSelect(option.code)}
                      aria-pressed={isActive}
                    >
                      <span className={styles.regionOptionCode}>{option.code}</span>
                      <span className={styles.regionOptionLabel}>{option.label}</span>
                      <span className={styles.regionOptionMeta}>
                        {option.currencyCode} ({option.symbol})
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </aside>

      <div
        className={`${styles.languageBackdrop} ${
          isLanguagePickerOpen ? styles.languageBackdropVisible : ""
        }`}
        onClick={() => setIsLanguagePickerOpen(false)}
        aria-hidden="true"
      />

      <aside
        id="language-picker-dialog"
        className={`${styles.languageModal} ${
          isLanguagePickerOpen ? styles.languageModalOpen : ""
        }`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isLanguagePickerOpen}
        aria-label="Update language"
      >
        <div className={styles.languageModalHeader}>
          <h2 className={styles.languageModalTitle}>Update language</h2>
          <button
            type="button"
            className={styles.languageModalClose}
            onClick={() => setIsLanguagePickerOpen(false)}
            aria-label="Close language selector"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <div className={styles.languageModalBody}>
          {LANGUAGE_OPTIONS.map((option) => {
            const isActive = option.code === locale;

            return (
              <button
                key={option.code}
                type="button"
                className={`${styles.languageOption} ${
                  isActive ? styles.languageOptionActive : ""
                }`}
                onClick={() => handleLocaleChange(option.code)}
                aria-pressed={isActive}
              >
                <span className={styles.languageOptionLabel}>{option.label}</span>
              </button>
            );
          })}
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
