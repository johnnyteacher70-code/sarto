"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ArrowUpDown } from "lucide-react";

interface SortSelectProps {
  currentSort: string;
}

export function SortSelect({ currentSort }: SortSelectProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    const newSort = e.target.value;
    if (newSort === "newest") {
      params.delete("sort");
    } else {
      params.set("sort", newSort);
    }
    const queryString = params.toString();
    router.push(`${pathname}${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <div className="flex items-center gap-2 self-start sm:self-auto">
      <label htmlFor="sort-select" className="text-xs text-sarto-muted font-medium flex items-center gap-1 shrink-0">
        <ArrowUpDown className="w-3.5 h-3.5" /> Saralash:
      </label>
      <select
        id="sort-select"
        value={currentSort}
        onChange={handleSortChange}
        className="min-h-[42px] border border-sarto-border bg-white px-3 py-1.5 text-xs sm:text-sm text-sarto-black font-medium focus-visible:outline-none focus-visible:border-sarto-black cursor-pointer rounded-none"
      >
        <option value="newest">Yangi kelganlar</option>
        <option value="featured">Tavsiya etilganlar</option>
        <option value="price_asc">Narx: arzonroqdan</option>
        <option value="price_desc">Narx: qimmatroqdan</option>
      </select>
    </div>
  );
}
