import { ShoppingBag } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer className="bg-charcoal text-gray-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <ShoppingBag
              className="h-6 w-6"
              style={{ color: "oklch(var(--gold))" }}
            />
            <span
              className="text-xl font-bold"
              style={{
                fontFamily: '"Playfair Display", serif',
                color: "oklch(var(--gold))",
              }}
            >
              Style Vibe
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <span>Men's Collection</span>
            <span>Women's Collection</span>
            <span>Cosmetics</span>
            <span>Customer Support</span>
          </div>
          <p className="text-xs text-gray-500">
            © {year}. Built with ❤️ using{" "}
            <a
              href={utmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-300"
            >
              caffeine.ai
            </a>
          </p>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-700 text-center text-xs text-gray-600">
          Free delivery available. Dhaka: ৳70 | Outside Dhaka: ৳130. Cash on
          delivery accepted.
        </div>
      </div>
    </footer>
  );
}
