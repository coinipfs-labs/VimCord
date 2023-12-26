import { Avatar } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Avatarimg({ dataname }) {
    const router = useRouter()
    return <Avatar src={dataname.by?.metadata?.picture?.optimized?.uri} alt={dataname.by.handle.localName} onClick={() => router.push(`/${dataname.by.handle.localName}.lens`)} />
}