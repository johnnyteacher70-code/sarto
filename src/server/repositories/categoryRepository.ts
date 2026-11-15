import { createClient } from "@/lib/supabase/server";
import { Category } from "@/types";
import { SAMPLE_CATEGORIES } from "@/lib/constants";

export async function getActiveCategories(): Promise<Category[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return SAMPLE_CATEGORIES;
    }

    return data as Category[];
  } catch {
    return SAMPLE_CATEGORIES;
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("slug", slug)
      .eq("is_active", true)
      .single();

    if (error || !data) {
      return SAMPLE_CATEGORIES.find((c) => c.slug === slug) || null;
    }
    return data as Category;
  } catch {
    return SAMPLE_CATEGORIES.find((c) => c.slug === slug) || null;
  }
}
