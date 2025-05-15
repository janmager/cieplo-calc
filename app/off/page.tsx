import React from 'react'
import { VT323 } from 'next/font/google'

const vt = VT323({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-vt'
})

function page() {
  return (
    <div className='z-[100] bg-white flex-col fixed h-screen w-screen flex items-center pt-[200px] justify-start text-center'>
        <p className={`${vt.className} text-3xl select-none`}>PROJECT IS EXPIRED</p>
        <p className={`${vt.className} text-lg mt-0 opacity-50 select-none`}>since 14.05.2024 21:28</p>
    </div>
  )
}

export default page