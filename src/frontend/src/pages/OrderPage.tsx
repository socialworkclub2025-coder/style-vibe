import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { AlertTriangle, ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useActor } from "../hooks/useActor";
import { usePlaceOrder } from "../hooks/useQueries";

const BANGLADESH_DISTRICTS = [
  "Dhaka",
  "Chattogram",
  "Sylhet",
  "Rajshahi",
  "Khulna",
  "Barisal",
  "Rangpur",
  "Mymensingh",
  "Comilla",
  "Narayanganj",
  "Gazipur",
  "Narsingdi",
  "Tangail",
  "Manikganj",
  "Munshiganj",
  "Shariatpur",
  "Madaripur",
  "Gopalganj",
  "Faridpur",
  "Rajbari",
  "Cox's Bazar",
  "Feni",
  "Lakshmipur",
  "Noakhali",
  "Chandpur",
  "Brahmanbaria",
  "B. Baria",
  "Habiganj",
  "Moulvibazar",
  "Sunamganj",
  "Natore",
  "Naogaon",
  "Chapainawabganj",
  "Pabna",
  "Sirajganj",
  "Bogura",
  "Joypurhat",
  "Jessore",
  "Satkhira",
  "Bagerhat",
  "Narail",
  "Jhenaidah",
  "Magura",
  "Kushtia",
  "Chuadanga",
  "Meherpur",
  "Patuakhali",
  "Bhola",
  "Jhalokati",
  "Pirojpur",
  "Barguna",
  "Gaibandha",
  "Kurigram",
  "Lalmonirhat",
  "Nilphamari",
  "Panchagarh",
  "Thakurgaon",
  "Dinajpur",
  "Jamalpur",
  "Kishoreganj",
  "Netrokona",
  "Sherpur",
];

export function OrderPage() {
  const search = useSearch({ from: "/order" });
  const navigate = useNavigate();
  const { actor, isFetching } = useActor();

  const productId = search.productId ? BigInt(search.productId) : null;

  const { data: product } = useQuery({
    queryKey: ["product", productId?.toString()],
    queryFn: async () => {
      if (!actor || !productId) return null;
      return actor.getProduct(productId);
    },
    enabled: !!actor && !isFetching && !!productId,
  });

  const [customerName, setCustomerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [district, setDistrict] = useState("");
  const [thana, setThana] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [quantity] = useState(1);
  const [orderId, setOrderId] = useState<bigint | null>(null);

  const deliveryCharge = district === "Dhaka" ? 70 : district ? 130 : 0;
  const subtotal = product ? Number(product.offerPrice) * quantity : 0;
  const grandTotal = subtotal + deliveryCharge;

  const { mutate, isPending, isError } = usePlaceOrder();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId) return;
    mutate(
      {
        customerName,
        mobileNumber,
        district,
        thana,
        fullAddress,
        productId,
        quantity: BigInt(quantity),
      },
      { onSuccess: (id) => setOrderId(id) },
    );
  };

  if (orderId !== null) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div
          className="bg-card border border-border rounded-2xl p-10 shadow-lg"
          data-ocid="order.success_state"
        >
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1
            className="text-3xl font-bold mb-2"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Order Confirmed!
          </h1>
          <p className="text-muted-foreground mb-4">
            Your order has been placed successfully.
          </p>
          <div
            className="inline-block px-6 py-3 rounded-xl font-mono text-sm font-bold"
            style={{
              background: "oklch(var(--gold))",
              color: "oklch(var(--charcoal-deep))",
            }}
          >
            Order ID: #{orderId.toString()}
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            We'll contact you at <strong>{mobileNumber}</strong> to confirm
            delivery.
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Delivery to: {district} — ৳{deliveryCharge}
          </p>
          <Button
            onClick={() => navigate({ to: "/" })}
            className="mt-8"
            style={{
              background: "oklch(var(--gold))",
              color: "oklch(var(--charcoal-deep))",
            }}
          >
            Continue Shopping
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <button
        type="button"
        onClick={() => navigate({ to: "/" })}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Shopping
      </button>

      <h1
        className="text-3xl font-bold mb-6"
        style={{ fontFamily: '"Playfair Display", serif' }}
      >
        Place Your Order
      </h1>

      <div className="delivery-banner mb-8" role="alert">
        🚚 Delivery Charge: <strong>Dhaka ৳70</strong> |{" "}
        <strong>Outside Dhaka ৳130</strong>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="order-name">Full Name *</Label>
              <Input
                id="order-name"
                placeholder="Your full name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                data-ocid="order.name_input"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="order-mobile">Mobile Number *</Label>
              <Input
                id="order-mobile"
                placeholder="01XXXXXXXXX"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
                data-ocid="order.mobile_input"
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="order-district">District *</Label>
              <Select value={district} onValueChange={setDistrict} required>
                <SelectTrigger
                  id="order-district"
                  data-ocid="order.district_select"
                  className="mt-1"
                >
                  <SelectValue placeholder="Select district" />
                </SelectTrigger>
                <SelectContent>
                  {BANGLADESH_DISTRICTS.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="order-thana">Thana/Upazila *</Label>
              <Input
                id="order-thana"
                placeholder="e.g. Dhanmondi"
                value={thana}
                onChange={(e) => setThana(e.target.value)}
                required
                data-ocid="order.thana_input"
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="order-address">Full Address *</Label>
            <Textarea
              id="order-address"
              placeholder="House/Flat no., Road, Area..."
              value={fullAddress}
              onChange={(e) => setFullAddress(e.target.value)}
              required
              data-ocid="order.address_textarea"
              className="mt-1 resize-none"
              rows={3}
            />
          </div>

          {isError && (
            <div
              className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg"
              data-ocid="order.error_state"
            >
              <AlertTriangle className="h-4 w-4" />
              Failed to place order. Please try again.
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full font-bold text-base"
            disabled={isPending || !productId}
            data-ocid="order.submit_button"
            style={{
              background: "oklch(var(--gold))",
              color: "oklch(var(--charcoal-deep))",
            }}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Placing
                Order...
              </>
            ) : (
              "Confirm Order"
            )}
          </Button>
        </form>

        <aside className="lg:col-span-1">
          <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
            <h2
              className="text-xl font-bold mb-4"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Order Summary
            </h2>

            {product ? (
              <div className="space-y-3 text-sm">
                <div className="flex gap-3 items-start">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover border border-border"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">IMG</span>
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-semibold text-foreground leading-snug">
                      {product.name}
                    </p>
                    <p className="text-muted-foreground text-xs mt-1">
                      {product.subcategory}
                    </p>
                  </div>
                </div>

                <div className="border-t border-border pt-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price</span>
                    <span>৳{Number(product.offerPrice).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Quantity</span>
                    <span>{quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>৳{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery</span>
                    <span
                      className={
                        deliveryCharge === 0 ? "text-muted-foreground" : ""
                      }
                    >
                      {deliveryCharge === 0
                        ? "Select district"
                        : `৳${deliveryCharge}`}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between font-bold text-base border-t border-border pt-3">
                  <span>Grand Total</span>
                  <span style={{ color: "oklch(var(--gold))" }}>
                    {deliveryCharge > 0
                      ? `৳${grandTotal.toLocaleString()}`
                      : "—"}
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="h-16 bg-muted rounded-lg animate-pulse" />
                <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
              </div>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}
