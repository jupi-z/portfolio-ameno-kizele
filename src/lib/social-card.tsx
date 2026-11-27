import { ImageResponse } from "next/og";

export const socialImageSize = { width: 1200, height: 630 };

export function createSocialCard() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        padding: 58,
        background: "#f1f3f5",
        color: "#14171c",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "stretch",
          justifyContent: "space-between",
          padding: 46,
          borderRadius: 34,
          background: "#fff",
          border: "1px solid #dce0e5",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 720 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 24, fontWeight: 700 }}>
            <span style={{ display: "flex", width: 54, height: 54, alignItems: "center", justifyContent: "center", borderRadius: 16, background: "#14171c", color: "#fff", fontSize: 23 }}>AK</span>
            <span>AMENO KIZELE MWINE</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", color: "#285ce6", fontSize: 25, fontWeight: 700, letterSpacing: 3 }}>SOFTWARE ENGINEER · RDC</div>
            <div style={{ display: "flex", flexDirection: "column", fontSize: 64, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2 }}>
              <span>Du métier au</span>
              <span>logiciel.</span>
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#616872" }}>API · Web · Android · Systèmes métier</div>
        </div>
        <div style={{ width: 250, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 28, borderRadius: 26, background: "#285ce6", color: "#fff" }}>
          <span style={{ display: "flex", fontSize: 16, letterSpacing: 2 }}>PORTFOLIO</span>
          <span style={{ display: "flex", fontSize: 26, fontWeight: 700 }}>Kolwezi<br />Lubumbashi<br />RDC</span>
          <span style={{ display: "flex", width: 26, height: 26, borderRadius: 999, background: "#f4864b" }} />
        </div>
      </div>
    </div>,
    socialImageSize,
  );
}
