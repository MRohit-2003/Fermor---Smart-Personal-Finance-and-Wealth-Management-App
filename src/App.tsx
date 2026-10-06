/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Hero } from "./components/Hero";
import { Testimonial } from "./components/Testimonial";
import { AskAnythingSection } from "./components/AskAnythingSection";
import { CalculatorSection } from "./components/CalculatorSection";
import { SecurityTrustStrip } from "./components/SecurityTrustStrip";
import { Footer } from "./components/Footer";
import { WaitlistModal } from "./components/WaitlistModal";
import { LoginModal } from "./components/LoginModal";

export default function App() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20 selection:text-white font-sans antialiased overflow-x-hidden">
      {/* Section 1: Hero */}
      <Hero
        onOpenWaitlist={() => setWaitlistOpen(true)}
        onOpenLogin={() => setLoginOpen(true)}
      />

      {/* Section 2: Testimonial */}
      <Testimonial />

      {/* Section 3: Ask Anything — Interactive Chat Interface & Video Slide (fermor.in) */}
      <AskAnythingSection />

      {/* Section 4: Interactive Smart Calculators & Wealth Engines */}
      <CalculatorSection onOpenWaitlist={() => setWaitlistOpen(true)} />

      {/* Section 5: Security & Trust Strip above Footer */}
      <SecurityTrustStrip />

      {/* Footer */}
      <Footer
        onOpenWaitlist={() => setWaitlistOpen(true)}
        onOpenLogin={() => setLoginOpen(true)}
      />

      {/* Interactive Modals */}
      <WaitlistModal
        isOpen={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
      />
      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
      />
    </div>
  );
}
