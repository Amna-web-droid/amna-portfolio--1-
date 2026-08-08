import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Amna Mushtaq — MERN Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#F7F5EE",
          backgroundImage:
            "linear-gradient(#1C254112 1px, transparent 1px), linear-gradient(90deg, #1C254112 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "#B14444",
            fontSize: 22,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: 3,
            marginBottom: 24,
          }}
        >
          MERN Stack Developer
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#1C2541",
            lineHeight: 1.05,
            display: "flex",
          }}
        >
          Amna Mushtaq
        </div>
        <div
          style={{
            fontSize: 34,
            color: "#1C2541",
            fontStyle: "italic",
            marginTop: 8,
            display: "flex",
          }}
        >
          a notebook of things she builds
        </div>
        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 48,
          }}
        >
          {["React", "Next.js", "Supabase", "Tailwind"].map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                fontSize: 20,
                padding: "8px 18px",
                border: "2px solid #1C2541",
                borderRadius: 999,
                color: "#1C2541",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
