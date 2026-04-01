"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import type { CatalogProduct } from "@/app/components/catalogProducts";
import styles from "./page.module.css";

type SortKey =
  | "featured"
  | "best-selling"
  | "alphabetical-asc"
  | "alphabetical-desc"
  | "price-asc"
  | "price-desc"
  | "date-asc"
  | "date-desc";

type FilterState = {
  availability: string[];
  price: string[];
  productType: string[];
  size: string[];
  gender: string[];
  color: string[];
};

type FilterKey = keyof FilterState;

type EnrichedProduct = CatalogProduct & {
  id: string;
  priceValue: number;
  availability: string;
  productType: string;
  sizes: string[];
  gender: string;
  colorLabels: string[];
  featuredRank: number;
  bestSellingRank: number;
  dateRank: number;
};

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "best-selling", label: "Best selling" },
  { value: "alphabetical-asc", label: "Alphabetically, A-Z" },
  { value: "alphabetical-desc", label: "Alphabetically, Z-A" },
  { value: "price-asc", label: "Price, low to high" },
  { value: "price-desc", label: "Price, high to low" },
  { value: "date-asc", label: "Date, old to new" },
  { value: "date-desc", label: "Date, new to old" },
];

const EMPTY_FILTERS: FilterState = {
  availability: [],
  price: [],
  productType: [],
  size: [],
  gender: [],
  color: [],
};

const FILTER_SECTIONS: { key: FilterKey; label: string }[] = [
  { key: "availability", label: "Availability" },
  { key: "price", label: "Price" },
  { key: "productType", label: "Product type" },
  { key: "size", label: "Size" },
  { key: "gender", label: "Gender" },
  { key: "color", label: "Color" },
];

const TITLE_METADATA: Record<
  string,
  {
    productType: string;
    sizes: string[];
    gender: string;
    colorLabels: string[];
    bestSellingRank: number;
  }
> = {
  "Obsidian Tailoring Coat": {
    productType: "Outerwear",
    sizes: ["S", "M", "L", "XL"],
    gender: "Unisex",
    colorLabels: ["Black", "Taupe", "Bone"],
    bestSellingRank: 3,
  },
  "Heritage Drape Dress": {
    productType: "Dresses",
    sizes: ["XS", "S", "M", "L"],
    gender: "Women",
    colorLabels: ["White", "Sand", "Espresso"],
    bestSellingRank: 2,
  },
  "Midnight Contrast Set": {
    productType: "Sets",
    sizes: ["S", "M", "L", "XL"],
    gender: "Unisex",
    colorLabels: ["Black", "Cream", "Camel"],
    bestSellingRank: 1,
  },
  "Stone Layering Jacket": {
    productType: "Outerwear",
    sizes: ["M", "L", "XL"],
    gender: "Men",
    colorLabels: ["Stone", "Sand", "White"],
    bestSellingRank: 4,
  },
};

const PRICE_BUCKETS = [
  { label: "Under $350", match: (price: number) => price < 350 },
  { label: "$350 - $399", match: (price: number) => price >= 350 && price < 400 },
  { label: "$400 and above", match: (price: number) => price >= 400 },
];

function normalizeProducts(products: CatalogProduct[]): EnrichedProduct[] {
  return products.map((product, index) => {
    const metadata = TITLE_METADATA[product.title] ?? {
      productType: "Apparel",
      sizes: ["S", "M", "L"],
      gender: "Unisex",
      colorLabels: ["Black"],
      bestSellingRank: 99,
    };

    return {
      ...product,
      id: `${product.title}-${index}`,
      priceValue: Number(product.price.replace(/[^0-9.]/g, "")),
      availability: "In stock",
      productType: metadata.productType,
      sizes: metadata.sizes,
      gender: metadata.gender,
      colorLabels: metadata.colorLabels,
      featuredRank: index,
      bestSellingRank: metadata.bestSellingRank * 100 + index,
      dateRank: index,
    };
  });
}

