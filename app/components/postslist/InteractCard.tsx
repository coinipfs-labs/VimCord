'use client'
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { RiChat1Line, RiHeart3Line, RiRepeat2Line, RiShieldCheckLine } from "react-icons/ri";

export default function interactCard({ dataname }) {
  const router = useRouter();
  return (
    <div>
      {/* interactCard */}
      <div className='max-w-[50%] sm:max-w-[100vw] justify-around flex items-center '>
        <Motion>
          <button className="rounded-full caret-stone-300" onClick={() => router.push(`/${dataname.by.handle.localName}.lens/posts/${dataname.id}`)} >
            <RiChat1Line className="size-5 " />
            {dataname.stats.comments}
          </button>
        </Motion>

        <Motion>
          <button className="rounded-full caret-stone-300"  >
            <RiHeart3Line className="size-5" />{/* RiHeart3Fill  */}
            {dataname.stats.upvotes}
          </button>
        </Motion>

        <Motion>
          <button className="rounded-full caret-stone-300"  >
            <RiRepeat2Line className="size-5" />
            {dataname.stats.mirrors}
          </button>
        </Motion>

        <Motion>
          <button className="rounded-full caret-stone-300"  >
            <RiShieldCheckLine className="size-5" />
            {dataname.stats.collects}
          </button>
        </Motion>

      </div>
    </div>
  )
}

function Motion({children}) {
  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>{children}</motion.div>
  )
}