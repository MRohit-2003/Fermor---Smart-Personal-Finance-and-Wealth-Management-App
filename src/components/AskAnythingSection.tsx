import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  ArrowUp,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  Smartphone,
  MessageSquare,
  Play,
  Pause,
} from "lucide-react";
import { formatINR } from "../lib/currency";

interface Scenario {
  question: string;
  category: string;
  status: string;
  statusColor: string;
  summary: string;
  metrics: { label: string; value: string; hint?: string }[];
  bulletPoints: string[];
  disclaimer: string;
}

const SCENARIOS: Scenario[] = [
  {
    question: "Can I safely retire at 46 with a ₹2.2 Cr corpus?",
    category: "FIRE in India",
    status: "Feasible · 4% SWP",
    statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    summary:
      "Yes. At a 4% Safe Withdrawal Rate adjusted for 6.5% Indian inflation, your ₹2.2 Cr corpus generates ₹73,300/month post-tax passive income until age 85+.",
    metrics: [
      { label: "Target Corpus", value: "₹2.20 Cr", hint: "Equities + SGB + Debt" },
      { label: "Safe Monthly SWP", value: "₹73,300 / mo", hint: "Post-tax estimation" },
      { label: "Longevity Buffer", value: "39+ Years", hint: "With 11% blended CAGR" },
    ],
    bulletPoints: [
      "Keep 3 years of expenses (₹25 Lakhs) in liquid/arbitrage funds to survive equity drawdowns.",
      "Harvest ₹1.25 Lakhs LTCG tax-free exemption every fiscal year under Section 112A.",
      "Sovereign Gold Bonds maturity proceeds (₹28 Lakhs in 2031) will be 100% tax-free.",
    ],
    disclaimer: "Calculations based on 60:30:10 Equity:Debt:Gold asset allocation and historical Nifty 50 parameters.",
  },
  {
    question: "How much LTCG tax will I save if I harvest before March 31?",
    category: "Section 112A Optimizer",
    status: "₹15,625 Tax Saved",
    statusColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    summary:
      "You have ₹1,12,000 in unrealized long-term capital gains in Mirae Asset Large Cap & Parag Parikh Flexicap. Harvesting now resets your cost basis within the ₹1.25 Lakh exemption limit.",
    metrics: [
      { label: "Current Unrealized LTCG", value: "₹1,12,000", hint: "Held > 12 months" },
      { label: "Tax Exemption Left", value: "₹13,000", hint: "Out of ₹1.25 Lakh limit" },
      { label: "Immediate Tax Saved", value: "₹14,000", hint: "At 12.5% LTCG rate" },
    ],
    bulletPoints: [
      "Sell units worth ₹1.12 Lakh gains and re-enter next trading session to bump acquisition price.",
      "Zero tax payable since total capital gains remain below ₹1,25,000 threshold.",
      "Avoids 12.5% taxation when you eventually liquidate during retirement.",
    ],
    disclaimer: "Tax guidelines reflect Finance Act provisions. Verify with your Chartered Accountant.",
  },
  {
    question: "Should I rebalance my Nifty 50 vs Sovereign Gold Bond allocation?",
    category: "Portfolio Rebalancing",
    status: "Rebalance Advised",
    statusColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    summary:
      "Due to gold's 24% rally this year, your SGB allocation has drifted to 15.4% against your 10% target. Diverting your next 3 months of SIP (₹1.05 Lakh) to Nifty 50 index funds restores target weights.",
    metrics: [
      { label: "Current SGB Weight", value: "15.4%", hint: "Target was 10.0%" },
      { label: "Equities Weight", value: "59.2%", hint: "Target was 65.0%" },
      { label: "Recommended Route", value: "SIP Redirect", hint: "Avoid selling SGB early" },
    ],
    bulletPoints: [
      "Do not sell SGBs on secondary market (avoids losing 2.5% coupon and maturity tax exemption).",
      "Route next ₹35,000/mo SIP contributions exclusively to Nifty 50 & Midcap 150 funds.",
      "Expected to realign portfolio to 65:25:10 within 90 days without incurring tax drag.",
    ],
    disclaimer: "Rebalancing ensures consistent risk-adjusted Sharpe ratio without market timing.",
  },
];

