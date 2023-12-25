"use client";
import { Button } from "@nextui-org/react";
import { useWeb3Modal,useDisconnect } from "@web3modal/wagmi/react";
import { getAccount } from "@wagmi/core";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
export default function sin() {
  const { open } = useWeb3Modal();
  const { address } = getAccount();
/*   const { disconnect } = useDisconnect() */
  const router = useRouter();
  const handleConnectWallet = async () => {
    await open();
    router.push("/profile");
  };
  return (
    <>
      <h1>sin</h1>
      {!address && (
        <div>

        <Button
          onClick={handleConnectWallet}
          variant='secondary'
          className='mr-4'>
          Connect Wallet
        </Button>
          </div>
      )}
      {address && (
        <div>

        <Button onClick={useDisconnect} variant='secondary' className='mr-4'>
          Disconnect
        </Button>
        </div>
      )}
    </>
  );
}
