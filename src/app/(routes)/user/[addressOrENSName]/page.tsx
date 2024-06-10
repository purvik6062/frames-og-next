import React from "react";
// import {
//   processAddressOrEnsName,
//   resolveENSProfileImage,
// } from "@/app/lib/ENSUtils";
import { NEXT_PUBLIC_URL } from "@/app/lib/utils/constants";
import { getFrameMetadata } from "@coinbase/onchainkit/core";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const name = "DEMO TITLE";

  const frameMetadata = getFrameMetadata({
    buttons: [
      {
        label: "Check eligibility",
      },
    ],
    image: `${NEXT_PUBLIC_URL}/api/images/og/ogTest`,
    post_url: `${NEXT_PUBLIC_URL}/api/images/og/ogTest`,
  });

  return {
    title: name,
    description: "Check if you're eligible for a free mint",
    openGraph: {
      title: name,
      description: "Check if you're eligible for a free mint",
      images: [`${NEXT_PUBLIC_URL}/api/images/og/ogTest`],
    },
    other: {
      ...frameMetadata,
      "fc:frame:image:aspect_ratio": "1:1",
    },
  };
}

function page() {
  return <div>page</div>;
}

export default page;
