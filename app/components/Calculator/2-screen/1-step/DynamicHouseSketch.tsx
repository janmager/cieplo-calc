import React from 'react'

function DynamicHouseSketch({formData, setFormData, noMarginTop = false, paddingLeft = true}: {formData: any, noMarginTop?: boolean, setFormData: any, paddingLeft?: boolean}) {
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

    return (
        <div className={`flex flex-col text-[14px] ${noMarginTop ? 'mt-5' : 'mt-10'} pb-5 items-center justify-center gap-1 ${paddingLeft ? 'ml-[-44px]' : ''}`}>
            {
                formData['house_roof_plan'] == 'Skośny z poddaszem' ? 
                <div className={`h-[80px] w-[200px] triangle-poddasze flex flex-col items-center justify-center gap-0`} style={{borderBottomColor: formData['heating_levels'].indexOf('Poddasze') >= 0 ? 'rgb(254,174,174)' : 'rgb(200,245,255)'}}>
                    <span className="font-bold pt-[105px]">Poddasze</span>
                    <span className='font-light'>{formData['heating_levels'].indexOf('Poddasze') >= 0 ? 'ogrzewane' : 'nieogrzewane'}</span>
                </div> : 
                formData['house_roof_plan'] == 'Skośny bez poddasza' ? 
                <div className={`h-[80px] w-[200px] triangle-poddasze flex flex-col items-center justify-center gap-0`}>
                </div>
                :
                <div className='h-[5px] bg-slate-950 w-[210px] lg:w-[250px]'></div>
            }
            {/* start pietra */}
            {
                currentCounter >= 4 && 
                <div className={`h-[80px] w-[160px] lg:w-[220px] flex flex-col items-center justify-center gap-0 ${formData['heating_levels'].indexOf('4. piętro') >= 0 ? 'bg-[rgb(254,174,174)]' : 'bg-[rgb(200,245,255)]'}`}>
                    <span className="font-bold">4. piętro</span>
                    <span className='font-light'>{formData['heating_levels'].indexOf('4. piętro') >= 0 ? 'ogrzewane' : 'nieogrzewane'}</span>
                </div>
            }
            {
                currentCounter >= 3 && 
                <div className={`h-[80px] w-[160px] lg:w-[220px] flex flex-col items-center justify-center gap-0 ${formData['heating_levels'].indexOf('3. piętro') >= 0 ? 'bg-[rgb(254,174,174)]' : 'bg-[rgb(200,245,255)]'}`}>
                    <span className="font-bold">3. piętro</span>
                    <span className='font-light'>{formData['heating_levels'].indexOf('3. piętro') >= 0 ? 'ogrzewane' : 'nieogrzewane'}</span>
                </div>
            }
            {
                currentCounter >= 2 && 
                <div className={`h-[80px] w-[160px] lg:w-[220px] flex flex-col items-center justify-center gap-0 ${formData['heating_levels'].indexOf('2. piętro') >= 0 ? 'bg-[rgb(254,174,174)]' : 'bg-[rgb(200,245,255)]'}`}>
                    <span className="font-bold">2. piętro</span>
                    <span className='font-light'>{formData['heating_levels'].indexOf('2. piętro') >= 0 ? 'ogrzewane' : 'nieogrzewane'}</span>
                </div>
            }
            {
                currentCounter >= 1 && 
                <div className={`h-[80px] w-[160px] lg:w-[220px] flex flex-col items-center justify-center gap-0 ${formData['heating_levels'].indexOf('1. piętro') >= 0 ? 'bg-[rgb(254,174,174)]' : 'bg-[rgb(200,245,255)]'}`}>
                    <span className="font-bold">1. piętro</span>
                    <span className='font-light'>{formData['heating_levels'].indexOf('1. piętro') >= 0 ? 'ogrzewane' : 'nieogrzewane'}</span>
                </div>
            }
            {
                currentCounter >= 0 && 
                <div className={`h-[80px] w-[160px] lg:w-[220px] flex flex-col items-center justify-center gap-0 ${formData['heating_levels'].indexOf('Parter') >= 0 ? 'bg-[rgb(254,174,174)]' : 'bg-[rgb(200,245,255)]'}`}>
                    <span className="font-bold">Parter</span>
                    <span className='font-light'>{formData['heating_levels'].indexOf('Parter') >= 0 ? 'ogrzewany' : 'nieogrzewany'}</span>
                </div>
            }
            {/* koniec pietra */}
            <div className='w-[210px] lg:w-[330px] h-[5px] bg-[#c4c4c4]'></div>
            {
                formData['building_has_basement'] ? 
                <div className={`h-[80px] w-[160px] lg:w-[220px] flex flex-col items-center justify-center gap-0 ${formData['heating_levels'].indexOf('Piwnica') >= 0 ? 'bg-[rgb(254,174,174)]' : 'bg-[rgb(200,245,255)]'}`}>
                    <span className="font-bold">Piwnica</span>
                    <span className='font-light'>{formData['heating_levels'].indexOf('Piwnica') >= 0 ? 'ogrzewana' : 'nieogrzewana'}</span>
                </div> : 
                <div className='pt-2.5'>
                    <span className="font-bold">Bez podpiwniczenia</span>
                </div>
            }
        </div>
    )
}

export default DynamicHouseSketch