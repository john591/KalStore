const DEFAULT_PRODUCT_IMAGE =
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&auto=format&fit=crop&q=80";

const DJANGO_API_URL =
  process.env.DJANGO_API_URL ??
  process.env.NEXT_PUBLIC_DJANGO_API_URL ??
  "http://127.0.0.1:8000/api";

type DjangoImage = {
  id: number;
  image: string;
  alt_text: string;
  is_primary: boolean;
  created_at: string;
};

type DjangoEntity = {
  id: number;
  name: string;
  slug: string;
};

type DjangoSubCategory = DjangoEntity & {
  category?: DjangoEntity;
};

type DjangoProduct = {
  id: number;
  name: string;
  slug: string;
  images: DjangoImage[];
  brand: DjangoEntity | null;
  category: DjangoEntity;
  subcategory: DjangoSubCategory | null;
  sku: string | null;
  price: string;
  old_price: string | null;
  stock: number;
  description: string;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
};

type PaginatedResponse<T> = {
  results: T[];
};

export type CatalogProduct = {
  id: number;
  name: string;
  slug: string;
  image: string;
  imageAlt: string;
  images: CatalogProductImage[];
  category: DjangoEntity;
  subcategory: DjangoEntity | null;
  brand: DjangoEntity | null;
  sku: string | null;
  price: number;
  oldPrice: number | null;
  stock: number;
  description: string;
  isActive: boolean;
  isFeatured: boolean;
};

export type CatalogCategory = {
  id: number;
  name: string;
  slug: string;
  productCount: number;
  image: string;
  imageAlt: string;
};

export type CatalogProductImage = {
  id: number;
  image: string;
  altText: string;
  isPrimary: boolean;
};

function getApiOrigin() {
  return new URL(DJANGO_API_URL).origin;
}

function getApiUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${DJANGO_API_URL}${normalizedPath}`;
}

function getListData<T>(payload: T[] | PaginatedResponse<T>) {
  return Array.isArray(payload) ? payload : payload.results;
}

function toAbsoluteMediaUrl(url?: string | null) {
  if (!url) {
    return DEFAULT_PRODUCT_IMAGE;
  }

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `${getApiOrigin()}${url.startsWith("/") ? url : `/${url}`}`;
}

function normalizeProduct(product: DjangoProduct): CatalogProduct {
  const primaryImage =
    product.images.find((image) => image.is_primary) ?? product.images[0];
  const images =
    product.images.length > 0
      ? product.images.map((image) => ({
          id: image.id,
          image: toAbsoluteMediaUrl(image.image),
          altText: image.alt_text || product.name,
          isPrimary: image.is_primary,
        }))
      : [
          {
            id: product.id,
            image: DEFAULT_PRODUCT_IMAGE,
            altText: product.name,
            isPrimary: true,
          },
        ];

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    image: toAbsoluteMediaUrl(primaryImage?.image),
    imageAlt: primaryImage?.alt_text || product.name,
    images,
    category: product.category,
    subcategory: product.subcategory
      ? {
          id: product.subcategory.id,
          name: product.subcategory.name,
          slug: product.subcategory.slug,
        }
      : null,
    brand: product.brand,
    sku: product.sku,
    price: Number(product.price),
    oldPrice: product.old_price ? Number(product.old_price) : null,
    stock: product.stock,
    description: product.description,
    isActive: product.is_active,
    isFeatured: product.is_featured,
  };
}

async function djangoFetch<T>(path: string) {
  let response: Response;

  try {
    response = await fetch(getApiUrl(path), {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? `Django API is unreachable at ${DJANGO_API_URL}. ${error.message}`
        : `Django API is unreachable at ${DJANGO_API_URL}.`,
    );
  }

  if (!response.ok) {
    throw new Error(`Django API request failed: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as T;
}

export async function getProducts() {
  let payload: DjangoProduct[] | PaginatedResponse<DjangoProduct>;

  try {
    payload = await djangoFetch<DjangoProduct[] | PaginatedResponse<DjangoProduct>>(
      "/catalog/products/",
    );
  } catch (error) {
    console.error("Incable de charger les produits de la BDD", error);
    return [];
  }

  return getListData(payload)
    .map(normalizeProduct)
    .filter((product) => product.isActive);
}

export async function getFeaturedProducts(limit = 12) {
  const products = await getProducts();
  const featuredProducts = products.filter((product) => product.isFeatured);

  if (featuredProducts.length > 0) {
    return featuredProducts.slice(0, limit);
  }

  return products.slice(0, limit);
}

export async function getProductBySlug(slug: string) {
  try {
    const directProduct = await djangoFetch<DjangoProduct>(
      `/catalog/products/${encodeURIComponent(slug)}/`,
    );

    if (directProduct.is_active) {
      return normalizeProduct(directProduct);
    }
  } catch {
    // Fall through to other common API shapes.
  }

  try {
    const filteredPayload = await djangoFetch<DjangoProduct[] | PaginatedResponse<DjangoProduct>>(
      `/catalog/products/?slug=${encodeURIComponent(slug)}`,
    );
    const filteredProduct = getListData(filteredPayload).find(
      (product) => product.slug === slug && product.is_active,
    );

    if (filteredProduct) {
      return normalizeProduct(filteredProduct);
    }
  } catch {
    // Fall back to the product list if the API does not support filtering by slug.
  }

  const products = await getProducts();
  return products.find((product) => product.slug === slug) ?? null;
}

export async function getCategories() {
  const products = await getProducts();
  const categories = new Map<string, CatalogCategory>();

  for (const product of products) {
    const existingCategory = categories.get(product.category.slug);

    if (existingCategory) {
      existingCategory.productCount += 1;
      continue;
    }

    categories.set(product.category.slug, {
      id: product.category.id,
      name: product.category.name,
      slug: product.category.slug,
      productCount: 1,
      image: product.image,
      imageAlt: product.imageAlt,
    });
  }

  return Array.from(categories.values()).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
}
