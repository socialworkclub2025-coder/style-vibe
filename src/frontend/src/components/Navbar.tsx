import { Link, useLocation } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: "/", label: "Home", ocid: "nav.home_link" },
    { to: "/mens", label: "Men's", ocid: "nav.mens_link" },
    { to: "/womens", label: "Women's", ocid: "nav.womens_link" },
    { to: "/cosmetics", label: "Cosmetics", ocid: "nav.cosmetics_link" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-charcoal shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center gap-2"
            data-ocid="nav.home_link"
          >
            <ShoppingBag
              className="h-7 w-7"
              style={{ color: "oklch(var(--gold))" }}
            />
            <span
              className="text-2xl font-bold tracking-wide"
              style={{
                fontFamily: '"Playfair Display", serif',
                color: "oklch(var(--gold))",
              }}
            >
              Style Vibe
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid={link.ocid}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === link.to ? "" : "text-gray-300"
                }`}
                style={
                  location.pathname === link.to
                    ? { color: "oklch(var(--gold))" }
                    : {}
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid={link.ocid}
                className="text-gray-300 hover:text-white font-medium py-1"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
