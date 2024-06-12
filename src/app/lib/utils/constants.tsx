export const NEXT_PUBLIC_URL =
  // "https://my-app-virid-eight.vercel.app";
  process.env.NODE_ENV == "development"
    ? "http://localhost:3000"
    : "https://frames-og-next.vercel.app";
