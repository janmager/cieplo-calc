import React from 'react'
import arrowRight from '@/assets/svg/arrow-right.svg'
import Image from 'next/image'

function NextButton({active, setViewId, nextView}: {active: boolean, setViewId: any, nextView: number}) {
    const nextStep = () => {
        if(active){
            setViewId(nextView)
            window.scrollTo(0, 0);
        }
    }

    return (
        <div onClick={nextStep} className={`${active ? 'cursor-pointer group' : 'cursor-default grayscale opacity-60'} w-[100px] flex flex-col gap-5`}>
            <div className='flex flex-row justify-between px-2.5'>
                <span className='text-[15px] font-[500] text-[#FF4510] uppercase group-hover:underline'>Dalej</span>
                <Image src={arrowRight.src} height={15} width={15} alt="Arrow right icon" />
            </div>
            <div className='w-full h-[2px] bg-[#FF4510]'></div>
        </div>
    )
}

export default NextButton