import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";
import Image from "next/image";
import profile from "@/app/api/images/og/assets/profile-img.png";
import texture from "@/app/api/images/og/assets/meta2.png";
import main from "@/app/api/images/og/assets/main.jpg";

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

  //   const interSemiBold = fetch(
  //     new URL("../assets/Inter-Bold.ttf", import.meta.url)
  //   ).then((res) => res.arrayBuffer());

  const main = await fetch(new URL("../assets/main.jpg", import.meta.url)).then(
    (res) => res.arrayBuffer()
  );

  //   const profile = await fetch(
  //     new URL("../assets/profile-img.png", import.meta.url)
  //   ).then((res) => res.arrayBuffer());

  //   const texture = await fetch(
  //     new URL("../assets/meta2.jpg", import.meta.url)
  //   ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
        }}
      >
        <img
          /*@ts-ignore*/
          src={main}
          style={{
            position: "absolute",
            zIndex: -1,
          }}
          alt="background"
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingTop: "10%",
            paddingLeft: "17%",
          }}
        >
          <div style={{ display: "flex" }}>
            <img
              /*@ts-ignore */
              //   src={profile}
              src="https://gateway.lighthouse.storage/ipfs/QmUsAYs3PwJoetYko6iDN36t43W9xWXYFCjAk1ahq9CBfA"
              alt="Profile"
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
              }}
            />
          </div>
          <div
            style={{
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              width: "400px",
              fontWeight: 600,
            }}
          >
            <div
              style={{
                color: "black",
                fontSize: "32px",
                paddingTop: "30px",
                paddingBottom: "30px",
                display: "flex",
              }}
            >
              You are invited to delegate your Voting Power on
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <div
                style={{
                  padding: "10px 30px",
                  borderRadius: "9999px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#0500FF",
                  color: "white",
                  fontSize: "28px",
                }}
              >
                {dao_name}
              </div>
              <div
                style={{
                  display: "flex",
                  alignSelf: "center",
                  color: "black",
                  fontSize: "30px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
              >
                to
              </div>
              <div
                style={{
                  padding: "10px 30px",
                  borderRadius: "9999px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#0500FF",
                  color: "white",
                  fontSize: "28px",
                }}
              >
                {address}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
