import { Avatar } from "@nextui-org/react";

export default function Avatarimg({dataname}) {
    return <Avatar src={dataname.by?.metadata?.picture?.optimized?.uri} alt={dataname.by.handle.localName} onClick={() => window.open(`/${dataname.by.handle.localName}.lens`)} />
}