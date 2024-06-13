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
  const name = "Chora Club";

  const address = params.addressOrENSName;
  const ensOrTruncatedAddress = await processAddressOrEnsName(
    params.addressOrENSName
  );

  const [avatar] = await Promise.all([
    resolveENSProfileImage(address || params.addressOrENSName),
  ]);

  const dao_name = "Arbitrum";
  const votingPower = 290000;
  const tokenSymbol = "OP";
  const tokenName = "Optimism";

  const imgParams = [
    votingPower &&
      `votes=${encodeURIComponent(`${votingPower} ${tokenSymbol}`)}`,
    avatar && `avatar=${encodeURIComponent(avatar)}`,
    dao_name && `dao_name=${encodeURIComponent(dao_name)}`,
  ];
  // .filter(Boolean);

  const preview = `${NEXT_PUBLIC_URL}/api/images/og/ccTest?${imgParams.join(
    "&"
  )}&address=${ensOrTruncatedAddress}`;
  const title = `${ensOrTruncatedAddress} on Agora`;
  const description = `See what ${ensOrTruncatedAddress} believes and how they vote on ${tokenName} governance.`;
  const frameMetadata = getFrameMetadata({
    buttons: [
      {
        label: "Go to app",
        action: "link",
        target: `https://app.chora.club/`,
      },
      {
        label: "Delegate",
        action: "tx",
        target: `https://farcaster-frames-ivory.vercel.app/api/transaction`,
      },
    ],
    image: preview,
    post_url: preview,
  });

  return {
    title: name,
    description: "Check if you're eligible for a free mint",
    openGraph: {
      title: name,
      description: "Check if you're eligible for a free mint",
      images: [preview],
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
