import productsData from '../../data/products.json';
import brandsData from '../../data/brands.json';
import siteData from '../../data/site.json';

export interface ProductImage {
  src: string;
  alt: string;
  isMain: boolean;
  originalSrc?: string;
}

export type MilkSystem = 'auto' | 'panarello' | 'none';

export interface Product {
  slug: string;
  name: string;
  brand: string;
  brandDisplayName: string;
  price: number | null;
  priceEur: number | null;
  currency: string;
  inStock: boolean;
  warranty: string;
  description: string;
  specs: Record<string, string>;
  images: ProductImage[];
  manualUrl: string | null;
  relatedSlugs: string[];
  metaTitle: string;
  metaDescription: string;
  series?: string;
  modelNumber?: string;
  milkSystem?: MilkSystem;
}

export interface Brand {
  slug: string;
  displayName: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  productCount: number;
  productSlugs: string[];
}

export interface SiteConfig {
  name: string;
  businessName: string;
  tagline: string;
  phone: string;
  phoneDisplay: string;
  email: string;
  viber: string;
  whatsapp: string;
  address: {
    city: string;
    district: string;
    street: string;
    detail: string;
  };
  hours: string;
  url: string;
  warranty: string;
  copyright: string;
  navigation: { label: string; href: string }[];
  legalLinks: { label: string; href: string }[];
}

export const products: Product[] = productsData as Product[];
export const brands: Brand[] = brandsData as Brand[];
export const site: SiteConfig = siteData as SiteConfig;

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

// Explicit display order for Saeco products (first 6 are featured)
const SAECO_ORDER = [
  'saeco-syntia',
  'saeco-intelia-evo',
  'saeco-minuto-cappuccino-hd8763',
  'saeco-granbaristo',
  'saeco-odea-giro',
  'saeco-moltio',
];

// Explicit display order for DeLonghi products (first 6 are featured)
const DELONGHI_ORDER = [
  'delonghi-primadonna-s',
  'delonghi-magnifica-s-ecam-22-110-sb',
  'primadonna-avant-6700',
  'delonghi-cappuccino-ecam-23-450',
  'delonghi-intensa-esam-23420',
  'delonghi-ecam-22-360-b',
];

export function getProductsByBrand(brandSlug: string): Product[] {
  const brandProducts = products.filter(p => p.brand === brandSlug);
  const orderMap: Record<string, string[]> = {
    delonghi: DELONGHI_ORDER,
    saeco: SAECO_ORDER,
  };
  const order = orderMap[brandSlug];
  if (order) {
    const ordered = order
      .map(slug => brandProducts.find(p => p.slug === slug))
      .filter((p): p is Product => p !== undefined);
    const rest = brandProducts.filter(p => !order.includes(p.slug));
    return [...ordered, ...rest];
  }
  return brandProducts;
}

export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find(b => b.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const related = product.relatedSlugs
    .map(slug => getProductBySlug(slug))
    .filter((p): p is Product => p !== undefined);

  if (related.length >= limit) return related.slice(0, limit);

  // Fill with same-brand products if not enough related
  const sameBrand = getProductsByBrand(product.brand)
    .filter(p => p.slug !== product.slug && !related.find(r => r.slug === p.slug));

  return [...related, ...sameBrand].slice(0, limit);
}
