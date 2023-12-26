import { RiChat1Line, RiHeart3Line, RiRepeat2Line, RiShieldCheckLine } from "react-icons/ri";

export default function interactCard({dataname}) {
  return (
    <div>
        {/* interactCard */}
        <div className='max-w-[50%] sm:max-w-[100vw] justify-around flex items-center '>
                <button className="rounded-full caret-stone-300" onClick={() => window.open(`/${dataname.by.handle.localName}.lens/posts/${dataname.id}`)} >
                  <RiChat1Line className="size-5 " />
                  {dataname.stats.comments}
                </button>

                <button className="rounded-full caret-stone-300"  >
                  <RiHeart3Line className="size-5" />{/* RiHeart3Fill  */}
                  {dataname.stats.upvotes}
                </button>

                <button className="rounded-full caret-stone-300"  >
                  <RiRepeat2Line className="size-5" />
                  {dataname.stats.mirrors}
                </button>

                <button className="rounded-full caret-stone-300"  >
                  <RiShieldCheckLine className="size-5" />
                  {dataname.stats.collects}
                </button>
              </div>
    </div>
  )
}