import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

const ENDPOINT =
  "https://script.google.com/macros/s/AKfycbyElM4xzDaB4LsweIxqrMios5HVTfd7PJtsBJC4oosNRxlPlvMmconvRmsQQ_HO7Cevvg/exec";

type Role = "learner" | "hirer";

const ROLE_LABELS: Record<Role, string> = {
  learner: "Learn & Earn",
  hirer: "Hire Talent",
};

export function WaitlistForm({ id }: { id?: string }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [role, setRole] = useState<Role>("learner");
  const [showRoleSelector, setShowRoleSelector] = useState(false);

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
        body: JSON.stringify({ email: email.trim() }),
      });

      setMessage("You're on the waitlist");
      setSubmitted(true);
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
          <motion.form
            key="form"
            onSubmit={onSubmit}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="kryd-input flex-1 px-5 py-3.5 text-base"
              disabled={loading}
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
          </motion.form>
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
      {error && !submitted && <p className="text-sm text-red-300 mt-2">{error}</p>}
      {!submitted && (
        <p className="text-xs text-kryd-secondary mt-3 text-center flex items-center justify-center gap-1.5">
          🔒 No spam. Just early access and launch updates.
        </p>
      )}
    </div>
  );
}
