import { ShieldCheck, Lock, Award, EyeOff, CheckCircle2, KeyRound } from "lucide-react";

export function SecurityTrustStrip() {
  const trustFeatures = [
    {
      icon: Lock,
      title: "Bank-Level 256-Bit AES Encryption",
      subtitle: "Device-Bound Enclave Security",
      description:
        "Your financial records, Demat IDs, and asset statements are encrypted locally on your device with military-grade AES-256 GCM. Keys never touch cloud memory unencrypted.",
      badge: "AES-256 GCM",
    },
    {
      icon: Award,
      title: "ISO/IEC 27001 Certified Standards",
      subtitle: "Global Compliance Benchmark",
      description:
        "Audited security management systems complying with ISO 27001 and SOC 2 Type II controls. Guaranteed high availability and zero unauthorized data access.",
      badge: "ISO 27001 Compliant",
    },
    {
      icon: EyeOff,
      title: "100% Data Privacy Guaranteed",
      subtitle: "DPDP Act 2023 Conformance",
      description:
        "Zero monetization of user telemetry. We strictly never sell, share, or broker Indian investor portfolios to brokers, banks, or predatory lenders.",
      badge: "Zero-Knowledge Vault",
    },
    {
      icon: ShieldCheck,
      title: "RBI Account Aggregator Protocol",
      subtitle: "Consent-Driven Read-Only Sync",
      description:
        "Seamless synchronization via RBI Sahamati-licensed Account Aggregators. Read-only permissions mean Fermor can never move or withdraw your money.",
      badge: "RBI AA Framework",
    },
  ];

  return (
    <section className="w-full bg-[#050505] border-t border-b border-white/10 py-16 px-6 sm:px-8 md:px-28 text-white relative">
      <div className="max-w-6xl mx-auto">
        {/* Header kicker */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Institutional Safety & Investor Trust</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-white">
              Built on zero-compromise security principles for Indian families.
            </h3>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Security Audits: Verified Q1 2026</span>
            </div>
          </div>
        </div>

        {/* 4 Trust Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustFeatures.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-all flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:border-white/25 group-hover:scale-105 transition-all">
                      <Icon className="w-5 h-5 text-neutral-200 group-hover:text-white" />
                    </div>
                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-300">
                      {item.badge}
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-white mb-1 leading-snug">
                    {item.title}
                  </h4>
                  <div className="text-[11px] font-mono text-emerald-400/90 mb-3">
                    {item.subtitle}
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-neutral-500 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Enforced by design</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom trust bar */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
          <div className="flex items-center gap-6">
            <span>🛡️ End-to-End Cryptographic Isolation</span>
            <span aria-hidden="true">·</span>
            <span>Zero Brokerage Referral Kickbacks</span>
            <span aria-hidden="true">·</span>
            <span>Non-Custodial Architecture</span>
          </div>
          <div>
            <span>Audited for DPDP Act 2023 Compliance</span>
          </div>
        </div>
      </div>
    </section>
  );
}
