"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import { usePathname, } from 'next/navigation'
import "./Navbar.css";
import { getAccount } from "@wagmi/core";
import { GoHome, GoHomeFill, GoHeart, GoHeartFill, GoBell, GoBellFill, GoPerson, GoPersonFill, GoSignIn } from "react-icons/go";
import { AiOutlineMessage, AiFillMessage, AiOutlineAppstore, AiFillAppstore } from "react-icons/ai";





export default function Navbar() {
  const { address } = getAccount();
  const pathname = usePathname();

  return (
    <>

      <div className={`Navbar`}>


        <NavLink
          href='/'
          activeHrefs={['/']}
          icon={<GoHome className="Navicon" />}
          activeIcon={<GoHomeFill className="Navicon" />}
        />

        <NavLink
          href='/find'
          activeHrefs={['/find']}
          icon={<AiOutlineAppstore  className="Navicon" />}
          activeIcon={<AiFillAppstore  className="Navicon" />}
       />

        <NavLink
          href='/message'
          activeHrefs={['/message']}
          icon={<AiOutlineMessage className="Navicon" />}
          activeIcon={<AiFillMessage className="Navicon" />}
        />

        {address ? (
          <NavLink
            href={`/profile`}
            activeHrefs={[`/profile`]}
            icon={<GoPerson className="Navicon" />}
            activeIcon={<GoPersonFill className="Navicon" />}
          />

        ) : (

          <NavLink
            href={`/profile/sin`}
            activeHrefs={[`/profile/sin`]}
            icon={<GoPerson  className="Navicon" />}
            activeIcon={<GoPersonFill className="Navicon" />}
          />
        )}



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

