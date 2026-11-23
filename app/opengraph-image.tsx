import { ImageResponse } from "next/og";

export const alt = "Shanyraq — строительный магазин в Караоткеле";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Превью для WhatsApp и соцсетей: знак, надпись красным, адрес. Плоский, без градиентов. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          <div
            style={{
              width: 150,
              height: 150,
              borderRadius: 22,
              background: "#1D5FA8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 102,
                height: 102,
                borderRadius: 51,
                background: "#ffffff",
              }}
            />
          </div>
          <div style={{ display: "flex", fontSize: 104, fontWeight: 900, color: "#C8102E", letterSpacing: 2 }}>
            SHANYRAQ
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", fontSize: 50, fontWeight: 700, color: "#1C1B1A" }}>
            Стройматериалы и сантехника в Караоткеле
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#6B6B6B" }}>
            Ежедневно 09:00–19:00 · ул. Акан Серы, 123 · WhatsApp +7 771 417 95 27
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
