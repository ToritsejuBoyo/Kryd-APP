import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { addToWaitlist } from "@/lib/waitlist";

export function WaitlistForm({ id }: { id?: string }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email.");
      return;
    }
    addToWaitlist(email);
    setSubmitted(true);
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
              placeholder="Enter your email to get early access"
              className="kryd-input flex-1 px-5 py-4 text-base"
            />
            <button
              type="submit"
              className="bg-kryd-accent text-[#0B2D2C] font-bold px-6 py-4 rounded-xl hover:brightness-110 active:scale-[0.98] transition shadow-[0_0_30px_-8px_rgba(204,223,26,0.7)]"
            >
              Get Early Access
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
              <Check className="h-5 w-5 text-[#0B2D2C]" strokeWidth={3} />
            </div>
            <div>
              <p className="font-semibold text-white">You're on the list!</p>
              <p className="text-sm text-kryd-secondary">We'll be in touch soon.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {error && !submitted && <p className="text-sm text-red-300 mt-2">{error}</p>}
      {!submitted && (
        <p className="text-xs text-kryd-secondary mt-3 text-center sm:text-left">
          🔒 No spam. Just early access and launch updates.
        </p>
      )}
    </div>
  );
}