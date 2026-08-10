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
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
