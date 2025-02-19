import React, { useEffect } from 'react'
import check from '@/assets/svg/check-orange.svg'
import Image from 'next/image'

function ChooseHeatingLeveles({formData, setFormData}: {formData: any, setFormData: any}) {
    const levels: any = {
        'Parterowy': {
            counter: 0,
            name: 'Parter',
        },
        'Jednopiętrowy': {
            counter: 1,
            name: '1. piętro',
        },
        'Dwupiętrowy': {
            counter: 2,
            name: '2. piętro',
        },
        'Trzypiętrowy': {
            counter: 3,
            name: '3. piętro',
        },
        'Czteropiętrowy': {
            counter: 4,
            name: '4. piętro',
        }
    }

    // @ts-ignore
    const currentCounter: any = formData['house_floor_plan'] ? levels[formData['house_floor_plan']].counter : 0

    const handleChangeHeatingLevel = (name: string) => {
        let old = formData['heating_levels']

        if(old == undefined) old = []

        if(old.indexOf(name) >= 0){
            if(old.length == 1) return false;
            old.splice(old.indexOf(name), 1)
        } else {
            old.push(name)
        }

        setFormData({...formData, 'heating_levels': old})
    }

    useEffect(() => {
        if(formData['house_roof_plan'] != 'Skośny z poddaszem' && formData['heating_levels'].indexOf('Poddasze') >= 0){
            let old = formData['heating_levels']
            old.splice(old.indexOf('Poddasze'), 1)
            setFormData({...formData, 'heating_levels': old})
        }
        else if(!formData['building_has_basement'] && formData['heating_levels'].indexOf('Piwnica') >= 0){
            let old = formData['heating_levels']
            old.splice(old.indexOf('Piwnica'), 1)
            setFormData({...formData, 'heating_levels': old})
        }
        else{
            let old = formData['heating_levels']
            if(formData['house_floor_plan'] == 'Parterowy'){
                if(old.indexOf('1. piętro') >= 0) old.splice(old.indexOf('1. piętro'), 1)
                if(old.indexOf('2. piętro') >= 0) old.splice(old.indexOf('2. piętro'), 1)
                if(old.indexOf('3. piętro') >= 0) old.splice(old.indexOf('3. piętro'), 1)
                if(old.indexOf('4. piętro') >= 0) old.splice(old.indexOf('4. piętro'), 1)
            }
            if(formData['house_floor_plan'] == 'Jednopiętrowy'){
                if(old.indexOf('2. piętro') >= 0) old.splice(old.indexOf('2. piętro'), 1)
                if(old.indexOf('3. piętro') >= 0) old.splice(old.indexOf('3. piętro'), 1)
                if(old.indexOf('4. piętro') >= 0) old.splice(old.indexOf('4. piętro'), 1)
            }
            if(formData['house_floor_plan'] == 'Dwupiętrowy'){
                if(old.indexOf('3. piętro') >= 0) old.splice(old.indexOf('3. piętro'), 1)
                if(old.indexOf('4. piętro') >= 0) old.splice(old.indexOf('4. piętro'), 1)
            }
            if(formData['house_floor_plan'] == 'Trzypiętrowy'){
                if(old.indexOf('4. piętro') >= 0) old.splice(old.indexOf('4. piętro'), 1)
            }
        }
    }, [formData['house_floor_plan'], formData['house_roof_plan'], formData['building_has_basement']])
    
    return (
        <div className='mt-2.5 flex flex-col gap-2.5'>
            {formData['building_has_basement'] && <div className='flex cursor-pointer flex-row gap-5 items-center' onClick={() => handleChangeHeatingLevel('Piwnica')}>
                <div className='min-w-[20px] max-w-[20px] min-h-[20px] max-h-[20px] border border-[#8E8E8E] flex items-center justify-center'>
                    {formData['heating_levels'].indexOf('Piwnica') >= 0 && <Image src={check.src} height={17} width={17} className='opacity-100' alt="check" />}
                </div>
                <span>Piwnica</span>
            </div>}
            {
                Object.keys(levels).map((idName: any, idx: number) => {
                    if(currentCounter >= levels[idName].counter) return (
                        <div className='flex cursor-pointer flex-row gap-5 items-center' onClick={() => handleChangeHeatingLevel(levels[idName].name)} key={idx}>
                            <div className='min-w-[20px] max-w-[20px] min-h-[20px] max-h-[20px] border border-[#8E8E8E] flex items-center justify-center'>
                                {formData['heating_levels'].indexOf(levels[idName].name) >= 0 && <Image src={check.src} height={17} width={17} className='opacity-100' alt="check" />}
                            </div>
                            <span>{levels[idName].name}</span>
                        </div>
                    )
                })
            }
            {formData['house_roof_plan'] == 'Skośny z poddaszem' && <div className='flex cursor-pointer flex-row gap-5 items-center' onClick={() => handleChangeHeatingLevel('Poddasze')}>
                <div className='min-w-[20px] max-w-[20px] min-h-[20px] max-h-[20px] border border-[#8E8E8E] flex items-center justify-center'>
                    {formData['heating_levels'].indexOf('Poddasze') >= 0 && <Image src={check.src} height={17} width={17} className='opacity-100' alt="check" />}
                </div>
                <span>Poddasze</span>
            </div>}
        </div>
    )
}

export default ChooseHeatingLeveles