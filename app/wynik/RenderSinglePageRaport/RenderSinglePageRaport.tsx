'use client'

import FullRaportPreview from '@/app/components/Calculator/2-screen/5-step/FullRaportPreview/FullRaportPreview'
import React, { useState } from 'react'

function RenderSinglePageRaport({raport}: {raport: any}) {
    const [ formData, setFormData ] = useState(raport)

    return (
        <div className='px-5 md:px-10 py-24 md:py-32 max-w-[1172px]'>
            <FullRaportPreview singleView={true} formData={formData} setFormData={setFormData} />
        </div>
    )
}

export default RenderSinglePageRaport