function getFilterOptions(products: EnrichedProduct[]) {
  return {
    availability: ["In stock"],
    price: PRICE_BUCKETS.map((bucket) => bucket.label),
    productType: Array.from(new Set(products.map((product) => product.productType))),
    size: Array.from(
      new Set(products.flatMap((product) => product.sizes)),
    ).sort((left, right) => left.localeCompare(right)),
    gender: Array.from(new Set(products.map((product) => product.gender))),
    color: Array.from(
      new Set(products.flatMap((product) => product.colorLabels)),
    ).sort((left, right) => left.localeCompare(right)),
  };
}

function matchesFilters(product: EnrichedProduct, filters: FilterState) {
  const priceLabel = PRICE_BUCKETS.find((bucket) => bucket.match(product.priceValue))?.label;

  return (
    (filters.availability.length === 0 ||
      filters.availability.includes(product.availability)) &&
    (filters.price.length === 0 ||
      (priceLabel ? filters.price.includes(priceLabel) : false)) &&
    (filters.productType.length === 0 ||
      filters.productType.includes(product.productType)) &&
    (filters.size.length === 0 ||
      product.sizes.some((size) => filters.size.includes(size))) &&
    (filters.gender.length === 0 || filters.gender.includes(product.gender)) &&
    (filters.color.length === 0 ||
      product.colorLabels.some((color) => filters.color.includes(color)))
  );
}

function sortProducts(products: EnrichedProduct[], sortBy: SortKey) {
  const sorted = [...products];

  sorted.sort((left, right) => {
    switch (sortBy) {
      case "best-selling":
        return left.bestSellingRank - right.bestSellingRank;
      case "alphabetical-asc":
        return left.title.localeCompare(right.title);
      case "alphabetical-desc":
        return right.title.localeCompare(left.title);
      case "price-asc":
        return left.priceValue - right.priceValue;
      case "price-desc":
        return right.priceValue - left.priceValue;
      case "date-asc":
        return left.dateRank - right.dateRank;
      case "date-desc":
        return right.dateRank - left.dateRank;
      case "featured":
      default:
        return left.featuredRank - right.featuredRank;
    }
  });

  return sorted;
}

