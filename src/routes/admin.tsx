import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Download, LogOut } from "lucide-react";
import { KrydLogo } from "@/components/KrydLogo";
import { getWaitlist, formatRegistered, type WaitlistEntry } from "@/lib/waitlist";

export const Route = createFileRoute("/admin")({
  component: Admin,
});

const PASSWORD = "kryd2026admin";
const AUTH_KEY = "kryd_admin_auth";

function Admin() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(AUTH_KEY) === "1") {
      setAuthed(true);
    }
  }, []);

  useEffect(() => {
    if (authed) setEntries(getWaitlist().slice().reverse());
  }, [authed]);

  const stats = useMemo(() => {
    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;
    const today = entries.filter((e) => {
      const d = new Date(e.registeredAt);
      const n = new Date();
      return d.toDateString() === n.toDateString();
    }).length;
    const week = entries.filter((e) => now - new Date(e.registeredAt).getTime() <= 7 * day).length;
    return { total: entries.length, today, week };
  }, [entries]);

  const onLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === PASSWORD) {
      localStorage.setItem(AUTH_KEY, "1");
      setAuthed(true);
      setError(null);
    } else {
      setError("Incorrect password.");
    }
  };

  const onLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    setAuthed(false);
    setPassword("");
  };

  const exportCsv = () => {
    const rows = [
      ["#", "Email", "Date Registered", "Source"],
      ...entries.map((e, i) => [String(i + 1), e.email, formatRegistered(e.registeredAt), e.source]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kryd-waitlist-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-kryd flex items-center justify-center px-6">
        <form onSubmit={onLogin} className="w-full max-w-md kryd-card p-8">
          <div className="flex justify-center mb-6"><KrydLogo width={130} /></div>
          <h1 className="text-xl font-bold text-center mb-1">Admin Access</h1>
          <p className="text-sm text-kryd-secondary text-center mb-6">Enter the admin password.</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="kryd-input w-full px-4 py-3"
          />
          {error && <p className="text-red-300 text-sm mt-2">{error}</p>}
          <button
            type="submit"
            className="w-full mt-5 bg-kryd-accent text-[#0B2D2C] font-bold py-3 rounded-xl hover:brightness-110 transition"
          >
            Enter Dashboard
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-kryd text-white">
      <header className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <KrydLogo width={110} />
            <span className="text-kryd-secondary text-sm hidden sm:inline">/</span>
            <h1 className="font-semibold">Waitlist Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={exportCsv}
              className="bg-kryd-accent text-[#0B2D2C] font-semibold px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:brightness-110 transition"
            >
              <Download className="h-4 w-4" /> Export CSV
            </button>
            <button
              onClick={onLogout}
              className="text-kryd-secondary hover:text-white text-sm flex items-center gap-1"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {[
            { label: "Total Signups", value: stats.total },
            { label: "Today's Signups", value: stats.today },
            { label: "This Week", value: stats.week },
          ].map((s) => (
            <div key={s.label} className="kryd-card p-6">
              <div className="text-sm text-kryd-secondary uppercase tracking-wider">{s.label}</div>
              <div className="text-4xl font-extrabold text-kryd-accent mt-2">{s.value}</div>
            </div>
          ))}
        </div>

        <div className="kryd-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-kryd-accent/10 text-kryd-accent">
                <th className="text-left px-5 py-3 font-semibold">#</th>
                <th className="text-left px-5 py-3 font-semibold">Email</th>
                <th className="text-left px-5 py-3 font-semibold">Date Registered</th>
                <th className="text-left px-5 py-3 font-semibold">Source</th>
              </tr>
            </thead>
            <tbody>
              {entries.length === 0 && (
                <tr><td colSpan={4} className="text-center text-kryd-secondary py-12">No signups yet.</td></tr>
              )}
              {entries.map((e, i) => (
                <tr
                  key={e.email + e.registeredAt}
                  className="border-t border-white/5 hover:bg-white/5 transition"
                  style={{ backgroundColor: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)" }}
                >
                  <td className="px-5 py-3 text-kryd-secondary">{i + 1}</td>
                  <td className="px-5 py-3 font-medium">{e.email}</td>
                  <td className="px-5 py-3 text-kryd-secondary">{formatRegistered(e.registeredAt)}</td>
                  <td className="px-5 py-3 text-kryd-secondary">{e.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}