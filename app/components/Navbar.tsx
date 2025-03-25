'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import logo from '@/assets/png/logo.png'
import arrowDown from '@/assets/png/arrow-down.png'
import searchIcon from '@/assets/svg/search-icon.svg'
import searchIconWhite from '@/assets/svg/search-icon-white.svg'
import basketIcon from '@/assets/svg/basket-icon.svg'
import basketIconWhite from '@/assets/svg/basket-icon-white.svg'
import phoneIcon from '@/assets/svg/phone-icon.svg'
import phoneIconWhite from '@/assets/svg/phone-icon-white.svg'
import menu from '@/assets/svg/menu.svg'
import x from '@/assets/svg/x.svg'
import { navbar_items } from '../consts/navbar_items'
import Link from 'next/link'

function Navbar() {
    const [ isOpen, setIsOpen ] = useState(false)

    return (
        <div className='flex w-full justify-center'>
        <div className='w-full shadow fixed z-40 bg-white justify-between items-center max-w-[1550px] mx-auto hidden lg:flex flex-row h-[62px]'>
            <div className='w-full h-full flex flex-row flex-1'>
                <Link href={'/'} className='bg-black w-[240px] h-full flex items-center justify-center'>
                    <Image src={logo.src} alt="Logo Gree" width={160} height={40} />
                </Link>
                <div className='flex flex-row items-center justify-start w-full'>
                    {
                        navbar_items.map((item, idx) => {
                            return (
                                <Link href={item.href} key={idx} className='flex flex-row gap-2 px-[15px] xl:px-[20px] items-center justify-start'>
                                    <span className='text-[16px] font-medium'>{item.name}</span>
                                    <Image src={arrowDown} height={6} width={6} alt="Arrow down icon " />
                                </Link>
                            )
                        })
                    }
                    <Link href={'#'} className='rounded-full border px-5 py-1 h-[40px] hover:bg-gray-50 transition-all duration-300 flex items-center justify-center text-center font-medium'>
                        Jak kupić?
                    </Link>
                </div>
            </div>
            <div className='h-full flex flex-row justify-end items-center gap-5'>
                <div className='flex flex-row gap-4 items-center justify-end'>
                    <Link href={'#'}>
                        <Image src={searchIcon} height={20} width={20} alt="Search icon" />
                    </Link>
                    <Link href={'#'} className='pl-2'>
                        <Image src={phoneIcon} height={20} width={20} alt="Search icon" />
                    </Link>
                    <Link href={'#'} className='pl-1'>
                        <Image src={basketIcon} height={28} width={28} alt="Search icon" />
                    </Link>
                </div>
                <Link href={'#'} className='w-[150px] xl:w-[195px] h-full flex items-center justify-center text-center bg-[#FF4510] text-white text-[16px]'>
                    <span>Stefa instalatora</span>
                </Link>
            </div>
        </div>
        <div className='w-full fixed z-50 bg-black justify-between items-center max-w-[1410px] flex lg:hidden flex-row h-[55px]'>
            <div className='w-full h-full flex flex-row flex-1'>
                <Link href={'/'} className='bg-black w-[160px] h-full flex items-center justify-center'>
                    <Image src={logo.src} alt="Logo Gree" width={150} height={45} />
                </Link>
            </div>
            <div className='px-5 cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <Image src={x.src} height={26} width={26} alt="x icon" /> : <Image src={menu.src} height={26} width={26} alt="menu icon" />}
            </div>
            {
                isOpen &&
                <div style={{height: 'calc(100dvh - 55px)'}} className='text-white z-50 flex flex-col bg-black fixed top-0 left-0 w-full mt-[55px]'>
                    <div className='flex flex-col gap-5 mt-10 items-center justify-start w-full'>
                        {
                            navbar_items.map((item, idx) => {
                                return (
                                    <div key={idx} className='flex flex-row gap-2 px-[15px] xl:px-[20px] items-center justify-start'>
                                        <span className='text-[18px] font-medium'>{item.name}</span>
                                        <Image src={arrowDown} height={6} width={6} alt="Arrow down icon " />
                                    </div>
                                )
                            })
                        }
                        <Link href={'#'} className='rounded-full border px-6 py-2 h-[45px] flex items-center text-[18px] justify-center text-center font-medium'>
                            Jak kupić?
                        </Link>
                    </div>
                    <div className='flex flex-col mt-10 justify-center items-center gap-10'>
                        <div className='flex flex-row gap-4 items-center justify-start'>
                            <Link href={'#'}>
                                <Image src={searchIconWhite} height={20} width={20} alt="Search icon" />
                            </Link>
                            <Link href={'#'} className='pl-2'>
                                <Image src={phoneIconWhite} height={20} width={20} alt="Search icon" />
                            </Link>
                            <Link href={'#'} className='pl-1'>
                                <Image src={basketIconWhite} height={28} width={28} alt="Search icon" />
                            </Link>
                        </div>
                        <div className='w-[150px] h-[50px] rounded-md flex items-center justify-center text-center bg-[#FF4510] text-white text-[16px]'>
                            <span>Stefa instruktora</span>
                        </div>
                    </div>
                </div>
            }
        </div>
        </div>
    )
}

export default Navbar