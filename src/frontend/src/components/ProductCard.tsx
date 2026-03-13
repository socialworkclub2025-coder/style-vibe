import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Package, ShoppingCart } from "lucide-react";
import type { Product } from "../backend";

interface ProductCardProps {
  product: Product;
  index: number;
}

const PLACEHOLDER_GRADIENTS = [
  "from-amber-900 to-amber-700",
  "from-slate-800 to-slate-600",
  "from-rose-900 to-pink-700",
  "from-emerald-900 to-teal-700",
  "from-indigo-900 to-blue-700",
  "from-purple-900 to-violet-700",
];

export function ProductCard({ product, index }: ProductCardProps) {
  const navigate = useNavigate();
  const gradient = PLACEHOLDER_GRADIENTS[index % PLACEHOLDER_GRADIENTS.length];

  const handleOrder = () => {
    navigate({
      to: "/order",
      search: { productId: product.id.toString() },
    });
  };

  const cardIndex = index + 1;

  return (
    <article
      className="product-card group"
      data-ocid={`product.item.${cardIndex}`}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div
            className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}
          >
            <Package className="h-16 w-16 text-white/30" />
          </div>
        )}
        {/* Stock badge */}
        {!product.inStock && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
            Out of Stock
          </div>
        )}
        {/* Discount badge */}
        {product.regularPrice > product.offerPrice && (
          <div
            className="absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded"
            style={{
              background: "oklch(var(--gold))",
              color: "oklch(var(--charcoal-deep))",
            }}
          >
            {Math.round(
              (1 - Number(product.offerPrice) / Number(product.regularPrice)) *
                100,
            )}
            % OFF
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground text-sm leading-snug line-clamp-2 flex-1">
            {product.name}
          </h3>
          {product.subcategory && (
            <Badge variant="secondary" className="text-xs shrink-0">
              {product.subcategory}
            </Badge>
          )}
        </div>

        {/* Pricing */}
        <div className="flex items-center gap-3">
          <span
            className="text-xl font-bold"
            style={{ color: "oklch(var(--gold))" }}
          >
            ৳{Number(product.offerPrice).toLocaleString()}
          </span>
          {product.regularPrice > product.offerPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ৳{Number(product.regularPrice).toLocaleString()}
            </span>
          )}
        </div>

        <Button
          onClick={handleOrder}
          disabled={!product.inStock}
          className="w-full font-semibold text-sm"
          style={{
            background: product.inStock ? "oklch(var(--gold))" : undefined,
            color: product.inStock ? "oklch(var(--charcoal-deep))" : undefined,
          }}
          data-ocid={`product.order_button.${cardIndex}`}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.inStock ? "Order Now" : "Out of Stock"}
        </Button>
      </div>
    </article>
  );
}
