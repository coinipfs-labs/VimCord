export default function AvatarName({dataname}) {
    return (
        <>
            <div className="sm:ml-3 ml-4">
                <h3 className="mb-1 font-medium leading-none caret-zinc-400" onClick={() => window.open(`/${dataname.by.handle.localName}.lens`)}>{dataname.by.handle.localName}.{dataname.by.handle.namespace}</h3>
                <p className="text-xs text-muted-foreground" onClick={() => window.open(`/${dataname.by.handle.localName}.lens`)}>{dataname.by.metadata?.displayName}</p>
            </div>

        </>
    )
}