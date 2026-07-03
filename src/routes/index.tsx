import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap, Briefcase, Bot, Trophy, Globe2, Coins,
  Zap, Gift, Bell, Twitter, Linkedin, Instagram, TrendingUp, Activity, Sparkles,
} from "lucide-react";
import { KrydLogo } from "@/components/KrydLogo";
import { WaitlistForm } from "@/components/WaitlistForm";
import { FloatingNotifications } from "@/components/FloatingNotifications";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const Route = createFileRoute("/")({
  component: Index,
});

const features = [
  { icon: GraduationCap, title: "Learn & Earn", desc: "Master new technologies with our curated courses and earn real rewards as you hit learning milestones." },
  { icon: Briefcase, title: "Global IT Job Marketplace", desc: "Connect with top employers globally. Your verified skills act as your passport to international opportunities." },
  { icon: Bot, title: "AI Career Assistant", desc: "Get personalized career guidance, résumé reviews, and interview prep powered by advanced AI models." },
  { icon: Trophy, title: "Gamified Milestones", desc: "Track your progress visually. Unlock badges and achievements that showcase your expertise to the world." },
  { icon: Globe2, title: "Verified IT Community", desc: "Network with verified peers. Share knowledge, solve complex problems, and build lasting professional relationships." },
  { icon: Coins, title: "Earn While You Contribute", desc: "Get paid for answering complex queries, creating tutorials, or helping others solve critical IT infrastructure issues." },
];

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

function ProductMockup() {
  return (
    <div className="product-frame relative">
      <div className="product-frame-inner p-6 md:p-10">
        {/* Ambient glow behind */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[80%] h-[70%] kryd-glow" />
        </div>

        <div className="relative grid md:grid-cols-[1.5fr_1fr] gap-5 items-center">
          {/* Laptop dashboard */}
          <div className="rounded-xl border border-white/10 bg-[#0B221C] overflow-hidden">
            <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
              <span className="ml-3 font-mono-tech text-[10px] text-kryd-secondary">app.kryd.io / dashboard</span>
            </div>
            <div className="p-4 md:p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-display font-bold text-white text-lg leading-tight">Your Next Job Awaits</div>
                  <div className="text-[11px] text-kryd-secondary mt-0.5">12 matched opportunities this week</div>
                </div>
                <div className="font-mono-tech text-[10px] px-2 py-1 rounded-full bg-kryd-accent/15 text-kryd-accent border border-kryd-accent/30">LIVE</div>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { t: "Sr. Cloud Eng", c: "Remote · $140k", tag: "AWS" },
                  { t: "IT Support L2", c: "Berlin · €65k", tag: "M365" },
                  { t: "SecOps Analyst", c: "Remote · $110k", tag: "SOC" },
                ].map((j) => (
                  <div key={j.t} className="rounded-lg border border-white/8 bg-white/[0.03] p-2.5">
                    <div className="text-[11px] font-semibold text-white leading-tight">{j.t}</div>
                    <div className="text-[9px] text-kryd-secondary mt-1">{j.c}</div>
                    <div className="mt-2 inline-block font-mono-tech text-[9px] px-1.5 py-0.5 rounded bg-kryd-accent/15 text-kryd-accent">{j.tag}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-lg border border-white/8 bg-white/[0.03] p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] text-kryd-secondary">Skill growth · 30d</span>
                  <span className="font-mono-tech text-[10px] text-kryd-accent flex items-center gap-1"><TrendingUp className="h-3 w-3" />+38%</span>
                </div>
                <svg viewBox="0 0 200 40" className="w-full h-10">
                  <defs>
                    <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#D4F429" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#D4F429" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,32 L20,28 L40,30 L60,22 L80,24 L100,18 L120,20 L140,12 L160,14 L180,6 L200,8 L200,40 L0,40 Z" fill="url(#g)" />
                  <path d="M0,32 L20,28 L40,30 L60,22 L80,24 L100,18 L120,20 L140,12 L160,14 L180,6 L200,8" fill="none" stroke="#D4F429" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>

          {/* Phone card */}
          <div className="rounded-[28px] border border-white/10 bg-[#0B221C] p-3 md:p-4 mx-auto md:mx-0 max-w-[240px] md:max-w-none">
            <div className="rounded-[20px] bg-gradient-to-b from-[#12332A] to-[#0A1F1A] p-4 border border-white/5">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono-tech text-[10px] text-kryd-secondary">Skills</span>
                <Sparkles className="h-3.5 w-3.5 text-kryd-accent" />
              </div>
              <div className="text-4xl font-display font-extrabold text-white leading-none">78<span className="text-kryd-accent">%</span></div>
              <div className="text-[10px] text-kryd-secondary mt-1">Cloud mastery</div>
              <div className="mt-4 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-kryd-accent" style={{ width: "78%" }} />
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-kryd-accent/15 flex items-center justify-center border border-kryd-accent/30">
                  <Activity className="h-4 w-4 text-kryd-accent" />
                </div>
                <div>
                  <div className="text-[11px] text-white font-semibold leading-tight">+240 pts today</div>
                  <div className="text-[9px] text-kryd-secondary">Streak · 12 days</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 kryd-pill px-3.5 py-1.5 text-[11px] font-mono-tech font-medium mb-8"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-kryd-accent shadow-[0_0_8px_rgba(212,244,41,0.9)]" />
            NOW ACCEPTING EARLY ACCESS
          </motion.div>

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

      {/* PRODUCT MOCKUP */}
      <section className="relative px-5 md:px-8 pb-24 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="max-w-[1100px] mx-auto"
        >
          <ProductMockup />
        </motion.div>
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
