import type { Money } from './shopify/types';

export function formatPrice(money: Money): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: money.currencyCode,
    minimumFractionDigits: 2,
  }).format(parseFloat(money.amount));
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export function getProductUrl(handle: string, locale?: string): string {
  const base = locale ? `/${locale}` : '';
  return `${base}/products/${handle}`;
}

export function getCollectionUrl(handle: string, locale?: string): string {
  const base = locale ? `/${locale}` : '';
  return `${base}/collections/${handle}`;
}

export function isOnSale(
  price: Money,
  compareAtPrice: Money | null
): boolean {
  if (!compareAtPrice) return false;
  return parseFloat(compareAtPrice.amount) > parseFloat(price.amount);
}

export function getSalePercentage(
  price: Money,
  compareAtPrice: Money | null
): number {
  if (!compareAtPrice) return 0;
  const original = parseFloat(compareAtPrice.amount);
  const current = parseFloat(price.amount);
  if (original <= 0) return 0;
  return Math.round(((original - current) / original) * 100);
}

export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}
