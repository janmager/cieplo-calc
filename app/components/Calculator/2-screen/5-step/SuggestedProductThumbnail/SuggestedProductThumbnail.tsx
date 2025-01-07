import React from 'react'

import img1 from '@/assets/png/thumb1.png'
import img2 from '@/assets/png/thumb2.png'
import { SuggestedProduct } from '@/app/types/SuggestedProduct'

function SuggestedProductThumbnail({suggestedProduct}: {suggestedProduct: SuggestedProduct}) {
  return (
    <div className='w-full border flex flex-col justify-start pb-5 px-5 items-center'>
      <div className='w-full h-[400px] flex items-center justify-center'>
        <img className='max-w-[80%]' src={suggestedProduct.img} alt='product' />
      </div>
      <p className='text-[22px] max-w-[90%] md:text-[30px] font-[700] text-center'>{suggestedProduct.name}</p>
      <p className='text-[14px] md:text-[17px] mt-2.5'>{suggestedProduct.model}</p>
      <a href={suggestedProduct.link} className='bg-[#FF4510] mt-7 flex items-center justify-center h-[54px] w-full uppercase text-white font-[700]'>
        <span>ZOBACZ KARTĘ PRODUKTU</span>
      </a>
    </div>
  )
}

export default SuggestedProductThumbnail