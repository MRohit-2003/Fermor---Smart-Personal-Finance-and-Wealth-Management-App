import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Lock, CheckCircle2, ArrowRight } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [passwordHint, setPasswordHint] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLoggedIn(true);
    }, 600);
  };

  const handleReset = () => {
    setLoggedIn(false);
    setEmail("");
    setPassword("");
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
            className="relative w-full max-w-md bg-[#0d0d0d] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl text-left overflow-hidden z-10"
          >
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {!loggedIn ? (
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-4">
                  <Lock className="w-5 h-5" />
                </div>

                <h3 className="text-2xl font-medium tracking-tight text-white mb-1.5">
                  Welcome to Fermor
                </h3>
                <p className="text-sm text-neutral-400 mb-6">
                  Access your encrypted financial dashboard and portfolio forecasts.
                </p>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Email address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="arjun.mehta@investor.in"
                      className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-700 focus:border-white focus:outline-none rounded-lg text-sm text-white placeholder-neutral-500 transition-colors"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-medium text-neutral-300">
                        Password or Passkey
                      </label>
                      <button
                        type="button"
                        onClick={() => setPasswordHint(true)}
                        className="text-xs text-neutral-400 hover:text-white transition-colors"
                      >
                        Forgot password?
                      </button>
                    </div>
                    {passwordHint && (
                      <div className="mb-2 p-2 rounded-lg bg-white/5 border border-white/10 text-xs text-neutral-300">
                        Password or OTP recovery instructions will be dispatched to your registered mobile or email.
                      </div>
                    )}
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-700 focus:border-white focus:outline-none rounded-lg text-sm text-white placeholder-neutral-500 transition-colors"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white text-black rounded-lg text-sm font-semibold hover:bg-neutral-200 transition-all cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <span>Authenticating with Vault...</span>
                      ) : (
                        <>
                          <span>Sign in to Dashboard</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEmail("arjun.mehta@investor.in");
                        setPassword("demo123456");
                      }}
                      className="w-full py-2 px-3 text-xs text-neutral-400 bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 rounded-lg transition-colors cursor-pointer text-center"
                    >
                      Fill Demo Credentials (Arjun Mehta)
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="py-6 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-medium tracking-tight text-white mb-2">
                  Authenticated Successfully
                </h3>
                <p className="text-sm text-neutral-400 max-w-sm mx-auto mb-6">
                  Welcome back, <span className="text-white font-medium">{email}</span>. Connecting to encrypted vault session...
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-sm font-medium text-white rounded-lg transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
