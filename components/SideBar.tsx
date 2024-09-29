"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const SideBar = ({user}: SiderbarProps) => {
    const pathName = usePathname();
  return (
    <section className='sidebar'>
        <nav className='flex flex-col gap-4'>
            <Link href="/" className='mb-12 cursor-pointer items-center gap--2'>
            <Image src="/icons/logo.svg" alt="logo" width={34} height={34} className='size-[24px] md:size-14'/>
            <h1 className='sidebar-logo'>Horizon</h1>
            </Link>
            {sidebarLinks.map((link) => {

                const isActive =  pathName === link.route || pathName.startsWith(`${link.route}/`);

                return (
                    <Link
                    href={link.route}
                    key={link.label}
                    className={cn('sidebar-link', {"bg-bank-gradient": isActive})}
                    >
                    {link.label}
                    </Link>
                )
            }
            )}
        </nav>
    </section>
  )
}

export default SideBar