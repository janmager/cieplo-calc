import React from 'react'
import arrowRight from '@/assets/svg/arrow-right.svg'
import Image from 'next/image'

function PrevButton({ onClick}: {onClick: any}) {
    const click = () => {
        onClick();
        window.scrollTo(0, 0);
        if (window.self !== window.top) {
            const message = { type: 'scrollToTop' };
            const targetOrigin: string = process.env.NEXT_PUBLIC_TARGET_PAGE as string; 
            window.parent.postMessage(message, targetOrigin);
        }
    }
    return (
        <div onClick={click} className={`cursor-pointer group w-[120px] flex flex-col gap-5`}>
            <div className='flex flex-row justify-between gap-2.5 px-2.5'>
                <Image src={arrowRight.src} height={15} width={15} className='rotate-180' alt="Arrow right icon" />
                <span className='text-[15px] font-[500] text-[#FF4510] uppercase group-hover:underline'>Wstecz</span>
            </div>
            <div className='w-full h-[2px] bg-[#FF4510]'></div>
        </div>
    )
}

export default PrevButton