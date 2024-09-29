import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import BankCard from './BankCard'

const RightSideBar = ({user, transactions, banks}: RightSidebarProps ) => {
    const userWord = user?.firstName[0] || "G"
  return (
    <aside className='right-sidebar'>
        <section className='flex flex-col pb-8'>
            <div className='profile-banner'>
                <div className='profile mt-20'>
                    <div className='profile-img'>
                        <span className='text-5xl text-blue-500'>{userWord}</span>
                    </div>

                    <div className='profile-details'>
                        <h1 className='profile-name'>{user?.firstName} {user?.lastName}</h1>
                        <p className='profile-email'>{user?.email}</p>
                    </div>
                </div>
            </div>
        </section>
        <section className='banks mt-16'>
            <div className='flex w-full justify-between'>
                <h2 className='header-2'>My Banks</h2>
                <Link href="/" className='flex gap-2'>
                    <Image src="/icons/plus.svg" width={24} height={24} alt="plus"/>
                    <h2 className='text-14 font-semibold text-gray-600'>Add Bank</h2>
                </Link>
            </div>

            {banks?.length > 0 && (
                <div className='relative flex flex-1 flex-col items-center justify-center gap-5'>
                    <div className='relative z-10'>
                        <BankCard/>
                    </div>
                    {banks[1] && (
                        <div className='absolute right-0 top-8 z-0 w-[90%]'>
                            <BankCard/>
                        </div>
                    )}
                </div>
            )}
        </section>
    </aside>
  )
}

export default RightSideBar