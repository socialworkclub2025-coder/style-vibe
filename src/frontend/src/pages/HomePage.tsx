import { Link } from "@tanstack/react-router";
import { ArrowRight, RefreshCw, Shield, Star, Truck } from "lucide-react";
import { motion } from "motion/react";

const categories = [
  {
    title: "Men's Collection",
    subtitle: "Shirts, Pants, Panjabi & more",
    to: "/mens",
    ocid: "category.mens_card",
    linkOcid: "nav.mens_link",
    image: "/assets/generated/category-mens.dim_800x400.jpg",
    accent: "from-slate-900/80 to-slate-700/40",
  },
  {
    title: "Women's Collection",
    subtitle: "Sarees, Three-piece, Abayas & more",
    to: "/womens",
    ocid: "category.womens_card",
    linkOcid: "nav.womens_link",
    image: "/assets/generated/category-womens.dim_800x400.jpg",
    accent: "from-rose-900/80 to-rose-700/40",
  },
  {
    title: "Cosmetics",
    subtitle: "Skincare, Makeup & Beauty",
    to: "/cosmetics",
    ocid: "category.cosmetics_card",
    linkOcid: "nav.cosmetics_link",
    image: "/assets/generated/category-cosmetics.dim_800x400.jpg",
    accent: "from-pink-900/80 to-fuchsia-700/40",
  },
];

const features = [
  { icon: Truck, title: "Fast Delivery", desc: "Dhaka ৳70 | Outside ৳130" },
  { icon: Shield, title: "Secure Orders", desc: "100% authentic products" },
  { icon: Star, title: "Premium Quality", desc: "Curated fashion picks" },
  { icon: RefreshCw, title: "Easy Returns", desc: "Hassle-free exchange" },
];

export function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[520px] flex items-center">
        <img
          src="/assets/generated/hero-banner.dim_1600x600.jpg"
          alt="Style Vibe Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p
              className="text-sm font-semibold tracking-[0.3em] uppercase mb-3"
              style={{ color: "oklch(var(--gold))" }}
            >
              Bangladesh's Premier Fashion Store
            </p>
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Style Vibe
            </h1>
            <p className="text-lg text-gray-300 max-w-lg mb-8">
              Discover curated fashion for Men, Women & Kids. Premium quality at
              unbeatable prices.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/mens"
                data-ocid="nav.mens_link"
                className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-transform hover:scale-105"
                style={{
                  background: "oklch(var(--gold))",
                  color: "oklch(var(--charcoal-deep))",
                }}
              >
                Shop Men's <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/womens"
                data-ocid="nav.womens_link"
                className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm border border-white/40 text-white hover:bg-white/10 transition-colors"
              >
                Shop Women's <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature bar */}
      <section className="bg-charcoal py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="flex items-center gap-3 text-gray-300"
              >
                <f.icon
                  className="h-5 w-5 shrink-0"
                  style={{ color: "oklch(var(--gold))" }}
                />
                <div>
                  <p className="text-sm font-semibold text-white">{f.title}</p>
                  <p className="text-xs text-gray-400">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h2
            className="text-4xl font-bold text-foreground mb-2"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Shop by Category
          </h2>
          <p className="text-muted-foreground">
            Explore our curated collections
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link
                to={cat.to}
                data-ocid={cat.ocid}
                className="group relative block rounded-2xl overflow-hidden aspect-[4/3] shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${cat.accent} flex flex-col justify-end p-6`}
                >
                  <h3
                    className="text-2xl font-bold text-white mb-1"
                    style={{ fontFamily: '"Playfair Display", serif' }}
                  >
                    {cat.title}
                  </h3>
                  <p className="text-sm text-gray-200 mb-3">{cat.subtitle}</p>
                  <span
                    className="inline-flex items-center gap-1 text-sm font-semibold"
                    style={{ color: "oklch(var(--gold))" }}
                  >
                    Explore Collection <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="mx-6 mb-16 rounded-2xl overflow-hidden max-w-7xl mx-auto px-6">
        <div
          className="rounded-2xl p-10 text-center relative overflow-hidden"
          style={{ background: "oklch(var(--charcoal))" }}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, oklch(var(--gold)) 0, oklch(var(--gold)) 1px, transparent 0, transparent 50%)",
              backgroundSize: "20px 20px",
            }}
          />
          <div className="relative z-10">
            <p
              className="text-sm font-semibold tracking-widest uppercase mb-2"
              style={{ color: "oklch(var(--gold))" }}
            >
              Limited Time Offer
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-white mb-3"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Up to 40% Off on All Collections
            </h2>
            <p className="text-gray-400 mb-6">
              Exclusive deals on premium fashion. Order now and save big!
            </p>
            <Link
              to="/womens"
              data-ocid="nav.womens_link"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-sm transition-transform hover:scale-105"
              style={{
                background: "oklch(var(--gold))",
                color: "oklch(var(--charcoal-deep))",
              }}
            >
              Shop Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
