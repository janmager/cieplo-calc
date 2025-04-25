'use client'

import React, { useState } from 'react'
import logo from '@/assets/png/logo.png'
import arrow from '@/assets/svg/white-arrow-right.svg'
import Image from 'next/image'
import Link from 'next/link'
import { footer_items } from '../consts/footer_items'

import facebookIcon from '@/assets/svg/fb-icon.svg'
import linkedInIcon from '@/assets/svg/linkedin-icon.svg'
import instagramIcon from '@/assets/svg/instagram-icon.svg'
import youtubeIcon from '@/assets/svg/youtube-icon.svg'
import check from '@/assets/svg/check.svg'
import { usePathname } from 'next/navigation'

function Footer() {
  const [ checkbox, setCheckbox ] = useState(false)
  const pathname = usePathname();

  return (
    <div className={`px-10 bg-black ${pathname != '/clean' ? 'flex' : 'hidden'} w-full mt-10`}>
      <div className='w-full gap-0 mt-[80px] mb-[50px] md:mb-[25px] grid grid-cols-1 lg:grid-cols-4 max-w-[1450px] mx-auto text-white'>
          <div className='flex flex-col col-span-1'>
            <Image src={logo.src} height={35} width={154} alt="Logo Gree" />
            <Link href={'#'} className='text-white mt-16 rounded-sm bg-[#FF4510] text-center flex flex-row gap-3 text-[15px] h-[60px] items-center justify-center uppercase'>
              <span>Znajdź instalatora</span>
              <Image src={arrow.src} height={15} width={15} alt="arrow" />
            </Link>
            <Link href={'#'} className='text-[#737479] text-[15px] mt-10'>Kontakt do Free Polska</Link>
            <Link href={'#'} className='text-[#737479] text-[15px] mt-3'>Kontakt do Instalatorów</Link>
          </div>
          <div className='col-span-1 lg:col-span-3 lg:pl-16 mt-5 lg:mt-0'>
            <div className='grid pb-10 border-b border-[#97979733] grid-cols-1 lg:grid-cols-2 gap-5'>
              <div className='flex flex-col gap-2.5'>
                <span className='text-[18px] md:text-[26px] font-[600]'>Dołącz do naszego newslettera</span>
                <div onClick={() => setCheckbox(!checkbox)} className='flex cursor-pointer flex-row items-center gap-2.5'>
                  <div className='min-h-[14px] max-h-[14px] min-w-[14px] max-w-[14px] flex relative items-center justify-center border border-[#737479]'>
                    {checkbox && <Image src={check.src} height={9} width={9} className='opacity-60' alt="check" />}
                  </div>
                  <span className='text-[12px] text-[#737479]'>Wyrażam zgodę na przetwarzanie moich danych osobowych.&nbsp;&nbsp;&nbsp; <span className='underline cursor-pointer text-[#737479] text-[12px]'>Czytaj więcej</span></span>
                </div>
              </div>
              <div className='border border-[#737479] py-2.5 flex flex-row h-[62px]'>
                <input type="email" className='w-full outline-none pl-2.5 md:pl-5 placeholder:opacity-50 bg-transparent' placeholder='Wpisz swój adres e-mail' />
                <div className='border-l items-center cursor-pointer justify-center gap-2.5 px-7 border-[#737479] flex flex-row'>
                  <span className='uppercase font-medium'>wyślij</span>
                  <Image src={arrow.src} height={15} width={15} alt="arrow" />
                </div>
              </div>
            </div>
            <div className='grid grid-cols-2 mt-10 lg:mt-16 md:grid-cols-2 lg:grid-cols-4 gap-5'>
              {
                Object.keys(footer_items).map((item: any, idx: any) => {
                  return (
                    <div key={idx} className='flex flex-col gap-2.5'>
                      <span className='text-[18px] font-[600]'>{footer_items[item].title}</span>
                      <div className='mt-5 flex flex-col gap-2.5'>
                      {
                        footer_items[item].items.map((subItem: any, idy: any) => {
                          return (
                            <Link key={idy} href={subItem.href} className='text-[15px] text-[#737479] font-[400]'>{subItem.name}</Link>
                          )
                        })
                      }
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className='lg:col-span-4 border-b mt-10 lg:mt-0 border-[#97979733] pb-16 flex flex-row gap-5'>
              <Link href={'#'}>
                <Image src={facebookIcon.src} height={20} width={20} alt="Logo Facebook" />
              </Link>
              <Link href={'#'}>
                <Image src={linkedInIcon.src} height={20} width={20} alt="Logo Linkedin" />
              </Link>
              <Link href={'#'}>
                <Image src={instagramIcon.src} height={20} width={20} alt="Logo Instagram" />
              </Link>
              <Link href={'#'}>
                <Image src={youtubeIcon.src} height={20} width={20} alt="Logo Youtube" />
              </Link>
          </div>
          <div className='lg:col-span-4 mt-5 flex justify-between items-center flex-col gap-5 md:gap-0 md:flex-row'>
              <span className='text-[12px] text-[#737479] font-[400]'>&copy; 2024 Free Polska Sp. z o.o., 31-416 Kraków, ul. Dobrego Pasterza 13/3</span>
              <div className='flex flex-row gap-10 text-[12px] text-[#737479] font-[400]'>
                <span>Projekt i wykonanie IVN™</span>
                <Link href="#" className='underline'>Wróć do góry</Link>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Footer