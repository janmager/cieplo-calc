import React, { useEffect } from 'react'
import check from '@/assets/svg/check-orange.svg'
import Image from 'next/image'

function ChooseHeatingLevelesMieszkanie({formData, setFormData}: {formData: any, setFormData: any}) {
    const levels: any = {
        'Jednopoziomowe': {
            counter: 1,
            name: 'I poziom',
        },
        'Dwupoziomowe': {
            counter: 2,
            name: 'II poziom',
        },
        'Trzypoziomowe': {
            counter: 3,
            name: 'III poziom',
        },
    }

    // @ts-ignore
    const currentCounter: any = formData['mieszkanie_size'] ? levels[formData['mieszkanie_size']].counter : 0

    const handleChangeHeatingLevel = (name: string) => {
        let old = formData['heating_levels_mieszkanie']

        if(old == undefined) old = []

        if(old.indexOf(name) >= 0){
            if(old.length == 1) return false;
            old.splice(old.indexOf(name), 1)
        } else {
            old.push(name)
        }

        setFormData({...formData, 'heating_levels_mieszkanie': old})
    }

    useEffect(() => {
            let old = formData['heating_levels_mieszkanie']
            if(formData['mieszkanie_size'] == 'Jednopoziomowe'){
                if(old.indexOf('II poziom') >= 0) old.splice(old.indexOf('II poziom'), 1)
                if(old.indexOf('III poziom') >= 0) old.splice(old.indexOf('III poziom'), 1)
            }
            if(formData['mieszkanie_size'] == 'Dwupoziomowe'){
                if(old.indexOf('III poziom') >= 0) old.splice(old.indexOf('III poziom'), 1)
            }
    }, [formData['mieszkanie_size']])
    
    return (
        <div className='mt-2.5 flex flex-col gap-2.5'>
            {
                Object.keys(levels).map((idName: any, idx: number) => {
                    if(currentCounter >= levels[idName].counter) return (
                        <div className='flex cursor-pointer flex-row gap-5 items-center' onClick={() => handleChangeHeatingLevel(levels[idName].name)} key={idx}>
                            <div className='min-w-[20px] max-w-[20px] min-h-[20px] max-h-[20px] border border-[#8E8E8E] flex items-center justify-center'>
                                {formData['heating_levels_mieszkanie'].indexOf(levels[idName].name) >= 0 && <Image src={check.src} height={17} width={17} className='opacity-100' alt="check" />}
                            </div>
                            <span>{levels[idName].name}</span>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ChooseHeatingLevelesMieszkanie