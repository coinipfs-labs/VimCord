'use client'

import { SessionType, useSession } from "@lens-protocol/react-web";
import { useAccount as useWagmiAccount } from "wagmi";
import { config } from "@/config/Wagmi";
import { Button } from "@nextui-org/react";
import LoginForm from "@/app/Login/LoginForm";
import { LogoutButton } from "@/app/Login/LogoutButton";
import { DisconnectWalletButton } from "@/app/Login/DisconnectWalletButton";
import { truncateEthAddress } from "@/utils/truncateEthAddress";
import ThemeButton from "@/components/ThemeButton";
import ConnectWalletButton from "@/app/Login/ConnectWalletButton";



export function WelcomeToLens() {
    const { isConnected, address } = useWagmiAccount({ config });
    const { data } = useSession();

    return (
        <div className=" flex justify-center items-center">
            <div className=" gap-14 w-[50vw] sm:w-[100vw] m-2">

                {!isConnected && (
                    <div className="flex flex-col justify-center items-center">
                        <p className="mb-4">连接您的钱包</p>
                        <ConnectWalletButton />
                    </div>
                )}

                {!data?.authenticated && address && (
                    <>
                        <p className="">当前连接的钱包: </p>
                        <div className="mt-2 mb-16 flex-row flex justify-between items-center">
                            <Button>{truncateEthAddress(address)}</Button>
                            <DisconnectWalletButton />
                        </div>

                        <LoginForm owner={address} />
                    </>
                )}
                {data && data.type === SessionType.WithProfile && (
                    <>
                        <p className="">当前登入的Lens账号 </p>
                        <div className="mt-2  flex-row flex justify-between items-center">
                            <Button variant="ghost" disableRipple className=" text-primary font-semibold">{data.profile.handle?.fullHandle ?? data.profile.id}
                            </Button>
                            <LogoutButton />
                        </div>
                    </>
                )}

            </div>
        </div>

    );
}
