import Image from 'next/image'
import React from 'react'
import logo from '@/assets/png/logo.png'
import arrowDown from '@/assets/png/arrow-down.png'
import { navbar_items } from '../consts/navbar_items'
import Link from 'next/link'

function Navbar() {
    return (
        <div className='w-full fixed z-50 bg-white justify-between items-center max-w-[1410px] flex flex-row h-[62px]'>
            <div className='w-full h-full flex flex-row flex-1'>
                <Link href={'/'} className='bg-black w-[240px] h-full flex items-center justify-center'>
                    <Image src={logo.src} alt="Logo Gree" width={160} height={40} />
                </Link>
                <div className='flex flex-row items-center justify-start w-full'>
                    {
                        navbar_items.map((item, idx) => {
                            return (
                                <div key={idx} className='flex flex-row gap-2 px-[20px] items-center justify-start'>
                                    <span className='text-[16px] font-medium'>{item.name}</span>
                                    <Image src={arrowDown} height={6} width={6} alt="Arrow down icon " />
                                </div>
                            )
                        })
                    }
                    <Link href={'#'} className='rounded-full border px-5 py-1 h-[40px] flex items-center justify-center text-center font-medium'>
                        Jak kupić?
                    </Link>
                </div>
            </div>
            <div className='h-full'>
                <div>

                </div>
                <div className='w-[195px] h-full flex items-center justify-center text-center bg-[#FF4510] text-white text-[16px]'>
                    <span>Stefa instruktora</span>
                </div>
            </div>
        </div>
    )
}

export default Navbar