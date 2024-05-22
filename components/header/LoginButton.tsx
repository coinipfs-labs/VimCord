'use client'
import { SessionType, useSession, useProfile, useLogout, } from "@lens-protocol/react-web";
import { useAccount, useDisconnect } from "wagmi";
import { config } from "@/config/Wagmi";
import { useRouter } from "next/navigation";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Link, Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, User } from "@nextui-org/react";
import { WelcomeToLens } from "@/app/Login/WelcomeToLens";
import ThemeButton from "../ThemeButton";
import { LogoutButton } from "../../app/Login/LogoutButton";



export function LoginButton() {
    const router = useRouter();
    const { isConnected, address } = useAccount({ config });
    const { data } = useSession();



    if (!isConnected) {
        return (
            <>
                <Button color="primary" radius="sm" onClick={() => router.push(`/Signup`)}>注册</Button>
                <Button color="primary" radius="sm" onClick={() => router.push(`/Login`)} >登入</Button>

            </>
        );
    }






    // step 3. show Profile details
    if (data && data.type === SessionType.WithProfile) {

        return (
            <>
                <Dropdown
                    showArrow
                    radius="sm"
                    classNames={{
                        base: "before:bg-default-200", // change arrow background
                        content: "p-0 border-small border-divider bg-background",
                    }}
                >
                    <DropdownTrigger>
                        <Button variant="ghost" disableRipple className=" text-primary font-semibold">
                        下拉菜单栏
{/*                             <User
                                name="Jane Doe"
                                description={data.profile.handle?.fullHandle ?? data.profile.id}
                                avatarProps={{
                                    src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
                                }}
                            /> */}
                        </Button>
                    </DropdownTrigger>

                    <DropdownMenu
                        aria-label="Custom item styles"
                        disabledKeys={["profile"]}
                        className="p-3"
                        itemClasses={{
                            base: [
                                "rounded-md",
                                "text-default-500",
                                "transition-opacity",
                                "data-[hover=true]:text-foreground",
                                "data-[hover=true]:bg-default-100",
                                "dark:data-[hover=true]:bg-default-50",
                                "data-[selectable=true]:focus:bg-default-50",
                                "data-[pressed=true]:opacity-70",
                                "data-[focus-visible=true]:ring-default-500",
                            ],
                        }}
                    >
                        <DropdownSection aria-label="Profile & Actions" showDivider>

                            <DropdownItem key="dashboard" className="h-14 gap-2 opacity-100">
                                <User
                                    name="Junior Garcia"
                                    description={data.profile.handle?.fullHandle ?? data.profile.id}
                                    classNames={{
                                        name: "text-default-600",
                                        description: "text-default-500",
                                    }}
                                    avatarProps={{
                                        size: "sm",
                                        src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                                    }}
                                />
                            </DropdownItem>
                            <DropdownItem key="settings">设置</DropdownItem>
                        </DropdownSection>

                        <DropdownSection aria-label="Preferences" showDivider>
                            <DropdownItem key="quick_search" shortcut="⌘K">
                                快速搜索
                            </DropdownItem>
                            {/*  <ThemeButton /> */}
                        </DropdownSection>

                        <DropdownSection aria-label="Help & Feedback">
                            <DropdownItem key="help_and_feedback">
                                帮助和反馈
                            </DropdownItem>
                            <DropdownItem key="logout" /* onPress={} */>注销Lens</DropdownItem>
                        </DropdownSection>
                    </DropdownMenu>
                </Dropdown>


            </>
        );
    }

    return (
        <></>
    );
}
