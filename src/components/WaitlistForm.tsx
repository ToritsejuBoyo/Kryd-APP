import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, X } from "lucide-react";

const ENDPOINT =
  "https://script.google.com/macros/s/AKfycbyElM4xzDaB4LsweIxqrMios5HVTfd7PJtsBJC4oosNRxlPlvMmconvRmsQQ_HO7Cevvg/exec";

type Role = "learner" | "hirer";

const ROLE_LABELS: Record<Role, string> = {
  learner: "Learn & Earn",
  hirer: "Hire Talent",
};

const ROLE_DESCRIPTIONS: Record<Role, string> = {
  learner: "Upskill and find global IT opportunities",
  hirer: "Find verified IT talent for your team",
};

export function WaitlistForm({ id }: { id?: string }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [role, setRole] = useState<Role>("learner");
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openModal = () => {
    setIsOpen(true);
    setStep(1);
    setError(null);
    setMessage("");
  };

  const closeModal = () => {
    setIsOpen(false);
    setStep(1);
    setError(null);
    setMessage("");
  };

  const selectRole = (r: Role) => {
    setRole(r);
    setStep(2);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage("");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email.");
      return;
    }

    setLoading(true);

    try {
      await fetch(ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ email: email.trim(), role: ROLE_LABELS[role] }),
      });

      setMessage("You're on the waitlist");
      setSubmitted(true);
      closeModal();
    } catch {
      setError("Try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id={id} className="w-full max-w-xl mx-auto">
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="cta"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center gap-3"
          >
            <button
              type="button"
              onClick={openModal}
              className="font-mono-tech bg-kryd-accent text-black font-semibold px-8 py-3.5 rounded-lg hover:brightness-110 active:scale-[0.98] transition shadow-[0_10px_40px_-8px_rgba(212,244,41,0.55)] flex items-center justify-center gap-2 whitespace-nowrap"
            >
              Get Early Access
            </button>
            <p className="text-xs text-kryd-secondary text-center flex items-center justify-center gap-1.5">
              🔒 No spam. Just early access and launch updates.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="kryd-card p-6 flex items-center gap-3"
            style={{ borderColor: "rgba(204,223,26,0.5)" }}
          >
            <div className="h-10 w-10 rounded-full bg-kryd-accent flex items-center justify-center">
              <Check className="h-5 w-5 text-black" strokeWidth={3} />
            </div>
            <div>
              <p className="font-semibold text-white">{message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && !submitted && (
        <p className="text-sm text-red-300 mt-2 text-center">{error}</p>
      )}

      {mounted && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4"
              onClick={closeModal}
            >
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 12 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
                className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-[rgba(26,66,53,0.9)] p-6 shadow-2xl backdrop-blur-xl"
              >
                <button
                  type="button"
                  onClick={closeModal}
                  className="absolute top-4 right-4 h-8 w-8 rounded-full border border-white/10 text-kryd-secondary hover:text-white hover:border-white/30 transition flex items-center justify-center"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>

                <AnimatePresence mode="wait">
                  {step === 1 ? (
                    <motion.div
                      key="role-step"
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col gap-5"
                    >
                      <div className="text-center">
                        <h3 className="font-display text-2xl font-bold text-white">
                          Join Kryd
                        </h3>
                        <p className="text-kryd-secondary text-sm mt-1">
                          What brings you here?
                        </p>
                      </div>

                      <div className="flex flex-col gap-3">
                        {(Object.keys(ROLE_LABELS) as Role[]).map((r) => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => selectRole(r)}
                            className="group text-left rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-[rgba(212,244,41,0.5)] hover:bg-[rgba(212,244,41,0.1)] focus:outline-none focus:ring-2 focus:ring-[rgba(212,244,41,0.4)]"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-white group-hover:text-kryd-accent transition">
                                {ROLE_LABELS[r]}
                              </span>
                              <span className="text-kryd-accent opacity-0 group-hover:opacity-100 transition text-sm">
                                Select →
                              </span>
                            </div>
                            <p className="text-kryd-secondary text-sm mt-1">
                              {ROLE_DESCRIPTIONS[r]}
                            </p>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="email-step"
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 12 }}
                      transition={{ duration: 0.2 }}
                      onSubmit={onSubmit}
                      className="flex flex-col gap-5"
                    >
                      <div className="text-center">
                        <h3 className="font-display text-2xl font-bold text-white">
                          Get Early Access
                        </h3>
                        <p className="text-kryd-secondary text-sm mt-1">
                          You're signing up as{" "}
                          <span className="text-kryd-accent font-semibold">
                            {ROLE_LABELS[role]}
                          </span>
                          .
                        </p>
                      </div>

                      <div className="flex flex-col gap-3">
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          className="kryd-input w-full px-5 py-3.5 text-base"
                          disabled={loading}
                          autoFocus
                        />
                        <button
                          type="submit"
                          disabled={loading}
                          className="font-mono-tech bg-kryd-accent text-black font-semibold px-6 py-3.5 rounded-lg hover:brightness-110 active:scale-[0.98] transition shadow-[0_10px_40px_-8px_rgba(212,244,41,0.55)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
                        >
                          {loading ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Submitting…
                            </>
                          ) : (
                            "Get Early Access"
                          )}
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-sm text-kryd-secondary hover:text-white transition text-center"
                      >
                        ← Back to role selection
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
