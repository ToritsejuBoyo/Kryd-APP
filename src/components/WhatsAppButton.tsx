export function WhatsAppButton() {
  return (
    <>
      <style>{`
        @keyframes kryd-wa-pulse {
          0%   { transform: scale(1);   opacity: 0.55; }
          80%  { transform: scale(1.9); opacity: 0; }
          100% { transform: scale(1.9); opacity: 0; }
        }
        .kryd-wa { transition: transform .2s ease, box-shadow .2s ease; }
        .kryd-wa:hover { transform: scale(1.1); box-shadow: 0 6px 28px rgba(37,211,102,0.65); }
        .kryd-wa:hover + .kryd-wa-tip { opacity: 1; transform: translateX(0); }
        .kryd-wa-tip { transition: opacity .2s ease, transform .2s ease; }
      `}</style>
      <div
        className="fixed z-[999]"
        style={{ bottom: "max(20px, env(safe-area-inset-bottom, 0px))", right: 16 }}
      >
        <div className="relative sm:bottom-2 sm:right-3" style={{ position: "relative" }}>
          <span
            aria-hidden
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              backgroundColor: "#25D366",
              animation: "kryd-wa-pulse 2.5s ease-out infinite",
            }}
          />
          <a
            href="#whatsapp-community"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Join the Kryd Community on WhatsApp"
            className="kryd-wa relative flex items-center justify-center rounded-full"
            style={{
              width: 56,
              height: 56,
              backgroundColor: "#25D366",
              boxShadow: "0 4px 20px rgba(37,211,102,0.45)",
            }}
          >
            <svg width="30" height="30" viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.495-1.32.13-.302.23-.63.23-.964 0-.5-1.36-.93-1.71-1.085zm-3.34 8.95a8.165 8.165 0 0 1-4.61-1.413l-3.22 1.027 1.043-3.118a8.16 8.16 0 0 1-1.585-4.84c0-4.51 3.685-8.193 8.196-8.193a8.215 8.215 0 0 1 8.193 8.193 8.207 8.207 0 0 1-8.193 8.345zm0-18.044c-5.452 0-9.886 4.434-9.886 9.886 0 1.732.45 3.434 1.317 4.926l-1.4 4.176 4.32-1.378a9.84 9.84 0 0 0 4.65 1.18c5.453 0 9.887-4.434 9.887-9.887 0-2.638-1.03-5.122-2.9-6.99a9.838 9.838 0 0 0-6.987-2.9z"/>
            </svg>
          </a>
          <div
            className="kryd-wa-tip absolute right-[68px] top-1/2 -translate-y-1/2 pointer-events-none whitespace-nowrap"
            style={{
              opacity: 0,
              transform: "translateX(6px) translateY(-50%)",
              background: "rgba(11,45,44,0.95)",
              color: "#fff",
              fontSize: 12,
              padding: "6px 12px",
              borderRadius: 9999,
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            Join the Kryd Community
          </div>
        </div>
      </div>
    </>
  );
}
