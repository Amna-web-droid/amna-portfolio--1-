// Fallback data — only shown if Supabase isn't connected yet.
// Once connected, everything here is managed from /admin instead.

export const journeyBooks = [
  {
    id: "sample-react",
    title: "React",
    icon: "⚛️",
    concepts: [
      {
        title: "Started this notebook",
        note: "First entry — from here on, concepts get added from /admin.",
        code: null,
        language: null,
      },
    ],
  },
];
