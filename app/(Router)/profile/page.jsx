"use client";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { useAccount, useSignMessage } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useProfiles } from "@lens-protocol/react-web";
import { disconnect } from "@wagmi/core";
export default function ProfileWrapper() {
  const { open } = useWeb3Modal();

  const { address, isConnecting, isDisconnected } = useAccount();
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: "Connect VimCord Dapp",
  });

  if (isConnecting) return <div> 正在连接… </div>;
  if (isDisconnected) return <div>已断开连接</div>;
  if (!address) {
    return <>未连接</>;
  }

  return (
    <div className=''>
      {/* <Profile address={address} /> */}
      
      如果已连接没有显示账户信息，说明您暂未加入镜头协议
      <div>
      <p>连接账户：{address}</p>
        <Button
          disabled={isLoading}
          onClick={() => signMessage()}
          color='primary'>
          签名同意登入
        </Button>
        {isSuccess && <p>签名数据：{data}</p>}
        {isError && <p>签名消息出错</p>}
      </div>
    </div>
  );
}

function Profile({ address }) {
  const { data } = useProfiles({
    where: {
      ownedBy: [address],
    },
  });

  if (!data || !data.length) return null;
  const profile = data[data.length - 1];
  if (!profile) return null;

  return (
    <main className='px-10 py-14'>
      <div>
        <a
          rel='no-opener'
          target='_blank'
          href={`https://share.lens.xyz/u/${profile.handle?.localName}.${profile.handle?.namespace}`}>
          <div className='border rounded-lg p-10'>
            <div>
              {profile.metadata?.picture?.__typename === "ImageSet" && (
                <img
                  src={profile?.metadata?.picture?.optimized?.uri}
                  className='rounded w-[200px]'
                  alt='user profile picture'
                />
              )}
            </div>
            <div className='mt-4'>
              <p className='text-lg'>{profile?.metadata?.displayName}</p>
              <p className='text-muted-foreground font-medium'>
                {profile?.handle?.localName}.{profile?.handle?.namespace}
              </p>
            </div>
          </div>
        </a>
      </div>
    </main>
  );
}
