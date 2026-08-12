export default function manifest() {
  return {
    name: "Amna Mushtaq — MERN Stack Developer",
    short_name: "Amna Mushtaq",
    description: "A notebook of projects, designs, and things learned along the way.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F5EE",
    theme_color: "#1C2541",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
