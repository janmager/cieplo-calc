import React from 'react'

function NextButton({active, setViewId, nextView}: {active: boolean, setViewId: any, nextView: number}) {
    const nextStep = () => {
        active && setViewId(2)
    }

    return (
        <div onClick={nextStep} className={`${active ? '' : 'grayscale'} w-[80px] flex flex-col gap-5`}>
            <div className='flex flex-row justify-between'>
                <span className='text-[15px] text-[#FF4510]'>Dalej</span>

            </div>
            <div className='w-full h-[2px] bg-[#FF4510]'></div>
        </div>
    )
}

export default NextButton