export function AskAnythingSection() {
  const [activeSlide, setActiveSlide] = useState<"chat" | "video">("chat");
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [mode, setMode] = useState<"typing" | "waiting" | "thinking" | "answer">("typing");
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentScenario = SCENARIOS[scenarioIndex];

  // Typing animation effect
  useEffect(() => {
    if (mode !== "typing") return;
    if (typedText.length >= currentScenario.question.length) {
      const waitTimer = setTimeout(() => {
        setMode("thinking");
      }, 700);
      return () => clearTimeout(waitTimer);
    }

    const typeTimer = setTimeout(() => {
      setTypedText(currentScenario.question.slice(0, typedText.length + 1));
    }, 38);

    return () => clearTimeout(typeTimer);
  }, [mode, typedText, currentScenario.question]);

  // Thinking transition to answer
  useEffect(() => {
    if (mode !== "thinking") return;
    const thinkTimer = setTimeout(() => {
      setMode("answer");
    }, 900);
    return () => clearTimeout(thinkTimer);
  }, [mode]);

  const handleSelectScenario = (index: number) => {
    setScenarioIndex(index);
    setTypedText("");
    setMode("typing");
  };

  const toggleVideoPlayback = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="py-24 md:py-32 px-6 sm:px-8 md:px-28 bg-black text-white relative border-t border-white/10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Sparkles className="w-6 h-6 text-white" />
          </div>

          <h2 className="text-4xl md:text-6xl font-serif italic font-normal tracking-tight text-white mb-4">
            Ask anything
          </h2>

          <p className="text-neutral-400 text-base md:text-lg leading-relaxed">
            Get clear, personalized answers about your wealth, grounded in your Indian financial data in seconds.
          </p>

          {/* Slide Switcher: Interactive Chat Interface vs Video Slide */}
          <div className="inline-flex items-center p-1 bg-white/5 border border-white/10 rounded-xl mt-8">
            <button
              onClick={() => setActiveSlide("chat")}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeSlide === "chat"
                  ? "bg-white text-black shadow-md"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Interactive Chat Intelligence</span>
            </button>
            <button
              onClick={() => setActiveSlide("video")}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeSlide === "video"
                  ? "bg-white text-black shadow-md"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile Interface Video Slide</span>
            </button>
          </div>
        </div>

        {/* Slide 1: Interactive Chat Intelligence */}
        {activeSlide === "chat" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Prompt Selector Chips (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                Frequently Asked by Indian Investors
              </span>

              {SCENARIOS.map((scenario, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectScenario(idx)}
                  className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                    scenarioIndex === idx
                      ? "bg-white/10 border-white/30 text-white shadow-lg"
                      : "bg-white/[0.02] border-white/10 text-neutral-400 hover:text-white hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                    <span className="text-neutral-400">{scenario.category}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${scenario.statusColor}`}>
                      {scenario.status}
                    </span>
                  </div>
                  <div className="text-sm font-medium line-clamp-2 text-white">
                    "{scenario.question}"
                  </div>
                </button>
              ))}

              <div className="mt-4 p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-xs text-neutral-500 leading-relaxed">
                💡 <strong className="text-neutral-300">Grounded in your actual numbers:</strong> Connects directly with CAMS CAS, EPF passbook, and Zerodha holdings to compute zero-hallucination math.
              </div>
            </div>

            {/* Right Chat Stage (8 cols) */}
            <div className="lg:col-span-8 flex flex-col bg-[#0a0a0a] border border-white/15 rounded-3xl p-6 md:p-8 shadow-2xl relative">
              {/* Question Input Pill */}
              <div className="flex items-center justify-between gap-3 px-5 py-4 rounded-full bg-white text-black shadow-lg mb-6">
                <div className="flex-1 text-sm md:text-base font-medium font-sans truncate">
                  <span>{typedText}</span>
                  {mode === "typing" && (
                    <span className="inline-block w-0.5 h-4 bg-black ml-0.5 animate-pulse" />
                  )}
                </div>
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                  <ArrowUp className="w-4 h-4" />
                </div>
              </div>

              {/* Status / Thinking State */}
              {mode === "thinking" && (
                <div className="flex items-center gap-3 py-10 px-4 justify-center text-neutral-400">
                  <div className="w-5 h-5 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                  <span className="text-sm font-mono">Analyzing Nifty 50 allocations & tax brackets...</span>
                </div>
              )}

              {/* Answer Card */}
              {mode === "answer" && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-6"
                >
                  {/* Category & Status header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono">
                        {currentScenario.category}
                      </span>
                      <span aria-hidden="true" className="text-neutral-600">·</span>
                      <span className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verified Math
                      </span>
                    </div>

                    <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${currentScenario.statusColor}`}>
                      {currentScenario.status}
                    </span>
                  </div>

                  {/* Answer Summary */}
                  <p className="text-base md:text-lg text-white leading-relaxed font-normal">
                    {currentScenario.summary}
                  </p>

                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {currentScenario.metrics.map((metric, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col justify-between"
                      >
                        <span className="text-xs text-neutral-400 mb-1">{metric.label}</span>
                        <span className="text-xl md:text-2xl font-semibold font-mono text-white tabular-nums">
                          {metric.value}
                        </span>
                        {metric.hint && (
                          <span className="text-[11px] text-neutral-500 font-mono mt-1">
                            {metric.hint}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Bullet Points */}
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2.5">
                    <span className="text-xs font-semibold text-neutral-300 block mb-2">
                      Recommended Action Steps:
                    </span>
                    {currentScenario.bulletPoints.map((point, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-neutral-400 leading-relaxed">
                        <span className="text-emerald-400 mt-0.5">▸</span>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer Disclaimer */}
                  <div className="pt-2 text-[11px] text-neutral-500 font-mono border-t border-white/5 flex items-center justify-between">
                    <span>{currentScenario.disclaimer}</span>
                    <button
                      onClick={() => {
                        const next = (scenarioIndex + 1) % SCENARIOS.length;
                        handleSelectScenario(next);
                      }}
                      className="text-neutral-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Next question</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* Slide 2: Mobile Interface Video Slide (fermor.in phone hero video) */}
        {activeSlide === "video" && (
          <div className="bg-[#0a0a0a] border border-white/15 rounded-3xl p-6 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Text Description (5 cols) */}
              <div className="lg:col-span-5 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-medium text-neutral-300">
                  <Smartphone className="w-3.5 h-3.5 text-white" />
                  <span>Fermor Mobile App</span>
                </div>

                <h3 className="text-3xl md:text-4xl font-serif italic font-normal text-white leading-tight">
                  Your finances in your pocket. Anywhere in India.
                </h3>

                <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
                  Real-time portfolio sync on iOS & Android. Receive notifications when your SIPs execute, when Sovereign Gold Bond interest hits your bank, or when rebalancing thresholds trigger.
                </p>

                <div className="space-y-3 pt-2">
                  {[
                    "Biometric Face ID / Fingerprint Vault Authentication",
                    "Offline-first encrypted ledger storage on device",
                    "Instant WhatsApp & SMS transaction statement parsing",
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex items-center gap-4">
                  <button
                    onClick={toggleVideoPlayback}
                    className="px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-white flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isPlaying ? "Pause Preview" : "Play Preview"}</span>
                  </button>

                  <span className="text-xs text-neutral-500 font-mono">
                    HD · 60fps Mobile UI Walkthrough
                  </span>
                </div>
              </div>

              {/* Video Player in Phone Container (7 cols) */}
              <div className="lg:col-span-7 flex justify-center items-center">
                <div className="relative w-full max-w-sm rounded-[36px] p-2 bg-gradient-to-b from-neutral-700 via-neutral-900 to-black border-2 border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden">
                  {/* Phone Speaker Notch */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-20 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-neutral-800 mr-2" />
                    <div className="w-2 h-2 rounded-full bg-neutral-900" />
                  </div>

                  {/* Video Screen */}
                  <div className="relative rounded-[28px] overflow-hidden bg-black aspect-[9/18] w-full flex items-center justify-center">
                    <video
                      ref={videoRef}
                      autoPlay
                      loop
                      muted
                      playsInline
                      src="https://fermor.in/videos/fermor-phone-hero.mp4"
                      className="w-full h-full object-cover"
                    />

                    {/* Subtle phone screen reflections */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
