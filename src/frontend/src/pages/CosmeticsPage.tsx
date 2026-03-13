import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import { ProductCard } from "../components/ProductCard";
import { Category, useProductsByCategory } from "../hooks/useQueries";

const SKELETON_KEYS = ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6", "sk7", "sk8"];

export function CosmeticsPage() {
  const { data: products, isLoading } = useProductsByCategory(
    Category.cosmetics,
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="relative rounded-2xl overflow-hidden mb-10">
        <img
          src="/assets/generated/category-cosmetics.dim_800x400.jpg"
          alt="Cosmetics"
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center px-8">
          <div>
            <h1
              className="text-4xl font-bold text-white"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Cosmetics
            </h1>
            <p className="text-gray-300 mt-1">
              Premium beauty and skincare products
            </p>
          </div>
        </div>
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
      ) : !products || products.length === 0 ? (
        <div
          className="text-center py-20 text-muted-foreground"
          data-ocid="product.empty_state"
        >
          <p className="text-lg">No cosmetics products available right now.</p>
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
          {products.map((product, idx) => (
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
