import { useState } from "react";
import { FermorLogo } from "./FermorLogo";

interface FooterProps {
  onOpenWaitlist: () => void;
  onOpenLogin: () => void;
}

export function Footer({ onOpenWaitlist, onOpenLogin }: FooterProps) {
  const [notice, setNotice] = useState<string | null>(null);

  return (
    <footer className="w-full border-t border-white/10 bg-black text-neutral-400 py-16 px-8 md:px-28 relative">
      {notice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#111] border border-white/20 p-6 rounded-2xl max-w-md w-full shadow-2xl text-left">
            <h4 className="text-white font-semibold text-base mb-2">Legal Notice</h4>
            <p className="text-sm text-neutral-300 leading-relaxed mb-6">{notice}</p>
            <button
              onClick={() => setNotice(null)}
              className="px-4 py-2 bg-white text-black text-xs font-semibold rounded-lg hover:bg-neutral-200 cursor-pointer"
            >
              Understood
            </button>
          </div>
        </div>
      )}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        {/* Brand */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <FermorLogo size={28} />
            <span className="text-lg font-bold tracking-tight text-white">Fermor</span>
          </div>
          <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
            The intelligent wealth operating system for Indian retail investors, founders, and families.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-8 text-sm">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">Product</span>
            <a href="#calculator-section" className="hover:text-white transition-colors">FIRE in India Planner</a>
            <a href="#portfolio" className="hover:text-white transition-colors">Direct MF & CAS Sync</a>
            <a href="#forecast" className="hover:text-white transition-colors">SGB & Dividend Tracker</a>
            <a href="#portfolio" className="hover:text-white transition-colors">EPF & PPF Vault</a>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">Platform</span>
            <button onClick={onOpenLogin} className="text-left hover:text-white transition-colors cursor-pointer">
              Client Portal
            </button>
            <button onClick={onOpenWaitlist} className="text-left hover:text-white transition-colors cursor-pointer">
              Request India Invite
            </button>
            <a href="#security" className="hover:text-white transition-colors">Zero-Knowledge Vault</a>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">Legal</span>
            <button
              onClick={() => setNotice("Fermor complies with the Digital Personal Data Protection (DPDP) Act 2023. All portfolio and identity information is encrypted on-device with AES-256 GCM. We strictly never sell investor data.")}
              className="text-left hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setNotice("Fermor provides computational models and wealth forecasting tools. Information provided is for analytical purposes and does not constitute SEBI-registered investment advice.")}
              className="text-left hover:text-white transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span className="text-xs text-neutral-600">DPDP Act 2023 Compliant</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
        <div>© {new Date().getFullYear()} Fermor India Technologies Pvt. Ltd. All rights reserved.</div>
        <div className="flex items-center gap-6">
          <span>RBI Account Aggregator Protocol Ready</span>
          <span aria-hidden="true">·</span>
          <span>AES-256 GCM Client Encryption</span>
        </div>
      </div>
    </footer>
  );
}
