import { createClient } from "@/lib/supabase/server";
import { Product } from "@/types";
import { SAMPLE_PRODUCTS } from "@/lib/constants";

export interface GetProductsParams {
  categorySlug?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "newest" | "price_asc" | "price_desc" | "featured";
  page?: number;
  limit?: number;
  search?: string;
}

export async function getProducts(params: GetProductsParams = {}): Promise<{
  products: Product[];
  total: number;
}> {
  const {
    categorySlug,
    minPrice,
    maxPrice,
    sort = "newest",
    page = 1,
    limit = 12,
    search,
  } = params;

  try {
    const supabase = await createClient();
    let query = supabase
      .from("products")
      .select("*, category:categories(*), variants:product_variants(*), images:product_images(*)", {
        count: "exact",
      })
      .eq("status", "active");

    if (categorySlug) {
      const { data: category } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", categorySlug)
        .single();

      if (category) {
        query = query.eq("category_id", category.id);
      }
    }

    if (search) {
      query = query.ilike("name", `%${search}%`);
    }

    if (sort === "newest") {
      query = query.order("created_at", { ascending: false });
    } else if (sort === "featured") {
      query = query.order("is_featured", { ascending: false });
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, count, error } = await query;

    if (!error && data && data.length > 0) {
      return { products: data as unknown as Product[], total: count || data.length };
    }
  } catch {
    // Supabase ulanishi bo'lmasa fallback'ga o'tadi
  }

  // Fallback to SAMPLE_PRODUCTS
  let filtered = [...SAMPLE_PRODUCTS];

  if (categorySlug) {
    filtered = filtered.filter((p) => p.category?.slug === categorySlug);
  }

  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(
      (p) => p.name.toLowerCase().includes(s) || p.description.toLowerCase().includes(s)
    );
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    filtered = filtered.filter((p) => {
      const price = p.variants?.[0]?.price_uzs || 0;
      if (minPrice !== undefined && price < minPrice) return false;
      if (maxPrice !== undefined && price > maxPrice) return false;
      return true;
    });
  }

  if (sort === "price_asc") {
    filtered.sort((a, b) => (a.variants?.[0]?.price_uzs || 0) - (b.variants?.[0]?.price_uzs || 0));
  } else if (sort === "price_desc") {
    filtered.sort((a, b) => (b.variants?.[0]?.price_uzs || 0) - (a.variants?.[0]?.price_uzs || 0));
  }

  const from = (page - 1) * limit;
  const paginated = filtered.slice(from, from + limit);

  return { products: paginated, total: filtered.length };
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*, category:categories(*), variants:product_variants(*), images:product_images(*)")
      .eq("slug", slug)
      .eq("status", "active")
      .single();

    if (!error && data) return data as unknown as Product;
  } catch {
    // Fallback
  }

  return SAMPLE_PRODUCTS.find((p) => p.slug === slug) || null;
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*, category:categories(*), variants:product_variants(*), images:product_images(*)")
      .eq("status", "active")
      .eq("is_featured", true)
      .limit(limit);

    if (!error && data && data.length > 0) {
      return data as unknown as Product[];
    }
  } catch {
    // Fallback
  }

  return SAMPLE_PRODUCTS.filter((p) => p.is_featured).slice(0, limit);
}
