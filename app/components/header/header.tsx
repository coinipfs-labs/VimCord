"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./header.css";
import ThemeButton from "../ThemeButton";
import { motion } from "framer-motion";
import {
    Navbar,
    NavbarBrand,
    NavbarMenuToggle,
    NavbarMenuItem,
    NavbarMenu,
    NavbarContent,
    NavbarItem,
    Input,
    Button,
} from "@nextui-org/react";
import { GoSearch } from "react-icons/go";

export default function Header() {
    const pathname = usePathname();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <>
            <Navbar
                isBordered={false}
                isBlurred={false}
                isMenuOpen={isMenuOpen}
                onMenuOpenChange={setIsMenuOpen}
                maxWidth={"2xl"}
                height='56px'
                className="sm:hidden flex Navbar_border">
                {/* 左 */}
                <NavbarContent justify="start">
                    {/* 手机 */}
                    <NavbarBrand className='sm:hidden flex'>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Image
                                src='/favicon.ico'
                                width={40}
                                height={40}
                                className='Home_QianCset'
                                alt='Q'
                            />
                        </motion.div>
                    </NavbarBrand>
                </NavbarContent>

                {/* 中 */}
                <NavbarContent className='sm:hidden flex gap-4 md:gap-2' justify="center">
                    <NavbarItem>
                        <Link
                            href='/'
                            className={`header_link ${pathname === "/" ? "active" : ""
                                }`}>
                            Home
                        </Link>
                    </NavbarItem>

                    <NavbarItem>
                        <Link
                            href='/find'
                            className={`header_link ${pathname && pathname.startsWith("/find") ? "active" : ""
                                }`}>
                            Find
                        </Link>
                    </NavbarItem>

                    <NavbarItem>
                        <Link
                            href='/message'
                            className={`header_link ${pathname && pathname.startsWith("/message") ? "active" : ""
                                }`}>
                            Message
                        </Link>
                    </NavbarItem>

                    <NavbarItem>
                        <Link
                            href='/profile'
                            className={`header_link ${pathname && pathname.startsWith("/profile") ? "active" : ""
                                }`}>
                            Profile
                        </Link>
                    </NavbarItem>
                </NavbarContent>

                {/* 右 */}
                <NavbarContent justify='end'>
                    <NavbarContent className='md:hidden flex gap-4' justify='end'>
                        <Input
                            classNames={{
                                base: "md:max-w-full max-w-[10rem] h-10",
                                mainWrapper: "h-full",
                                input: "text-small",
                                inputWrapper:
                                    "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                            }}
                            placeholder='搜索'
                            size='sm'
                            startContent={<GoSearch size={18} />}
                            type='search'
                        />
                    </NavbarContent>

                    <w3m-button balance={'hide'} label='Connect' />
                </NavbarContent>
            </Navbar>





            {["/find", "/message", "/profile"].includes(pathname) ? (
                <Navbar
                    isBordered={false}
                    isBlurred={false}
                    isMenuOpen={isMenuOpen}
                    onMenuOpenChange={setIsMenuOpen}
                    className="sm:flex hidden Navbar_border"
                    height="56px"
                >
                    <NavbarContent>
                        {pathname === "/find" && <Find />}
                        {pathname === "/message" && <Message />}
                        {pathname && pathname.startsWith("/profile") && null}
                        {pathname === "/profile" && <Profile />}
                        {pathname === `/@` && <Users />}
                    </NavbarContent>
                </Navbar>
            ) : null}




        </>)
}
function Users() {
    return (
        <>
            <NavbarContent justify="center">Users </NavbarContent>
        </>
    )
}
function Find() {
    return (
        <>
            <NavbarContent justify="center">Find </NavbarContent>
        </>
    )
}

function Message() {

    return (
        <>
            <NavbarBrand>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Image
                        src='/favicon.ico'
                        width={40}
                        height={40}
                        className='Home_QianCset'
                        alt='Q'
                    />
                </motion.div>
            </NavbarBrand>

            <NavbarContent justify="center">Message </NavbarContent>

            <NavbarContent justify='end'>
                <GoSearch size={18} />
            </NavbarContent>
        </>
    );
}

function Profile() {
    return (
        <>
            <NavbarBrand>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Image
                        src='/favicon.ico'
                        width={40}
                        height={40}
                        className='Home_QianCset'
                        alt='Q'
                    />
                </motion.div>
            </NavbarBrand>

            <NavbarContent justify="center"> </NavbarContent>

            <NavbarContent justify='end'>
                {/* <w3m-connect-button size='sm' label='Connect'/> */} <w3m-network-button />
                <w3m-button balance={'hide'} label='Connect' size='md' />
            </NavbarContent>
        </>
    )
}