export function NewInCollection({ products }: { products: CatalogProduct[] }) {
  const productsPerPage = 20;
  const normalizedProducts = useMemo(() => normalizeProducts(products), [products]);
  const filterOptions = useMemo(
    () => getFilterOptions(normalizedProducts),
    [normalizedProducts],
  );

  const [sortBy, setSortBy] = useState<SortKey>("featured");
  const [selectedFilters, setSelectedFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [draftFilters, setDraftFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<FilterKey | null>("availability");
  const [currentPage, setCurrentPage] = useState(1);
  const sortMenuRef = useRef<HTMLDivElement | null>(null);

  const filteredProducts = useMemo(() => {
    const visibleProducts = normalizedProducts.filter((product) =>
      matchesFilters(product, selectedFilters),
    );

    return sortProducts(visibleProducts, sortBy);
  }, [normalizedProducts, selectedFilters, sortBy]);

  const activeFilterCount = useMemo(
    () => Object.values(selectedFilters).reduce((total, values) => total + values.length, 0),
    [selectedFilters],
  );

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / productsPerPage));
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return filteredProducts.slice(startIndex, startIndex + productsPerPage);
  }, [currentPage, filteredProducts]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilters, sortBy]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    if (!isFilterOpen) {
      return;
    }

    setDraftFilters(selectedFilters);
  }, [isFilterOpen, selectedFilters]);

  useEffect(() => {
    if (!isFilterOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isFilterOpen]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!sortMenuRef.current?.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSortOpen(false);
        setIsFilterOpen(false);
      }
    };

    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function toggleDraftFilter(key: FilterKey, value: string) {
    setDraftFilters((currentFilters) => {
      const values = currentFilters[key];
      const nextValues = values.includes(value)
        ? values.filter((entry) => entry !== value)
        : [...values, value];

      return {
        ...currentFilters,
        [key]: nextValues,
      };
    });
  }

  function clearFilters() {
    setDraftFilters({ ...EMPTY_FILTERS });
    setSelectedFilters({ ...EMPTY_FILTERS });
  }

  function applyFilters() {
    setSelectedFilters(draftFilters);
    setIsFilterOpen(false);
  }

  return (
    <>
      <section className={styles.toolbar}>
        <p className={styles.count}>{filteredProducts.length} products</p>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.controlButton}
            onClick={() => setIsFilterOpen(true)}
          >
            <span>Filter</span>
            <span className={styles.controlMeta}>
              ({activeFilterCount > 0 ? activeFilterCount : filteredProducts.length})
            </span>
          </button>

          <div className={styles.sortWrap} ref={sortMenuRef}>
            <button
              type="button"
              className={`${styles.controlButton} ${styles.sortButton}`}
              onClick={() => setIsSortOpen((open) => !open)}
              aria-expanded={isSortOpen}
            >
              <span>Sort by</span>
              <span className={styles.controlValue}>
                {SORT_OPTIONS.find((option) => option.value === sortBy)?.label}
              </span>
            </button>

            {isSortOpen ? (
              <div className={styles.sortMenu}>
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`${styles.sortOption} ${
                      sortBy === option.value ? styles.sortOptionActive : ""
                    }`}
                    onClick={() => {
                      setSortBy(option.value);
                      setIsSortOpen(false);
                    }}
                  >
                    <span className={styles.sortCheck}>{sortBy === option.value ? "✓" : ""}</span>
                    {option.label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className={styles.grid}>
        {paginatedProducts.map((product) => (
          <article key={product.id} className={styles.card}>
            <div className={styles.imageWrap}>
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className={styles.image}
              />
            </div>

            <div className={styles.details}>
              <h2 className={styles.name}>{product.title}</h2>
              <p className={styles.price}>{product.price}</p>
            </div>

            <div className={styles.swatches} aria-hidden="true">
              {product.colors.map((color) => (
                <span
                  key={`${product.id}-${color}`}
                  className={styles.swatch}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </article>
        ))}
      </section>

      {totalPages > 1 ? (
        <nav className={styles.pagination} aria-label="Product pagination">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              className={`${styles.pageButton} ${
                currentPage === pageNumber ? styles.pageButtonActive : ""
              }`}
              onClick={() => setCurrentPage(pageNumber)}
              aria-current={currentPage === pageNumber ? "page" : undefined}
            >
              {pageNumber}
            </button>
          ))}

          <button
            type="button"
            className={styles.pageArrow}
            onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            ›
          </button>
        </nav>
      ) : null}

      <div
        className={`${styles.filterOverlay} ${isFilterOpen ? styles.filterOverlayOpen : ""}`}
        onClick={() => setIsFilterOpen(false)}
        aria-hidden={!isFilterOpen}
      />

      <aside
        className={`${styles.filterPanel} ${isFilterOpen ? styles.filterPanelOpen : ""}`}
        aria-hidden={!isFilterOpen}
      >
        <div className={styles.filterHeader}>
          <p className={styles.filterTitle}>Filter ({filteredProducts.length})</p>
          <button
            type="button"
            className={styles.filterClose}
            onClick={() => setIsFilterOpen(false)}
            aria-label="Close filters"
          >
            ×
          </button>
        </div>

        <div className={styles.filterBody}>
          {FILTER_SECTIONS.map((section) => (
            <section key={section.key} className={styles.filterSection}>
              <button
                type="button"
                className={styles.filterSectionToggle}
                onClick={() =>
                  setExpandedSection((currentSection) =>
                    currentSection === section.key ? null : section.key,
                  )
                }
                aria-expanded={expandedSection === section.key}
              >
                <span>{section.label}</span>
                <span
                  className={`${styles.filterArrow} ${
                    expandedSection === section.key ? styles.filterArrowOpen : ""
                  }`}
                >
                  ›
                </span>
              </button>

              {expandedSection === section.key ? (
                <div className={styles.filterOptions}>
                  {filterOptions[section.key].map((option) => {
                    const isActive = draftFilters[section.key].includes(option);

                    return (
                      <button
                        key={`${section.key}-${option}`}
                        type="button"
                        className={`${styles.filterOption} ${
                          isActive ? styles.filterOptionActive : ""
                        }`}
                        onClick={() => toggleDraftFilter(section.key, option)}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </section>
          ))}
        </div>

        <div className={styles.filterFooter}>
          <button type="button" className={styles.filterReset} onClick={clearFilters}>
            Remove all
          </button>
          <button type="button" className={styles.filterApply} onClick={applyFilters}>
            Apply
          </button>
        </div>
      </aside>
    </>
  );
}
