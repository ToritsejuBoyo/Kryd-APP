export type WaitlistEntry = {
  email: string;
  registeredAt: string; // ISO
  source: string;
};

const KEY = "kryd_waitlist";

export function getWaitlist(): WaitlistEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as WaitlistEntry[];
  } catch {
    return [];
  }
}

export function addToWaitlist(email: string, source = "Waitlist Page"): boolean {
  if (typeof window === "undefined") return false;
  const list = getWaitlist();
  const normalized = email.trim().toLowerCase();
  if (list.some((e) => e.email.toLowerCase() === normalized)) return false;
  list.push({ email: normalized, registeredAt: new Date().toISOString(), source });
  localStorage.setItem(KEY, JSON.stringify(list));
  return true;
}

export function formatRegistered(iso: string): string {
  const d = new Date(iso);
  const date = d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  return `${date} · ${time}`;
}