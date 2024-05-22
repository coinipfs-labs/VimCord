'use client'
import { Avatar } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Motion from '@/components/Motion'
import Link from "next/link";

export default function Avatarimg({ dataname }) {
    const router = useRouter()
    return (
        <Motion>
            <Link href={`/${dataname.by.handle.localName}.lens`}>
                <Avatar src={dataname.by?.metadata?.picture?.optimized?.uri} alt={dataname.by.handle.localName} /* onClick={() => router.push(`/${dataname.by.handle.localName}.lens`)}  */ />
            </Link>
        </Motion>
    )
}