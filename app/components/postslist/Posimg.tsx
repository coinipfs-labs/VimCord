import Image from "next/image"

export default function Posimg({src}) {
    return (
        <>
            <img
                className={` max-w-[400px] h-auto sm:max-w-[100%] sm:h-auto mt-1 mb-3  sm:rounded-none  rounded-2xl object-cover`}
                src={src}
                alt={src}
            />

        </>
    )
}