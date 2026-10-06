import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [interest, setInterest] = useState("all");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setEmail("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
            className="relative w-full max-w-lg bg-[#0d0d0d] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl text-left overflow-hidden z-10"
          >
            {/* Subtle top light effect */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-medium text-neutral-300 mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  <span>🇮🇳 India Early Access · Batch 04</span>
                </div>

                <h3 className="text-2xl font-medium tracking-tight text-white mb-2">
                  Join the Fermor India Waitlist
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                  Experience unified wealth tracking across Zerodha, Groww, CAMS CAS, Sovereign Gold Bonds, and EPF. Be the first in your city to gain access.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Email address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="arjun.mehta@bengaluru.in"
                      className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-700 focus:border-white focus:outline-none rounded-lg text-sm text-white placeholder-neutral-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Primary Wealth Focus
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "all", label: "Full Wealth (MF + Gold + PF)" },
                        { id: "stocks", label: "Direct MFs & SIP" },
                        { id: "fire", label: "FIRE in India" },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setInterest(item.id)}
                          className={`px-2.5 py-2 text-xs font-medium rounded-lg border transition-all cursor-pointer text-center ${
                            interest === item.id
                              ? "bg-white text-black border-white"
                              : "bg-neutral-900/60 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white text-black rounded-lg text-sm font-semibold hover:bg-neutral-200 transition-all cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <span>Reserving your spot in India...</span>
                      ) : (
                        <>
                          <span>Request Early Access Invite</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[11px] text-neutral-500 text-center">
                    Zero spam. Compliant with Indian DPDP Act 2023 with device-level encryption.
                  </p>
                </form>
              </div>
            ) : (
              <div className="py-6 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-medium tracking-tight text-white mb-2">
                  You're in position #1,428
                </h3>
                <p className="text-sm text-neutral-400 max-w-sm mx-auto mb-6">
                  We've reserved your early access spot for <span className="text-white font-medium">{email}</span>. Look out for an invitation email within 48 hours.
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-sm font-medium text-white rounded-lg transition-colors cursor-pointer"
                >
                  Return to Page
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
