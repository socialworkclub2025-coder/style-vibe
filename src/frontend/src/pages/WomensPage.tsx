import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "motion/react";
import { useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { Category, useProductsByCategory } from "../hooks/useQueries";

const SUBCATEGORIES = [
  "All",
  "Sarees",
  "Three-piece Suits",
  "Burqas & Abayas",
  "Tops & Tunics",
];
const SKELETON_KEYS = ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6", "sk7", "sk8"];

export function WomensPage() {
  const [activeTab, setActiveTab] = useState("All");
  const { data: products, isLoading } = useProductsByCategory(Category.womens);

  const filtered =
    activeTab === "All"
      ? (products ?? [])
      : (products ?? []).filter(
          (p) => p.subcategory.toLowerCase() === activeTab.toLowerCase(),
        );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="relative rounded-2xl overflow-hidden mb-10">
        <img
          src="/assets/generated/category-womens.dim_800x400.jpg"
          alt="Women's Collection"
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center px-8">
          <div>
            <h1
              className="text-4xl font-bold text-white"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Women's Collection
            </h1>
            <p className="text-gray-300 mt-1">
              Elegant styles for every occasion
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8 overflow-x-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex gap-1 bg-muted p-1 rounded-lg w-max">
            {SUBCATEGORIES.map((sub) => (
              <TabsTrigger
                key={sub}
                value={sub}
                data-ocid="product.tab"
                className="rounded-md px-4 text-sm whitespace-nowrap"
              >
                {sub}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {isLoading ? (
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          data-ocid="product.loading_state"
        >
          {SKELETON_KEYS.map((k) => (
            <div key={k} className="space-y-3">
              <Skeleton className="aspect-square w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="text-center py-20 text-muted-foreground"
          data-ocid="product.empty_state"
        >
          <p className="text-lg">No products found in this category.</p>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.05 } },
            hidden: {},
          }}
        >
          {filtered.map((product, idx) => (
            <motion.div
              key={product.id.toString()}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <ProductCard product={product} index={idx} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </main>
  );
}
