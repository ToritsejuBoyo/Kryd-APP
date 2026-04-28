import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Notif = {
  initials: string;
  color: string;
  side: "left" | "right";
  title: string;
  badge: string;
};

const NOTIFS: Notif[] = [
  { initials: "AO", color: "#3DDC97", side: "left",  title: "Network setup completed",          badge: "+$320 earned" },
  { initials: "JK", color: "#A78BFA", side: "right", title: "CompTIA A+ module completed",      badge: "+50 pts earned" },
  { initials: "EM", color: "#FB923C", side: "left",  title: "Freelance job payment received",   badge: "+$750 earned" },
  { initials: "TR", color: "#60A5FA", side: "right", title: "IT Support contract closed",       badge: "+$1,200 earned" },
  { initials: "NS", color: "#34D399", side: "left",  title: "Daily challenge completed",        badge: "+50 pts earned" },
  { initials: "CB", color: "#F87171", side: "right", title: "Cloud migration project paid",     badge: "+$980 earned" },
  { initials: "MO", color: "#2DD4BF", side: "left",  title: "Cybersecurity course certified",   badge: "+75 pts earned" },
  { initials: "FK", color: "#FBBF24", side: "right", title: "Helpdesk contract completed",      badge: "+$540 earned" },
];

export function FloatingNotifications() {
  const [active, setActive] = useState<number | null>(null);
  const [shownStep, setShownStep] = useState(-1);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      const pct = window.scrollY / total;
      // First at 20%, then every ~16%
      if (pct < 0.2) return;
      const step = Math.min(NOTIFS.length - 1, Math.floor((pct - 0.2) / 0.16));
      if (step !== shownStep) {
        setShownStep(step);
        const idx = step % NOTIFS.length;
        setActive(idx);
        window.setTimeout(() => {
          setActive((cur) => (cur === idx ? null : cur));
        }, 3500);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [shownStep]);

  return (
    <AnimatePresence>
      {active !== null && (() => {
        const n = NOTIFS[active];
        const isLeft = n.side === "left";
        return (
          <motion.div
            key={active}
            initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isLeft ? -40 : 40 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-[60] hidden sm:flex items-center gap-3"
            style={{
              bottom: 100,
              left: isLeft ? 24 : "auto",
              right: isLeft ? "auto" : 24,
              width: 280,
              background: "rgba(11,45,44,0.92)",
              borderLeft: "4px solid #CCDF1A",
              borderRadius: 14,
              padding: "14px 16px",
              backdropFilter: "blur(10px)",
              boxShadow: "0 10px 30px -10px rgba(0,0,0,0.6)",
              color: "#fff",
            }}
          >
            <div
              className="h-9 w-9 rounded-full flex items-center justify-center text-[11px] font-bold text-[#0B2D2C] shrink-0"
              style={{ backgroundColor: n.color }}
            >
              {n.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold truncate">{n.initials}</div>
              <div className="text-xs text-white/70 truncate">{n.title}</div>
            </div>
            <div className="text-xs font-bold whitespace-nowrap" style={{ color: "#CCDF1A" }}>
              {n.badge}
            </div>
          </motion.div>
        );
      })()}
    </AnimatePresence>
  );
}
