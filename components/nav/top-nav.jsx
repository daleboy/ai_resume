import React from 'react'
import Link from 'next/link'
import Image from 'next/image' 
import {ModeToggle} from "@/components/nav/mode-toggle"
import Logo from "@/public/logo.svg"

export default function TopNav() {
  return (
    <nav className='flex justify-between py-1 items-center shadow'>
        <Link href = "/">
        <Image src ={Logo} width={50} height={50} alt='logo'/>
        </Link>
        <ModeToggle/>
    </nav>
  ) 
}
