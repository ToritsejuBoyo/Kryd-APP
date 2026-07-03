import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Zap, Gift, Bell, Twitter, Linkedin, Instagram,
} from "lucide-react";
import { KrydLogo } from "@/components/KrydLogo";
import { WaitlistForm } from "@/components/WaitlistForm";
import { FloatingNotifications } from "@/components/FloatingNotifications";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { FannedFeatures } from "@/components/FannedFeatures";

export const Route = createFileRoute("/")({
  component: Index,
});

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(10,31,26,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-4 flex items-center justify-between">
        <KrydLogo width={120} />
        <a
          href="#waitlist"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="font-mono-tech bg-kryd-accent text-black font-semibold px-5 py-2 rounded-full text-sm hover:brightness-110 transition shadow-[0_6px_24px_-6px_rgba(212,244,41,0.5)]"
        >
          Join Waitlist
        </a>
      </div>
    </header>
  );
}


function Index() {
  return (
    <div className="bg-kryd min-h-screen text-white overflow-x-hidden relative">
      <Nav />

      {/* HERO */}
      <section className="relative px-5 md:px-8 pt-32 md:pt-40 pb-20 md:pb-28">
        <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[700px] kryd-glow pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-display text-[40px] md:text-[72px] leading-[1.02] font-extrabold tracking-[-0.04em]"
          >
            The Next Evolution in
            <br />
            <span className="underline-accent text-kryd-accent">IT Support</span> is Here.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-kryd-secondary text-[17px] md:text-lg max-w-xl mx-auto mt-6 leading-relaxed"
          >
            Kryd is where IT professionals worldwide come to level up — learn in-demand skills,
            land global opportunities, and turn their expertise into real income. All in one
            AI-powered platform.
          </motion.p>

          <motion.div
            id="waitlist"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 scroll-mt-24"
          >
            <WaitlistForm />
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 md:py-32 px-5 md:px-8 relative">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
            <div className="inline-flex kryd-pill px-3 py-1 text-[10px] font-mono-tech mb-5">FEATURES</div>
            <h2 className="font-display text-[32px] md:text-5xl font-extrabold tracking-[-0.02em] leading-[1.05]">
              Built for the IT professional who is <span className="text-kryd-accent">ready for more.</span>
            </h2>
            <p className="text-kryd-secondary mt-5 text-base md:text-lg">
              One platform. Every tool you need to grow your IT career globally.
            </p>
          </div>

          <FannedFeatures />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-5 md:px-8 relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[700px] h-[500px] kryd-glow" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="font-display text-[32px] md:text-5xl font-extrabold tracking-[-0.02em] leading-[1.05]">
            Your IT career breakthrough <span className="text-kryd-accent">starts here.</span>
          </h2>
          <p className="text-kryd-secondary mt-5 text-base md:text-lg">
            Be among the first to access Kryd when we launch. Early members get founding status,
            priority access, and exclusive rewards.
          </p>
          <div className="mt-10">
            <WaitlistForm />
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            {[
              { icon: Zap, label: "Early access before public launch" },
              { icon: Gift, label: "Founding member badge on your profile" },
              { icon: Bell, label: "First to know about new features" },
            ].map((b) => (
              <div key={b.label} className="flex items-center justify-center gap-2 text-kryd-secondary">
                <b.icon className="h-4 w-4 text-kryd-accent" />
                <span>{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-14 px-5 md:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex justify-center"><KrydLogo width={110} /></div>
          <p className="text-kryd-secondary mt-4 text-sm italic">
            The IT platform built for where the world is going.
          </p>
          <div className="flex justify-center gap-5 mt-6 text-sm text-kryd-secondary font-mono-tech">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <span className="text-white/20">·</span>
            <a href="#" className="hover:text-white transition">Terms</a>
            <span className="text-white/20">·</span>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
          <div className="flex justify-center gap-5 mt-6">
            {[Twitter, Linkedin, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="h-9 w-9 rounded-full border border-white/10 flex items-center justify-center text-kryd-secondary hover:text-kryd-accent hover:border-kryd-accent/40 transition">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <p className="text-xs text-white/40 mt-6 font-mono-tech">© 2026 Kryd. All rights reserved.</p>
          <Link to="/admin" className="text-xs text-white/30 hover:text-kryd-accent mt-3 inline-block">Admin</Link>
        </div>
      </footer>

      <FloatingNotifications />
      <WhatsAppButton />
    </div>
  );
}
