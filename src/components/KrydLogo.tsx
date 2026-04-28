import logo from "@/assets/kryd-logo.png";

export function KrydLogo({ className = "", width = 120 }: { className?: string; width?: number }) {
  return (
    <img
      src={logo}
      alt="Kryd"
      className={className}
      style={{ width, height: "auto", display: "inline-block" }}
    />
  );
}