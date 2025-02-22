'use client'

import React, { useState } from 'react'
import { SuggestedProduct } from '@/app/types/SuggestedProduct'
import { Product } from '@prisma/client'
import Image from 'next/image'

function SuggestedProductThumbnail({suggestedProduct}: {suggestedProduct: Product}) {
  return (
    <div className='w-full border flex flex-col justify-start pt-5 pb-10 px-5 items-center'>
      <div className='w-full flex items-center justify-center'>
        <Image className='max-w-[300px] lg:max-w-[80%]' height={400} width={200} src={suggestedProduct.image ? suggestedProduct.image : ''} alt='product' />
      </div>
      <p className='text-[13px] font-[600] text-[#FF4510] uppercase mt-2.5 onPrintText14'>{suggestedProduct.type}</p>
      <p className='text-[22px] max-w-[90%] mt-1.5 md:text-[22px] font-[700] line-clamp-2 text-center onPrintText14 tracking-tighter'>{suggestedProduct.name}</p>
      <p className='text-[14px] mt-1.5 onPrintText14'>{suggestedProduct.desc}</p>
      {suggestedProduct.product_link && <a href={suggestedProduct.product_link} target='_blank' className='bg-[#FF4510] product-link hideOnPrint mt-7 flex items-center justify-center h-[54px] w-full uppercase text-white font-[700]'>
        <span>ZOBACZ KARTĘ PRODUKTU</span>
      </a>}
    </div>
  )
}

export default SuggestedProductThumbnail