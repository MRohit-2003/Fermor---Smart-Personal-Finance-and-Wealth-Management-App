import { useState, useMemo } from "react";
import { motion } from "motion/react";
import {
  TrendingUp,
  PieChart,
  Shield,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { formatINR, formatINRFull } from "../lib/currency";

interface CalculatorSectionProps {
  onOpenWaitlist: () => void;
}

export function CalculatorSection({ onOpenWaitlist }: CalculatorSectionProps) {
  const [activeTab, setActiveTab] = useState<"fire" | "dividends" | "allocation">("fire");

  // Indian Wealth / FIRE Calculator state
  // Default: ₹10 Lakhs starting corpus, ₹35,000 monthly SIP, 12.5% CAGR, 15 Years
  const [initialCapital, setInitialCapital] = useState(1000000);
  const [monthlyContribution, setMonthlyContribution] = useState(35000);
  const [annualReturn, setAnnualReturn] = useState(12.5);
  const [years, setYears] = useState(15);

  // Calculate projections in INR
  const projection = useMemo(() => {
    const r = annualReturn / 100 / 12;
    const n = years * 12;
    // Compound interest formula with monthly additions
    const futureValue =
      initialCapital * Math.pow(1 + r, n) +
      monthlyContribution * ((Math.pow(1 + r, n) - 1) / r);

    const totalInvested = initialCapital + monthlyContribution * n;
    const totalInterest = Math.max(0, futureValue - totalInvested);
    const monthlyPassiveIncome = (futureValue * 0.04) / 12; // 4% safe withdrawal rule

    return {
      futureValue: Math.round(futureValue),
      totalInvested: Math.round(totalInvested),
      totalInterest: Math.round(totalInterest),
      monthlyPassiveIncome: Math.round(monthlyPassiveIncome),
    };
  }, [initialCapital, monthlyContribution, annualReturn, years]);

  // Generate chart data points
  const chartPoints = useMemo(() => {
    const steps = 6;
    const points: { year: number; value: number }[] = [];
    const r = annualReturn / 100 / 12;

    for (let i = 0; i <= steps; i++) {
      const currentYear = Math.round((years / steps) * i);
      const n = currentYear * 12;
      const val =
        n === 0
          ? initialCapital
          : initialCapital * Math.pow(1 + r, n) +
            monthlyContribution * ((Math.pow(1 + r, n) - 1) / r);
      points.push({ year: currentYear, value: Math.round(val) });
    }
    return points;
  }, [initialCapital, monthlyContribution, annualReturn, years]);

  const maxVal = chartPoints[chartPoints.length - 1]?.value || 1;

  return (
    <section id="calculator-section" className="py-24 md:py-32 px-8 md:px-28 bg-black text-white relative border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
              <span>Bharat Wealth Intelligence</span>
              <span aria-hidden="true">·</span>
              <span>Lakhs & Crores Modeling</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-4">
              Forecast your financial independence with mathematical clarity.
            </h2>
            <p className="text-neutral-400 text-base leading-relaxed">
              Fermor unifies Indian mutual funds, SIPs, NSE equities, Sovereign Gold Bonds, and EPF. Simulate inflation-adjusted wealth growth and safe monthly cash-flows for you and your family.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center p-1 bg-white/5 border border-white/10 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setActiveTab("fire")}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                activeTab === "fire"
                  ? "bg-white text-black shadow-md"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              SIP & FIRE India
            </button>
            <button
              onClick={() => setActiveTab("dividends")}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                activeTab === "dividends"
                  ? "bg-white text-black shadow-md"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              SGB & Cash Flows
            </button>
            <button
              onClick={() => setActiveTab("allocation")}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                activeTab === "allocation"
                  ? "bg-white text-black shadow-md"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Equity · Gold · Debt
            </button>
          </div>
        </div>

        {/* Tab 1: SIP & FIRE India Calculator */}
        {activeTab === "fire" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#0a0a0a] border border-white/15 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
            {/* Left Controls (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-neutral-400">Current Capital / Savings</span>
                    <span className="font-semibold text-white font-mono tabular-nums">
                      {formatINRFull(initialCapital)} ({formatINR(initialCapital)})
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50000"
                    max="10000000"
                    step="50000"
                    value={initialCapital}
                    onChange={(e) => setInitialCapital(Number(e.target.value))}
                    className="w-full accent-white h-1.5 bg-white/10 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-neutral-500 mt-1">
                    <span>₹50,000</span>
                    <span>₹1.00 Cr</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-neutral-400">Monthly SIP Contribution</span>
                    <span className="font-semibold text-white font-mono tabular-nums">
                      {formatINRFull(monthlyContribution)} / month
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2500"
                    max="300000"
                    step="2500"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                    className="w-full accent-white h-1.5 bg-white/10 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-neutral-500 mt-1">
                    <span>₹2,500/mo</span>
                    <span>₹3.0 Lakh/mo</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-neutral-400">Expected CAGR (Equities / Nifty 50)</span>
                    <span className="font-semibold text-white font-mono tabular-nums">
                      {annualReturn}% p.a.
                    </span>
                  </div>
                  <input
                    type="range"
                    min="7.0"
                    max="16.0"
                    step="0.5"
                    value={annualReturn}
                    onChange={(e) => setAnnualReturn(Number(e.target.value))}
                    className="w-full accent-white h-1.5 bg-white/10 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-neutral-500 mt-1">
                    <span>7% (Conservative Debt)</span>
                    <span>16% (Mid/Small Cap)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-neutral-400">Time Horizon</span>
                    <span className="font-semibold text-white font-mono tabular-nums">
                      {years} Years
                    </span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="35"
                    step="1"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full accent-white h-1.5 bg-white/10 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-neutral-500 mt-1">
                    <span>3 Yrs</span>
                    <span>35 Yrs (Generational)</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="text-xs text-neutral-400">
                  Historical Nifty 50 15-Yr TRI: ~13.2% CAGR
                </div>
                <button
                  onClick={() => {
                    setInitialCapital(1500000);
                    setMonthlyContribution(60000);
                    setAnnualReturn(13.0);
                    setYears(20);
                  }}
                  className="text-xs text-neutral-300 hover:text-white underline underline-offset-4 cursor-pointer"
                >
                  Aggressive Tech SIP Scenario
                </button>
              </div>
            </div>

            {/* Right Results & Visual Curve (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between bg-black/60 rounded-2xl p-6 md:p-8 border border-white/10">
              {/* Stat badges */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-xs text-neutral-400 mb-1">Projected Total Wealth</div>
                  <div className="text-2xl md:text-3xl font-semibold text-white font-mono tabular-nums tracking-tight">
                    {formatINR(projection.futureValue)}
                  </div>
                  <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                    {formatINRFull(projection.futureValue)}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-xs text-neutral-400 mb-1">Compound Wealth Created</div>
                  <div className="text-2xl md:text-3xl font-semibold text-emerald-400 font-mono tabular-nums tracking-tight">
                    +{formatINR(projection.totalInterest)}
                  </div>
                  <div className="text-[11px] text-emerald-500/80 font-mono mt-0.5">
                    Pure Compounding Gain
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 col-span-2 md:col-span-1">
                  <div className="text-xs text-neutral-400 mb-1">Safe Monthly FIRE Payout</div>
                  <div className="text-2xl md:text-3xl font-semibold text-white font-mono tabular-nums tracking-tight">
                    {formatINR(projection.monthlyPassiveIncome)}/mo
                  </div>
                  <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                    SWP / 4% Rule in India
                  </div>
                </div>
              </div>

              {/* Dynamic Visual Trajectory Graph */}
              <div className="relative h-44 w-full flex items-end gap-3 pt-6 pb-2 border-b border-white/10">
                {chartPoints.map((pt, idx) => {
                  const heightPercent = Math.max(12, Math.round((pt.value / maxVal) * 100));
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                      <div className="text-[10px] text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity mb-1 font-mono tabular-nums whitespace-nowrap">
                        {formatINR(pt.value)}
                      </div>
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className="w-full bg-gradient-to-t from-neutral-800 to-white/90 rounded-t-md transition-all duration-300 group-hover:to-white group-hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                      />
                      <span className="text-[11px] text-neutral-500 mt-2 font-mono">
                        Yr {pt.year}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Action Banner */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="text-xs text-neutral-400">
                  Ready to link your Zerodha, Groww, or CAMS CAS to track this live?
                </div>
                <button
                  onClick={onOpenWaitlist}
                  className="px-5 py-2.5 bg-white text-black text-xs font-semibold rounded-lg hover:bg-neutral-200 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <span>Connect Indian Portfolio</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: SGB & Cash Flow Engine */}
        {activeTab === "dividends" && (
          <div className="bg-[#0a0a0a] border border-white/15 rounded-3xl p-6 md:p-10 shadow-2xl">
            <div className="max-w-2xl mb-8">
              <h3 className="text-2xl font-medium text-white mb-2">Sovereign Gold Bonds & Dividend Cash Flow Vault</h3>
              <p className="text-sm text-neutral-400">
                Gold has safeguarded Indian family wealth for generations. Fermor automatically tracks SGB interest payout cycles (2.5% p.a. paid semi-annually), REIT rentals, and bluechip dividend credits.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "RBI Sovereign Gold Bonds (SGB)", yield: "2.50% + Gold NAV", payout: "Semi-Annually", projected: "₹38,500 / payout · 100% Tax-Free Capital Gain on maturity" },
                { name: "ITC & TCS High Dividend Equities", yield: "3.75% Dividend Yield", payout: "Quarterly", projected: "₹42,000 / quarter credited directly to bank account" },
                { name: "Embassy Office Parks REIT", yield: "7.10% Distribution Yield", payout: "Quarterly", projected: "₹28,400 / quarter with tax-favorable NDCF components" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 5.2 + i * 0.6,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    delay: i * 0.4,
                  }}
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/25 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-sm font-semibold text-white">{item.name}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-xs font-mono">
                        {item.yield}
                      </span>
                    </div>
                    <div className="text-xs text-neutral-400 mb-1">Frequency: {item.payout}</div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/5 text-xs font-mono text-neutral-300 leading-relaxed">
                    {item.projected}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Indian Asset Allocation (Equity / Debt / Gold) */}
        {activeTab === "allocation" && (
          <div className="bg-[#0a0a0a] border border-white/15 rounded-3xl p-6 md:p-10 shadow-2xl">
            <div className="max-w-2xl mb-8">
              <h3 className="text-2xl font-medium text-white mb-2">The Balanced Indian Family Portfolio</h3>
              <p className="text-sm text-neutral-400">
                Optimize your equity-to-gold-to-debt ratio without emotional bias. Rebalance systematically while accounting for Section 112A capital gains tax implications.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { asset: "Nifty 50 & Flexicap Direct MFs", target: "60%", current: "64.5%", action: "Trim +4.5% to Rebalance" },
                { asset: "EPF, PPF & Voluntary Provident", target: "20%", current: "16.8%", action: "Deposit +3.2% via VPF" },
                { asset: "Sovereign Gold Bonds & 24K Gold", target: "10%", current: "9.5%", action: "On Target (Safe Haven)" },
                { asset: "Emergency Fund / Liquid MFs", target: "10%", current: "9.2%", action: "Maintain 6-Month Buffer" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 5 + i * 0.5,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/25 transition-colors"
                >
                  <div className="text-sm font-medium text-white mb-1">{item.asset}</div>
                  <div className="text-xs text-neutral-400 mb-4">Target: {item.target}</div>
                  <div className="text-xl font-semibold font-mono text-white mb-2">{item.current}</div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                    item.action.startsWith("Trim")
                      ? "bg-amber-500/10 text-amber-400"
                      : item.action.startsWith("Deposit")
                      ? "bg-blue-500/10 text-blue-400"
                      : "bg-emerald-500/10 text-emerald-400"
                  }`}>
                    {item.action}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* 3 Bento Feature Highlights tailored to the Indian Market */}
        <div id="portfolio" className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {/* Feature Card 1: Account Aggregator & CAS Sync */}
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: 0,
            }}
            whileHover={{ y: -12, transition: { duration: 0.25 } }}
            className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/25 hover:bg-white/[0.04] transition-colors flex flex-col justify-between group shadow-xl"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-5 group-hover:scale-105 group-hover:border-white/20 transition-all">
                <PieChart className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Automated CAS & Account Aggregator</h4>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Connect your Zerodha, Groww, Angel One, and Upstox demat accounts alongside CAMS & KFintech CAS statements in seconds via the RBI Sahamati Account Aggregator protocol.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-xs text-neutral-500 font-mono">
              Auto-fetch across 42+ Indian AMCs and NSDL/CDSL
            </div>
          </motion.div>

          {/* Feature Card 2: Section 112A Tax-Loss Harvesting */}
          <motion.div
            id="forecast"
            animate={{ y: [0, -9, 0] }}
            transition={{
              duration: 6.2,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: 0.8,
            }}
            whileHover={{ y: -12, transition: { duration: 0.25 } }}
            className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/25 hover:bg-white/[0.04] transition-colors flex flex-col justify-between group shadow-xl"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-5 group-hover:scale-105 group-hover:border-white/20 transition-all">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Section 112A & Capital Gains Engine</h4>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Stay on top of the annual ₹1.25 Lakh LTCG tax-free threshold and 12.5% long-term / 20% short-term rates. Get smart tax-harvesting notifications before March 31st each fiscal year.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-xs text-neutral-500 font-mono">
              Aligned with Union Budget 2024–2025 direct tax guidelines
            </div>
          </motion.div>

          {/* Feature Card 3: DPDP Act Zero-Knowledge Vault */}
          <motion.div
            id="security"
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 5.8,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: 1.5,
            }}
            whileHover={{ y: -12, transition: { duration: 0.25 } }}
            className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/25 hover:bg-white/[0.04] transition-colors flex flex-col justify-between group shadow-xl"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-5 group-hover:scale-105 group-hover:border-white/20 transition-all">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">DPDP-Grade Zero-Knowledge Privacy</h4>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Your PAN, Demat IDs, and net worth balances are encrypted on your local device with AES-256 GCM. We never sell investor telemetry or share records with third parties.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-xs text-neutral-500 font-mono">
              DPDP Act 2023 compliant · Biometric Passkey support
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
