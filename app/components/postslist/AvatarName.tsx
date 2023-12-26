import { useRouter } from "next/navigation"

export default function AvatarName({ dataname }) {
    const router = useRouter()
    return (
        <>
            <div className="sm:ml-3 ml-4">

                <h2 className=" font-medium leading-none " onClick={() => router.push(`/${dataname.by.handle.localName}.lens`)}>{dataname.by.metadata?.displayName}</h2>

                <p className="mb-1  text-[#878787]" onClick={() => router.push(`/${dataname.by.handle.localName}.lens`)}>{dataname.by.handle.localName}.{dataname.by.handle.namespace}</p>

            </div>

        </>
    )
}