import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";
export const revalidate = 0;

export const runtime = "edge";

const size = {
  width: 1200,
  height: 630,
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  // const address = "addr";
  // const votes = "votes";
  // const avatar = "avtr";
  // const statement = "stmt";

  const address = searchParams.get("address") || "";
  const votes = searchParams.get("votes") || "";
  const avatar = searchParams.get("avatar") || "";
  const statement = searchParams.get("statement") || "";

  const interSemiBold = fetch(
    new URL("../assets/Inter-Bold.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ fontSize: 50, fontWeight: 700 }}>
          {address ? address : "Hello"}
        </div>
        {/* <div style={{ fontSize: 48 }}>{votes}</div>*/}
        {/* <div style={{ fontSize: 36, textAlign: "center" }}>{statement}</div> */}
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: await interSemiBold,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);

//   const address = "addr";
//   const votes = "votes";
//   const avatar = "avtr";
//   const statement = "stmt";
//   // const address = searchParams.get("address") || "";
//   // const votes = searchParams.get("votes") || "";
//   // const avatar = searchParams.get("avatar") || "";
//   // const statement = searchParams.get("statement") || "";

//   const interSemiBold = fetch(
//     new URL("../assets/Inter-Bold.ttf", import.meta.url)
//   ).then((res) => res.arrayBuffer());

//   return new ImageResponse(
//     (
//       <div
//         style={{
//           fontSize: 128,
//           background: "white",
//           width: "100%",
//           height: "100%",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <img
//           src={avatar}
//           alt="Profile Avatar"
//           style={{ width: 128, height: 128, borderRadius: "50%" }}
//         />
//         <div style={{ fontSize: 60, fontWeight: 700 }}>{address}</div>
//         <div style={{ fontSize: 48 }}>{votes}</div>
//         <div style={{ fontSize: 36, textAlign: "center" }}>{statement}</div>
//       </div>
//     ),
//     {
//       ...size,
//       fonts: [
//         {
//           name: "Inter",
//           data: await interSemiBold,
//           style: "normal",
//           weight: 400,
//         },
//       ],
//     }
//   );
// }
