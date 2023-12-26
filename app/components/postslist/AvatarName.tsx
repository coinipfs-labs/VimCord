export default function AvatarName({ dataname }) {
    return (
        <>
            <div className="sm:ml-3 ml-4">

                <h2 className=" font-medium leading-none " onClick={() => window.open(`/${dataname.by.handle.localName}.lens`)}>{dataname.by.metadata?.displayName}</h2>

                <p className="mb-1  text-[#878787]" onClick={() => window.open(`/${dataname.by.handle.localName}.lens`)}>{dataname.by.handle.localName}.{dataname.by.handle.namespace}</p>

            </div>

        </>
    )
}