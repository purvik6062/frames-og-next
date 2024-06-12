export const NEXT_PUBLIC_URL =
  // "https://4093-2401-4900-1c80-3988-9df5-120c-d22b-8775.ngrok-free.app";
  process.env.NODE_ENV == "development"
    ? "http://localhost:3000"
    : "https://frames-og-next.vercel.app";
