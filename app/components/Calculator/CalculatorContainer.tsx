'use client'

import React, { useEffect, useState } from 'react'
import FirstCalcView from './1-screen/FirstCalcView'
import SecondCalcView from './2-screen/SecondCalcView'

function CalculatorContainer() {
    const [ viewId, setViewId ] = useState<Number>(2)
    const [ formData, setFormData ] = useState<any>({})

    useEffect(() => {
        console.log('formData: ',formData)
    }, [formData])

    if(viewId == 1) return <div className='w-full'><FirstCalcView formData={formData} setFormData={setFormData} setViewId={setViewId} /></div>;
    else if(viewId == 2) return <div><SecondCalcView formData={formData} setFormData={setFormData} setViewId={setViewId} /></div> 
}

export default CalculatorContainer