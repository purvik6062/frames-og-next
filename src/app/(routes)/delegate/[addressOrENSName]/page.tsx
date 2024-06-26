"use client";
import React from "react";
import {
  processAddressOrEnsName,
  resolveENSProfileImage,
} from "@/app/lib/ENSUtils";
import { NEXT_PUBLIC_URL } from "@/app/lib/utils/constants";
import { getFrameMetadata } from "@coinbase/onchainkit/core";
import { Metadata, ResolvingMetadata } from "next";

// export async function generateMetadata(
//   { params }: { params: { addressOrENSName: string } },
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   // cache ENS address upfront for all subsequent queries
//   // TODO: change subqueries to use react cache
//   const address = params.addressOrENSName;
//   const ensOrTruncatedAddress = await processAddressOrEnsName(
//     params.addressOrENSName
//   );

//   const [avatar] = await Promise.all([
//     resolveENSProfileImage(address || params.addressOrENSName),
//   ]);

//   const statement = "Demo statement";
//   const votingPower = 290000;
//   const tokenSymbol = "OP";
//   const tokenName = "Optimism";

//   const imgParams = [
//     votingPower &&
//       `votes=${encodeURIComponent(`${votingPower} ${tokenSymbol}`)}`,
//     avatar && `avatar=${encodeURIComponent(avatar)}`,
//     statement && `statement=${encodeURIComponent(statement)}`,
//   ];
//   // .filter(Boolean);

//   const preview = `/api/images/og/delegate?${imgParams.join(
//     "&"
//   )}&address=${ensOrTruncatedAddress}`;
//   const title = `${ensOrTruncatedAddress} on Agora`;
//   const description = `See what ${ensOrTruncatedAddress} believes and how they vote on ${tokenName} governance.`;

//   console.log("preview::: ", preview);
//   return {
//     title: title,
//     description: description,
//     openGraph: {
//       images: [
//         {
//           url: preview,
//           width: 1200,
//           height: 630,
//         },
//       ],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title,
//       description,
//     },
//   };
// }

// export async function generateMetadata(): Promise<Metadata> {
//   const name = "DEMO TITLE";

//   const frameMetadata = getFrameMetadata({
//     buttons: [
//       {
//         label: "Check eligibility",
//       },
//     ],
//     image: `${NEXT_PUBLIC_URL}/api/images/og/ogTest`,
//     post_url: `${NEXT_PUBLIC_URL}/api/images/og/ogTest`,
//   });

//   return {
//     title: name,
//     description: "Check if you're eligible for a free mint",
//     openGraph: {
//       title: name,
//       description: "Check if you're eligible for a free mint",
//       images: [`${NEXT_PUBLIC_URL}/api/images/og/ogTest`],
//     },
//     other: {
//       ...frameMetadata,
//       "fc:frame:image:aspect_ratio": "1:1",
//     },
//   };
// }

console.log("check");

function page({ params }: { params: { addressOrENSName: any } }) {
  <div>Hello, {params.addressOrENSName}</div>;
}

export default page;
