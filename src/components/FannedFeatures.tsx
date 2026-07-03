import { useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap, Briefcase, Bot, Trophy, Globe2, Coins,
  type LucideIcon,
} from "lucide-react";

type Feature = { icon: LucideIcon; title: string; desc: string };

const FEATURES: Feature[] = [
  { icon: GraduationCap, title: "Learn & Earn", desc: "Master new technologies with our curated courses and earn real rewards as you hit learning milestones." },
  { icon: Briefcase, title: "Global IT Jobs", desc: "Connect with top employers globally. Your verified skills act as your passport to international opportunities." },
  { icon: Bot, title: "AI Career Assistant", desc: "Get personalized career guidance, résumé reviews, and interview prep powered by advanced AI models." },
  { icon: Trophy, title: "Gamified Milestones", desc: "Track your progress visually. Unlock badges and achievements that showcase your expertise to the world." },
  { icon: Globe2, title: "Verified Community", desc: "Network with verified peers. Share knowledge, solve complex problems, and build lasting professional relationships." },
  { icon: Coins, title: "Earn While You Contribute", desc: "Get paid for answering complex queries, creating tutorials, or helping others solve critical infrastructure issues." },
];

export function FannedFeatures() {
  const [active, setActive] = useState(2);
  const n = FEATURES.length;

  return (
    <div className="relative">
      {/* Desktop / tablet fan */}
      <div
        className="hidden md:block relative mx-auto"
        style={{ height: 520, perspective: "1400px" }}
        onMouseLeave={() => setActive(2)}
      >
        {FEATURES.map((f, i) => {
          const offset = i - active;
          const abs = Math.abs(offset);
          const isActive = offset === 0;

          // Cards further out fan wider and dip lower
          const x = offset * 180;
          const y = abs * 34;
          const rot = offset * 7;
          const scale = isActive ? 1.08 : 1 - abs * 0.09;
          const opacity = abs > 2 ? 0 : isActive ? 1 : 1 - abs * 0.28;
          const z = 100 - abs * 10;

          return (
            <motion.button
              key={f.title}
              type="button"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-label={f.title}
              className="absolute left-1/2 top-8 -translate-x-1/2 text-left cursor-pointer outline-none"
              style={{
                width: 300,
                height: 400,
                transformOrigin: "50% 90%",
                zIndex: z,
                pointerEvents: abs > 2 ? "none" : "auto",
              }}
              animate={{
                x,
                y,
                rotate: rot,
                scale,
                opacity,
              }}
              transition={{ type: "spring", stiffness: 210, damping: 26, mass: 0.9 }}
            >
              <FanCard feature={f} active={isActive} />
            </motion.button>
          );
        })}

        {/* Dots */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-2 flex items-center gap-2">
          {FEATURES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show feature ${i + 1}`}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === active ? 24 : 8,
                backgroundColor: i === active ? "#D4F429" : "rgba(224,229,224,0.25)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Mobile: horizontal snap-scroll */}
      <div className="md:hidden -mx-5 px-5 overflow-x-auto snap-x snap-mandatory flex gap-4 pb-4">
        {FEATURES.map((f) => (
          <div key={f.title} className="snap-center shrink-0 w-[78%] max-w-[300px]">
            <FanCard feature={f} active />
          </div>
        ))}
      </div>

      {/* silence unused var */}
      <span className="sr-only">{n} features</span>
    </div>
  );
}

function FanCard({ feature, active }: { feature: Feature; active: boolean }) {
  const Icon = feature.icon;
  return (
    <div
      className="w-full h-full flex flex-col justify-between p-6 transition-colors"
      style={{
        borderRadius: 24,
        background: active
          ? "linear-gradient(180deg, #1E4A3C 0%, #133328 100%)"
          : "linear-gradient(180deg, #16382E 0%, #0F2822 100%)",
        border: active
          ? "1px solid rgba(212,244,41,0.45)"
          : "1px solid rgba(255,255,255,0.06)",
        boxShadow: active
          ? "0 30px 60px -20px rgba(0,0,0,0.65), 0 12px 24px -12px rgba(0,0,0,0.55)"
          : "0 20px 40px -20px rgba(0,0,0,0.55), 0 8px 16px -10px rgba(0,0,0,0.4)",
      }}
    >
      <div>
        <div
          className="h-12 w-12 flex items-center justify-center mb-6"
          style={{
            borderRadius: 14,
            background: active ? "#D4F429" : "rgba(212,244,41,0.12)",
            border: active ? "none" : "1px solid rgba(212,244,41,0.25)",
          }}
        >
          <Icon className="h-5 w-5" style={{ color: active ? "#000" : "#D4F429" }} />
        </div>
        <h3
          className="font-display font-bold tracking-tight"
          style={{ fontSize: active ? 26 : 22, lineHeight: 1.15, color: "#fff" }}
        >
          {feature.title}
        </h3>
        <p
          className="mt-3 leading-relaxed"
          style={{ fontSize: 14, color: active ? "#E0E5E0" : "rgba(224,229,224,0.75)" }}
        >
          {feature.desc}
        </p>
      </div>
      <div className="flex items-center justify-between pt-6 border-t border-white/5">
        <span className="font-mono-tech text-[10px] uppercase" style={{ color: active ? "#D4F429" : "rgba(224,229,224,0.5)" }}>
          {active ? "Featured" : "Explore"}
        </span>
        <span
          className="h-7 w-7 rounded-full flex items-center justify-center text-[13px]"
          style={{
            backgroundColor: active ? "#D4F429" : "rgba(255,255,255,0.06)",
            color: active ? "#000" : "#E0E5E0",
          }}
        >
          →
        </span>
      </div>
    </div>
  );
}