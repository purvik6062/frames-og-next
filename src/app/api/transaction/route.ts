import { NextRequest, NextResponse } from "next/server";
import {
  FrameRequest,
  FrameValidationData,
  getFrameMessage,
} from "@coinbase/onchainkit/frame";
import token_abi from "@/GovernanceToken.json";
import { ethers } from "ethers";
import type { FrameTransactionResponse } from '@coinbase/onchainkit/frame';

export async function POST(req: NextRequest, res: NextResponse) {
  console.log("Request received:", req.method);

  if (req.method !== "POST") {
    console.log("Invalid method:", req.method);
    return NextResponse.json(
      { success: false, error: "Invalid Method" },
      { status: 400 }
    );
  }

  try {
    const getFarcasterAccountAddress = (
      interactor: FrameValidationData["interactor"]
    ) => {
      const address =
        interactor.verified_accounts[0] ?? interactor.custody_address;
      console.log("Farcaster Account Address:", address);
      return address;
    };

    try {
      const body = (await req.json()) as FrameRequest;
      const { isValid, message } = await getFrameMessage(body);
      console.log("Frame message validation:", isValid);

      if (!isValid) {
        console.error("Message is invalid:", message);
        return NextResponse.json(
          { success: false, error: "Invalid Frame Message" },
          { status: 400 }
        );
      }

      // Get the account address
      const accountAddress = getFarcasterAccountAddress(message.interactor);
      console.log("Account Address:", accountAddress);

      const encodeData = async (address: string) => {
        const contractInterface = new ethers.Interface(token_abi.abi);
        const encodedData = contractInterface.encodeFunctionData("delegate", [
          address,
        ]);
        console.log("Encoded Data:", encodedData);
        return encodedData;
      };

      const data = await encodeData(accountAddress);
      console.log("Data for transaction:", data);

      const documents = {
        chainId: "eip155:42161",
        method: "eth_sendTransaction",
        params: {
          abi: token_abi,
          to: "0x912ce59144191c1204e64559fe8253a0e49e6548",
          data: data,
          value: "0",
        },
      };

      // Return the transaction frame
      return NextResponse.json(
        { success: true, data: documents },
        { status: 200 }
      );
    } catch (innerError: any) {
      console.error("Error inside processing logic:", innerError.message);
      return NextResponse.json(
        {
          success: false,
          message: "Internal Server Error",
          error: innerError.message,
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Error in handler:", error.message);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
