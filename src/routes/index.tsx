import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap, Briefcase, Bot, Trophy, Globe2, Coins, Lock,
  Zap, Gift, Bell, Twitter, Linkedin, Instagram,
} from "lucide-react";
import { KrydLogo } from "@/components/KrydLogo";
import { WaitlistForm } from "@/components/WaitlistForm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kryd — Where IT Professionals Learn, Earn & Grow" },
      { name: "description", content: "Kryd is the AI-powered platform built for IT Support specialists and tech professionals worldwide. Join the waitlist for early access." },
      { property: "og:title", content: "Kryd — Coming Soon" },
      { property: "og:description", content: "The platform for IT professionals to learn, earn, and grow globally. Join the waitlist." },
    ],
  }),
  component: Index,
});

const features = [
  { icon: GraduationCap, title: "Learn & Earn", desc: "Take IT courses and earn real points for every lesson completed. Your learning pays off — literally." },
  { icon: Briefcase, title: "Global Job Marketplace", desc: "Connect with IT employers worldwide. Freelance gigs, full-time roles, and everything in between — matched to your skills by AI." },
  { icon: Bot, title: "AI Career Assistant", desc: "Your personal AI guide recommends certifications, maps your salary path, and pairs you with the right mentors." },
  { icon: Trophy, title: "Gamified Growth", desc: "Daily challenges, leaderboards, and verified badges that prove your expertise to the world." },
  { icon: Globe2, title: "Verified Community", desc: "Join groups of IT Support specialists, cloud engineers, and security pros. Ask questions, share knowledge, build influence." },
  { icon: Coins, title: "Coins & Rewards", desc: "Turn your contributions into coins. Convert coins to real income. The more you give, the more you earn." },
];

const avatars = [
  { initials: "AO", color: "#CCDF1A" },
  { initials: "JK", color: "#3DDC97" },
  { initials: "EM", color: "#7C8DFF" },
  { initials: "TR", color: "#FF8A65" },
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
        backgroundColor: scrolled ? "rgba(11,45,44,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <KrydLogo width={120} />
        <a
          href="#waitlist"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="bg-kryd-accent text-[#0B2D2C] font-semibold px-5 py-2 rounded-full text-sm hover:brightness-110 transition"
        >
          Join Waitlist
        </a>
      </div>
    </header>
  );
}

function Index() {
  return (
    <div className="bg-kryd min-h-screen text-white overflow-x-hidden">
      <Nav />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16">
        <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] kryd-glow pointer-events-none" />
        {/* floating shapes */}
        <div className="absolute top-32 left-10 w-16 h-16 border border-white/10 rotate-12 rounded-md hidden md:block" />
        <div className="absolute bottom-20 right-16 w-24 h-24 border border-white/10 -rotate-12 rounded-md hidden md:block" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block kryd-pill px-4 py-1.5 text-xs font-medium mb-8"
          >
            ✦ Coming Soon
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[40px] md:text-[64px] leading-[1.05] font-extrabold tracking-tight"
          >
            Where IT Professionals
            <br />
            Learn, <span className="underline-accent text-kryd-accent">Earn</span> &amp; Grow.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-kryd-secondary text-lg max-w-2xl mx-auto mt-6"
          >
            Kryd is the AI-powered platform built for IT Support specialists and tech
            professionals worldwide — bringing together skills, jobs, and community in one place.
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

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-10 flex items-center justify-center gap-3"
          >
            <div className="flex -space-x-2">
              {avatars.map((a) => (
                <div
                  key={a.initials}
                  className="h-8 w-8 rounded-full flex items-center justify-center text-[11px] font-bold text-[#0B2D2C] border-2 border-[#0B2D2C]"
                  style={{ backgroundColor: a.color }}
                >
                  {a.initials}
                </div>
              ))}
            </div>
            <p className="text-sm text-kryd-secondary">
              Join <span className="text-white font-semibold">500+ IT professionals</span> already on the waitlist
            </p>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Everything your IT career needs — <span className="text-kryd-accent">in one platform.</span>
            </h2>
            <p className="text-kryd-secondary mt-4 text-lg italic">
              We're building something ambitious. Here's a taste.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="kryd-card p-6 relative group"
              >
                <div className="absolute top-4 right-4 text-white/30 group-hover:text-kryd-accent/70 transition">
                  <Lock className="h-4 w-4" />
                </div>
                <div className="h-11 w-11 rounded-xl bg-kryd-accent/10 border border-kryd-accent/30 flex items-center justify-center mb-5">
                  <f.icon className="h-5 w-5 text-kryd-accent" />
                </div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-kryd-secondary text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 px-6" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {[
            { num: "500+", label: "Early Access Members" },
            { num: "3", label: "Core Features Launching" },
            { num: "Global", label: "IT Professional Network" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-5xl md:text-6xl font-extrabold text-kryd-accent">{s.num}</div>
              <div className="text-white/80 mt-2 text-sm uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[400px] kryd-glow" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Be the first to access <span className="text-kryd-accent">Kryd.</span>
          </h2>
          <p className="text-kryd-secondary mt-4 text-lg">
            Early members get priority access, exclusive badges, and founding member status.
          </p>
          <div className="mt-10">
            <WaitlistForm />
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
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
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex justify-center"><KrydLogo width={110} /></div>
          <p className="text-kryd-secondary italic mt-4 text-sm">
            "Empowering IT Professionals to Learn, Earn, and Grow — Globally."
          </p>
          <div className="flex justify-center gap-6 mt-6 text-sm text-kryd-secondary">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <span>·</span>
            <a href="#" className="hover:text-white transition">Terms</a>
            <span>·</span>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
          <div className="flex justify-center gap-5 mt-6">
            {[Twitter, Linkedin, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="text-kryd-secondary hover:text-kryd-accent transition">
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
          <p className="text-xs text-white/40 mt-6">© 2026 Kryd. All rights reserved.</p>
          <Link to="/admin" className="text-xs text-white/30 hover:text-kryd-accent mt-3 inline-block">Admin</Link>
        </div>
      </footer>
    </div>
  );
}
