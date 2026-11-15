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
      <label htmlFor="sort-select" className="text-xs text-white/50 font-medium flex items-center gap-1 shrink-0">
        <ArrowUpDown className="w-3.5 h-3.5" /> Saralash:
      </label>
      <select
        id="sort-select"
        value={currentSort}
        onChange={handleSortChange}
        className="min-h-[38px] border border-white/15 bg-[#141414] px-3.5 py-1.5 text-xs sm:text-sm text-white font-medium focus-visible:outline-none focus-visible:border-white cursor-pointer rounded-full"
      >
        <option value="newest" className="bg-[#141414] text-white">Yangi kelganlar</option>
        <option value="featured" className="bg-[#141414] text-white">Tavsiya etilganlar</option>
        <option value="price_asc" className="bg-[#141414] text-white">Narx: arzonroqdan</option>
        <option value="price_desc" className="bg-[#141414] text-white">Narx: qimmatroqdan</option>
      </select>
    </div>
  );
}
