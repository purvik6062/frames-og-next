import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";
import Image from "next/image";
import profile from "@/app/api/images/og/assets/profile-img.png";
import texture from "@/app/api/images/og/assets/meta2.png";
export const revalidate = 0;

export const runtime = "edge";

const size = {
  width: 1200,
  height: 630,
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const address = searchParams.get("address") || "";
  const votes = searchParams.get("votes") || "";
  const avatar = searchParams.get("avatar") || "";
  const dao_name = searchParams.get("dao_name") || "";

  const interSemiBold = fetch(
    new URL("../assets/Inter-Bold.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const bg = await fetch(
    new URL("../assets/main-bg.png", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const profile = await fetch(
    new URL("../assets/profile-img.png", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const texture = await fetch(
    new URL("../assets/meta2.png", import.meta.url)
  ).then((res) => res.arrayBuffer());

  console.log(
    "URL.createObjectURL(new Blob([profile]))::",
    URL.createObjectURL(new Blob([profile]))
  );
  const [fontData, profileImage, textureImage] = await Promise.all([
    interSemiBold,
    profile,
    texture,
  ]);

  console.log(fontData, profileImage, textureImage);

  return new ImageResponse(
    (
      <div
        tw="bg-cover h-full"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          //   padding: "100px 180px",
        }}
      >
        <img
          /*@ts-ignore */
          src={bg}
          style={{ position: "absolute", padding: "100px 180px" }}
          tw="bg-cover h-full"
          alt="background"
        />
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.74)",
            borderRadius: "78px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "40px",
            margin: "20px 40px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: "10px",
            }}
          >
            <div style={{ display: "flex" }}>
              <img
                /*@ts-ignore */
                src={profile}
                alt="Profile"
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                }}
              />
            </div>
            <div style={{ textAlign: "left", display: "flex" }}>
              <div
                style={{
                  color: "black",
                  fontSize: "60px",
                  marginBottom: "10px",
                  display: "flex",
                }}
              >
                You are invited to delegate your Voting Power on
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <div
                  style={{
                    padding: "10px 20px",
                    borderRadius: "9999px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#0500FF",
                    color: "white",
                    fontSize: "35px",
                  }}
                >
                  {dao_name}
                </div>
                <span
                  style={{
                    display: "flex",
                    alignSelf: "center",
                    color: "black",
                    fontSize: "40px",
                  }}
                >
                  to
                </span>
                <div
                  style={{
                    padding: "10px 20px",
                    borderRadius: "9999px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#0500FF",
                    color: "white",
                    fontSize: "35px",
                  }}
                >
                  {address}
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <img
              /*@ts-ignore*/
              src={texture}
              alt="Chora Club"
              style={{
                borderRadius: "60px",
                height: "100%",
              }}
            />
          </div>
        </div>
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
