import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Navbar } from "./Navbar";
import heroDashboardImg from "../assets/hero-dashboard.png";
import { FermorLogo } from "./FermorLogo";

interface HeroProps {
  onOpenWaitlist: () => void;
  onOpenLogin: () => void;
}

export function Hero({ onOpenWaitlist, onOpenLogin }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax Scroll Effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Hero text content group: y: [0, -200] and opacity: [1, 0] (fades over first 50% of scroll)
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Dashboard image: y: [0, -250]
  const dashboardY = useTransform(scrollYProgress, [0, 1], [0, -250]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden bg-black flex flex-col justify-between"
    >
      {/* Navbar — horizontal, padded px-8 md:px-28 py-4 */}
      <Navbar onOpenLogin={onOpenLogin} onOpenWaitlist={onOpenWaitlist} />

      {/* Hero Content — centered column, mt-16 md:mt-20 px-4 */}
      <motion.div
        style={{ y: heroTextY, opacity: heroTextOpacity }}
        className="flex flex-col items-center text-center mt-14 md:mt-18 lg:mt-20 px-4 z-20 relative max-w-4xl mx-auto"
      >
        {/* Tag pill: A "liquid glass" styled pill (liquid-glass class) with inner "New" badge + "Join the Waiting List" */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0 }}
          onClick={onOpenWaitlist}
          className="liquid-glass inline-flex items-center gap-2.5 px-3 py-2 rounded-lg mb-6 cursor-pointer hover:opacity-90 transition-opacity"
        >
          <span className="bg-white text-black rounded-md text-sm font-medium px-2 py-0.5 shadow-sm">
            New
          </span>
          <span className="text-sm font-medium text-muted-foreground">
            Join the Waiting List · India Early Access
          </span>
        </motion.button>

        {/* Title: text-5xl md:text-7xl, tracking-[-2px], font-medium, leading-tight md:leading-[1.15] mb-3 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl tracking-[-2px] font-medium leading-tight md:leading-[1.15] mb-3 text-center text-white"
        >
          <span>Your Finances.</span>
          <br />
          <span>One Clear </span>
          <span className="font-serif italic font-normal">Overview</span>
          <span>.</span>
        </motion.h1>

        {/* Subtitle: text-lg font-normal leading-6 opacity-90 mb-8, color uses CSS variable --hero-subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ color: "var(--hero-subtitle)" }}
          className="text-lg font-normal leading-6 opacity-90 mb-8 text-center max-w-xl"
        >
          Fermor helps you track investments, spending,
          <br />
          and life goals with precision.
        </motion.p>

        {/* CTA Button: "Get Started" — solid white (bg-foreground text-background), rounded-full px-8 py-3.5 text-base font-medium */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={onOpenWaitlist}
          className="bg-foreground text-background rounded-full px-8 py-3.5 text-base font-medium cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:shadow-[0_0_35px_rgba(255,255,255,0.4)] transition-all"
        >
          Get Started
        </motion.button>

        {/* Indian Broker & Ecosystem Trust Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-neutral-400 mt-6"
        >
          <span className="text-neutral-300 font-medium">Auto-sync with Indian Platforms:</span>
          <span>Zerodha Kite</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span>Groww</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span>CAMS / KFintech CAS</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span>EPF Passbook</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span>Sovereign Gold Bonds</span>
        </motion.div>
      </motion.div>

      {/* Dashboard + Video Area — full viewport width using w-screen with marginLeft: calc(-50vw + 50%) trick, aspect-ratio: 16/9, positioned relative */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{
          width: "100vw",
          marginLeft: "calc(-50vw + 50%)",
        }}
        className="relative aspect-video mt-8 md:mt-12 overflow-visible"
      >
        {/* Background video: <video>, absolutely positioned inset-0 w-full h-full object-cover */}
        <video
          autoPlay
          loop
          muted
          playsInline
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Backdrop shade for deep black contrast */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />

        {/* Dashboard image: Absolutely positioned, centered, max-w-5xl w-[90%] rounded-2xl, mixBlendMode: "luminosity". Has parallax scroll (y: 0→-250) + subtle floating animation */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            style={{ y: dashboardY }}
            className="relative max-w-5xl w-[90%] z-20 flex justify-center pointer-events-auto"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              className="w-full rounded-2xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.85)] border border-white/10 bg-[#0c0d10]"
            >
              {/* Browser navigation bar with Fermor logo and app.fermor.in URL */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-black/90 backdrop-blur-md border-b border-white/10 select-none">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 ml-3 pl-3 border-l border-white/10">
                    <FermorLogo size={14} className="rounded" />
                    <span className="text-xs font-semibold text-white tracking-tight">Fermor</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-3.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] text-neutral-300 font-mono">
                  <span className="text-emerald-400">🔒</span>
                  <span className="text-white font-medium">app.fermor.in</span>
                  <span className="hidden md:inline text-neutral-500">/overview</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-medium border border-emerald-500/20">
                    NIFTY 50 · LIVE
                  </span>
                </div>
              </div>

              <img
                src={heroDashboardImg}
                alt="Fermor Wealth Dashboard"
                referrerPolicy="no-referrer"
                style={{ mixBlendMode: "luminosity" }}
                className="w-full h-auto"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom gradient fade: Absolutely positioned at bottom of section, h-40, gradient from background to transparent, z-30, pointer-events-none */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent z-30 pointer-events-none" />
    </section>
  );
}
