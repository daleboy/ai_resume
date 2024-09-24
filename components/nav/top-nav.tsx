'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image' 
import {ModeToggle} from "@/components/nav/mode-toggle"
import Logo from "@/public/logo.svg"
import { useUser } from '@clerk/nextjs'
import {Toaster} from "react-hot-toast"
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
export default function TopNav() {
  const { isLoaded, isSignedIn, user } = useUser();
  return (
    <nav className='flex justify-between py-1 items-center shadow'>
        <Link href = "/">
        <Toaster/>
        <Image src ={Logo} width={50} height={50} alt='logo'/>
        </Link>
        <div className='flex justify-end items-center gap-2'>
          {isSignedIn && isLoaded  && <Link href="/dashboard">{user.fullName}'s Dashboard</Link>}
        <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <ModeToggle/>
        </div>
    </nav>
  ) 
}
