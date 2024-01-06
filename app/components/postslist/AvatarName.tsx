import { useRouter } from "next/navigation"

export default function AvatarName({ dataname }) {
    const router = useRouter()
    return (
        <>
            <div className="sm:ml-3 ml-4">

                <b  onClick={() => router.push(`/${dataname.by.handle.localName}.lens`)}>{dataname.by.metadata?.displayName}</b>

                <p className=" text-[#878787]" onClick={() => router.push(`/${dataname.by.handle.localName}.lens`)}>{dataname.by.handle.localName}.{dataname.by.handle.namespace}</p>

            </div>

        </>
    )
}