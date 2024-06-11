import React from "react";
// import {
//   processAddressOrEnsName,
//   resolveENSProfileImage,
// } from "@/app/lib/ENSUtils";
import { NEXT_PUBLIC_URL } from "@/app/lib/utils/constants";
import { getFrameMetadata } from "@coinbase/onchainkit/core";
import { Metadata, ResolvingMetadata } from "next";
import {
  processAddressOrEnsName,
  resolveENSProfileImage,
} from "@/app/lib/ENSUtils";

export async function generateMetadata({
  params,
}: {
  params: { addressOrENSName: string };
}): Promise<Metadata> {
  const name = "DEMO TITLE";

  const address = params.addressOrENSName;
  const ensOrTruncatedAddress = await processAddressOrEnsName(
    params.addressOrENSName
  );

  const [avatar] = await Promise.all([
    resolveENSProfileImage(address || params.addressOrENSName),
  ]);

  const statement = "Demo statement";
  const votingPower = 290000;
  const tokenSymbol = "OP";
  const tokenName = "Optimism";

  const imgParams = [
    votingPower &&
      `votes=${encodeURIComponent(`${votingPower} ${tokenSymbol}`)}`,
    avatar && `avatar=${encodeURIComponent(avatar)}`,
    statement && `statement=${encodeURIComponent(statement)}`,
  ];
  // .filter(Boolean);

  const preview = `${NEXT_PUBLIC_URL}/api/images/og/ogTest?${imgParams.join(
    "&"
  )}&address=${ensOrTruncatedAddress}`;
  const title = `${ensOrTruncatedAddress} on Agora`;
  const description = `See what ${ensOrTruncatedAddress} believes and how they vote on ${tokenName} governance.`;
  const frameMetadata = getFrameMetadata({
    buttons: [
      {
        label: "Check eligibility",
      },
    ],
    image: preview,
    post_url: preview,
    // image: `${NEXT_PUBLIC_URL}/api/images/og/ogTest`,
    // post_url: `${NEXT_PUBLIC_URL}/api/images/og/ogTest`,
    // image: `${NEXT_PUBLIC_URL}/api/images/og/ogTest`,
    // post_url: `${NEXT_PUBLIC_URL}/api/images/og/ogTest`,
  });

  return {
    title: name,
    description: "Check if you're eligible for a free mint",
    openGraph: {
      title: name,
      description: "Check if you're eligible for a free mint",
      // images: [preview],
      // images: [`${NEXT_PUBLIC_URL}/api/images/og/ogTest`],
      images: [`${NEXT_PUBLIC_URL}/api/images/og/ogTest`],
    },
    other: {
      ...frameMetadata,
      "fc:frame:image:aspect_ratio": "1.91:1",
    },
  };
}

function page({ params }: { params: { addressOrENSName: string } }) {
  return <div>{params.addressOrENSName}</div>;
}

export default page;
