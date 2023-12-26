"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import { usePathname, } from 'next/navigation'
import "./Navbar.css";
import { getAccount } from "@wagmi/core";
import { GoHome, GoHomeFill, GoHeart, GoHeartFill, GoBell, GoBellFill, GoPerson, GoPersonFill, GoSignIn } from "react-icons/go";
import { AiOutlineMessage, AiFillMessage, AiOutlineAppstore, AiFillAppstore } from "react-icons/ai";
import { RiApps2Fill, RiApps2Line, RiHome5Fill, RiHome5Line, RiMessage2Fill, RiMessage2Line, RiMessage3Fill, RiMessage3Line, RiUserFill, RiUserLine } from "react-icons/ri";





export default function Navbar() {
  const { address } = getAccount();
  const pathname = usePathname();

  return (
    <>

      <div className='Navbar'>


        <NavLink
          href='/'
          activeHrefs={['/',"/article","/image","/music","/video",]}
          icon={<RiHome5Line className="Navicon" />}
          activeIcon={<RiHome5Fill className="Navicon" />}
        />

        <NavLink
          href='/find'
          activeHrefs={['/find']}
          icon={<RiApps2Line className="Navicon" />}
          activeIcon={<RiApps2Fill className="Navicon" />}
        />

        <NavLink
          href='/message'
          activeHrefs={['/message']}
          icon={<RiMessage2Line className="Navicon" />}
          activeIcon={<RiMessage2Fill className="Navicon" />}
        />

 {/*        {address ? ( */}
          <NavLink
            href={`/profile`}
            activeHrefs={[`/profile`]}
            icon={<RiUserLine className="Navicon" />}
            activeIcon={<RiUserFill className="Navicon" />}
          />

{/*         ) : (

          <NavLink
            href={`/profile/sin`}
            activeHrefs={[`/profile/sin`]}
            icon={<RiUserLine className="Navicon" />}
            activeIcon={<RiUserFill className="Navicon" />}
          />
        )}
 */}


      </div>

    </>
  );
}


function NavLink({ href, activeIcon, icon, activeHrefs }) {
  const pathname = usePathname();
  const className = `nav_link ${activeHrefs.includes(pathname) ? 'active' : ''}`

  return (
    <div className="Link">

      <Link
        className={className}
        href={href}
        prefetch={true} passHref
      >


        <div className="NavLink-container">


          <div className="NavLink-left">
            {activeHrefs.includes(pathname) ? activeIcon : icon}
          </div>




        </div>

      </Link>


    </div>
  );
}

