import { useState, useRef, useEffect } from "react";
import { ChevronDown, Menu, X, PieChart, TrendingUp, ShieldCheck, DollarSign, Calculator, Layers, HelpCircle } from "lucide-react";
import { FermorLogo } from "./FermorLogo";

interface NavbarProps {
  onOpenLogin: () => void;
  onOpenWaitlist: () => void;
}

export function Navbar({ onOpenLogin, onOpenWaitlist }: NavbarProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (name: string) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <header className="w-full z-40 relative">
      <nav
        ref={navRef}
        className="w-full flex items-center justify-between px-8 md:px-28 py-4 select-none"
      >
        {/* Left: Logo image + "Fermor" text + nav links */}
        <div className="flex items-center gap-12 md:gap-20">
          {/* Logo & Brand */}
          <a
            href="/"
            className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-foreground group"
          >
            <FermorLogo size={32} className="group-hover:border-white/30" />
            <span className="text-xl font-bold tracking-tight text-white">Fermor</span>
          </a>

          {/* Nav links (hidden on mobile, gap-1 between links) */}
          <div className="hidden md:flex items-center gap-1">
            {/* Products Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("products")}
                onMouseEnter={() => setActiveDropdown("products")}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-normal text-neutral-300 hover:text-white rounded-md transition-colors cursor-pointer"
              >
                <span>Products</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === "products" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeDropdown === "products" && (
                <div
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute top-full left-0 mt-1 w-72 p-2 bg-[#0d0d0d] border border-white/10 rounded-xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150"
                >
                  <a
                    href="#portfolio"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors group"
                  >
                    <div className="p-1.5 rounded-md bg-white/5 text-neutral-300 group-hover:text-white">
                      <PieChart className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">Direct MF & SIP Tracker</div>
                      <div className="text-xs text-neutral-400">CAMS & KFintech CAS auto-sync</div>
                    </div>
                  </a>
                  <a
                    href="#forecast"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors group"
                  >
                    <div className="p-1.5 rounded-md bg-white/5 text-neutral-300 group-hover:text-white">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">NSE/BSE Stocks & SGBs</div>
                      <div className="text-xs text-neutral-400">Equities & Sovereign Gold Bonds</div>
                    </div>
                  </a>
                  <a
                    href="#security"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors group"
                  >
                    <div className="p-1.5 rounded-md bg-white/5 text-neutral-300 group-hover:text-white">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">EPF, PPF & NPS Vault</div>
                      <div className="text-xs text-neutral-400">Provident funds & pension tracker</div>
                    </div>
                  </a>
                </div>
              )}
            </div>

            {/* Calculators Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("calculators")}
                onMouseEnter={() => setActiveDropdown("calculators")}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-normal text-neutral-300 hover:text-white rounded-md transition-colors cursor-pointer"
              >
                <span>Calculators</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === "calculators" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeDropdown === "calculators" && (
                <div
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute top-full left-0 mt-1 w-72 p-2 bg-[#0d0d0d] border border-white/10 rounded-xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150"
                >
                  <a
                    href="#calculator-section"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors group"
                  >
                    <div className="p-1.5 rounded-md bg-white/5 text-neutral-300 group-hover:text-white">
                      <Calculator className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">FIRE in India Planner</div>
                      <div className="text-xs text-neutral-400">Indian inflation & corpus modeling</div>
                    </div>
                  </a>
                  <a
                    href="#calculator-section"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors group"
                  >
                    <div className="p-1.5 rounded-md bg-white/5 text-neutral-300 group-hover:text-white">
                      <DollarSign className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">Step-Up SIP Calculator</div>
                      <div className="text-xs text-neutral-400">Annual increment wealth multiplier</div>
                    </div>
                  </a>
                  <a
                    href="#calculator-section"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors group"
                  >
                    <div className="p-1.5 rounded-md bg-white/5 text-neutral-300 group-hover:text-white">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">LTCG / STCG Tax Estimator</div>
                      <div className="text-xs text-neutral-400">Sec 112A capital gains analysis</div>
                    </div>
                  </a>
                </div>
              )}
            </div>

            {/* Blogs */}
            <a
              href="#blogs"
              className="px-3 py-1.5 text-sm font-normal text-neutral-300 hover:text-white rounded-md transition-colors"
            >
              Blogs
            </a>

            {/* Contact us */}
            <button
              onClick={onOpenWaitlist}
              className="px-3 py-1.5 text-sm font-normal text-neutral-300 hover:text-white rounded-md transition-colors cursor-pointer"
            >
              Contact us
            </button>
          </div>
        </div>

        {/* Right: "Login" button + mobile hamburger toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenLogin}
            className="bg-foreground text-background rounded-lg px-4 py-2 text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
          >
            Login
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-300 hover:text-white rounded-lg bg-white/5 border border-white/10"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-8 py-4 bg-black/95 border-b border-white/10 backdrop-blur-lg flex flex-col gap-3">
          <a
            href="#portfolio"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm text-neutral-300 hover:text-white py-1.5"
          >
            Products
          </a>
          <a
            href="#calculator-section"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm text-neutral-300 hover:text-white py-1.5"
          >
            Calculators
          </a>
          <a
            href="#blogs"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm text-neutral-300 hover:text-white py-1.5"
          >
            Blogs
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenWaitlist();
            }}
            className="text-left text-sm text-neutral-300 hover:text-white py-1.5 cursor-pointer"
          >
            Contact us
          </button>
        </div>
      )}
    </header>
  );
}
