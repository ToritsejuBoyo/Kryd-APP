export function KrydLogo({ className = "", width = 120 }: { className?: string; width?: number }) {
  return (
    <div className={`inline-flex items-baseline ${className}`} style={{ fontFamily: "Inter, sans-serif" }}>
      <svg width={width * 0.28} viewBox="0 0 32 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 2 L4 34 L10 34 L10 22 L12 22 L22 34 L30 34 L17 18 L29 2 L21 2 L12 14 L10 14 L10 2 Z" fill="#CCDF1A"/>
      </svg>
      <span
        className="text-white font-extrabold tracking-tight"
        style={{ fontSize: width * 0.28, lineHeight: 1, marginLeft: 2 }}
      >
        ryd
      </span>
    </div>
  );
}