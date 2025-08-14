import React from 'react'

export const levels: any = {
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
        },
        'Pięciopiętrowy' : {
            counter: 5,
            name: '5. piętro',
        },
        'Sześciopiętrowy': {
            counter: 6,
            name: '6. piętro',
        },
        'Siedmiopiętrowy': {
            counter: 7,
            name: '7. piętro',
        },
        'Ośmiopiętrowy': {
            counter: 8,
            name: '8. piętro',
        },
        'Dziewięciopiętrowy': {
            counter: 9,
            name: '9. piętro',
        },
        'Dziesięciopiętrowy': {
            counter: 10,
            name: '10. piętro'
        },
        'Jedenastopiętrowy': {
            counter: 11,
            name: '11. piętro'
        },
        'Dwunastopiętrowy': {
            counter: 12,
            name: '12. piętro'
        }
    }

export const getDynamicTopIsolation = (formData: any) => {
    if(formData.building_type == 'Mieszkanie'){
        return {
            title: 'mieszkanie todo title',
            description: 'mieszkanie todo desc',
            selectTitle: '',
            selectDescription: '',
            selectUnderTitle: '',
            selectUnderDescription: ''
        }
    }

    let hasChoosablePoddasze = formData.house_roof_plan == 'Skośny z poddaszem';
    let isPoddaszeHeated = formData.heating_levels.indexOf('Poddasze') >= 0;
    let isLastLevelBeforeRoofIsHeated = formData.heating_levels.indexOf(levels[formData.house_floor_plan].name) >= 0;

    // jesli jest poddasze i jest ogrzewane
    if(hasChoosablePoddasze && isPoddaszeHeated){
        return {
            title: 'Izolacja dachu',
            description: 'Czy jest jakakolwiek izolacja dachu?',
            selectTitle: '',
            selectDescription: '',
        }
    }
    // jesli jest poddasze i nie jest ogrzewane
    else if(hasChoosablePoddasze && !isPoddaszeHeated && !isLastLevelBeforeRoofIsHeated){
        return {
            title: 'Izolacja stropu',
            description: 'Czy jest jakakolwiek izolacja stropu?',
            selectTitle: 'Nieogrzewane piętro powyżej',
            selectDescription: 'Jak wygląda sytuacja na nieogrzewanym piętrze powyżej?',
        }
    }
    else if(!hasChoosablePoddasze && isLastLevelBeforeRoofIsHeated){
        return {
            title: 'Izolacja dachu',
            description: 'Czy jest jakakolwiek izolacja dachu?',
            selectTitle: '',
            selectDescription: '',
        }
    }
    else if(!hasChoosablePoddasze && formData.heating_levels.indexOf('Parter') >= 0){
        return {
            title: 'Izolacja stropu',
            description: 'Czy jest jakakolwiek izolacja stropu?',
            selectTitle: 'Nieogrzewane piętro powyżej',
            selectDescription: 'Jak wygląda sytuacja na nieogrzewanym piętrze powyżej?',
        }
    }else{
        return {
            title: 'Izolacja stropu między poddaszem, a piętrem poniżej',
            description: 'Czy jest jakakolwiek izolacja stropu między poddaszem, a piętrem poniżej?',
            selectTitle: 'Nieogrzewane poddasze',
            selectDescription: 'Jak wygląda sytuacja w nieogrzewanym poddaszu?',
        }
    }
}

export const getDynamicBottomIsolation = (formData: any) => {
    let isPiwnica = formData.building_has_basement;
    let isPiwnicaHeated = formData.heating_levels.indexOf('Piwnica') >= 0;
    let isParterHeated = formData.heating_levels.indexOf('Parter') >= 0;
    let isAllLevelsIsHeated = formData.heating_levels.filter((level: string) => level !== 'Piwnica' && level !== 'Poddasze').length == levels[formData.house_floor_plan].counter+1;
    if(isPiwnica && isPiwnicaHeated){
        return {
            title: 'Izolacja podłogi piwnicy',
            description: 'Czy jest jakakolwiek izolacja podłogi piwnicy?',
            selectTitle: '',
            selectDescription: '',
        }
    }
    else if(isPiwnica && !isPiwnicaHeated && isAllLevelsIsHeated){
        return {
            title: 'Izolacja podłogi parteru',
            description: 'Czy jest jakakolwiek izolacja podłogi parteru?',
            selectTitle: 'Nieogrzewana piwnica',
            selectDescription: 'Jak wygląda sytuacja w nieogrzewanej piwnicy?',
        }
    }
    else if(!isPiwnica && isParterHeated){
        return {
            title: 'Izolacja podłogi parteru',
            description: 'Czy jest jakakolwiek izolacja podłogi parteru?',
            selectTitle: '',
            selectDescription: '',
        }
    }
    else if(isPiwnica && isParterHeated && !isAllLevelsIsHeated){
        return {
            title: 'Izolacja podłogi piwnicy',
            description: 'Czy jest jakakolwiek izolacja podłogi piwnicy?',
            selectTitle: 'Nieogrzewane piętro poniżej',
            selectDescription: 'Jak wygląda sytuacja na nieogrzewanym piętrze poniżej? ',
        }
    }
    else if(isPiwnica && isParterHeated && !isAllLevelsIsHeated){
        return {
            title: 'Izolacja podłogi piwnicy',
            description: 'Czy jest jakakolwiek izolacja podłogi piwnicy?',
            selectTitle: 'Nieogrzewane piętro poniżej',
            selectDescription: 'Jak wygląda sytuacja na nieogrzewanym piętrze poniżej? ',
        }
    }
    else if(!isAllLevelsIsHeated && formData.heating_levels.indexOf('Parter') == -1){
        return {
            title: 'Izolacja stropu nad nieogrzewanym parterem',
            description: 'Czy jest jakakolwiek izolacja stropu nad nieogrzewanym parterem? ',
            selectTitle: 'Nieogrzewany parter',
            selectDescription: 'Jak wygląda sytuacja na nieogrzewanym parterze? ',
        }
    }
    return {
        title: 'Izolacja podłogi',
        description: 'Czy jest jakakolwiek izolacja podłogi?',
        selectTitle: 'Nieogrzewane piętro poniżej',
        selectDescription: 'Jak wygląda sytuacja na nieogrzewanym piętrze poniżej?',
    }
}

function DynamicHouseSketch({formData, setFormData, noMarginTop = false, paddingLeft = true}: {formData: any, noMarginTop?: boolean, setFormData: any, paddingLeft?: boolean}) {
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
                currentCounter >= 12 && 
                <div className={`h-[80px] w-[160px] lg:w-[220px] flex flex-col items-center justify-center gap-0 ${formData['heating_levels'].indexOf('12. piętro') >= 0 ? 'bg-[rgb(254,174,174)]' : 'bg-[rgb(200,245,255)]'}`}>
                    <span className="font-bold">12. piętro</span>
                    <span className='font-light'>{formData['heating_levels'].indexOf('12. piętro') >= 0 ? 'ogrzewane' : 'nieogrzewane'}</span>
                </div>
            }
            {
                currentCounter >= 11 && 
                <div className={`h-[80px] w-[160px] lg:w-[220px] flex flex-col items-center justify-center gap-0 ${formData['heating_levels'].indexOf('11. piętro') >= 0 ? 'bg-[rgb(254,174,174)]' : 'bg-[rgb(200,245,255)]'}`}>
                    <span className="font-bold">11. piętro</span>
                    <span className='font-light'>{formData['heating_levels'].indexOf('11. piętro') >= 0 ? 'ogrzewane' : 'nieogrzewane'}</span>
                </div>
            }
            {
                currentCounter >= 10 && 
                <div className={`h-[80px] w-[160px] lg:w-[220px] flex flex-col items-center justify-center gap-0 ${formData['heating_levels'].indexOf('10. piętro') >= 0 ? 'bg-[rgb(254,174,174)]' : 'bg-[rgb(200,245,255)]'}`}>
                    <span className="font-bold">10. piętro</span>
                    <span className='font-light'>{formData['heating_levels'].indexOf('10. piętro') >= 0 ? 'ogrzewane' : 'nieogrzewane'}</span>
                </div>
            }
            {
                currentCounter >= 9 && 
                <div className={`h-[80px] w-[160px] lg:w-[220px] flex flex-col items-center justify-center gap-0 ${formData['heating_levels'].indexOf('9. piętro') >= 0 ? 'bg-[rgb(254,174,174)]' : 'bg-[rgb(200,245,255)]'}`}>
                    <span className="font-bold">9. piętro</span>
                    <span className='font-light'>{formData['heating_levels'].indexOf('9. piętro') >= 0 ? 'ogrzewane' : 'nieogrzewane'}</span>
                </div>
            }
            {
                currentCounter >= 8 && 
                <div className={`h-[80px] w-[160px] lg:w-[220px] flex flex-col items-center justify-center gap-0 ${formData['heating_levels'].indexOf('8. piętro') >= 0 ? 'bg-[rgb(254,174,174)]' : 'bg-[rgb(200,245,255)]'}`}>
                    <span className="font-bold">8. piętro</span>
                    <span className='font-light'>{formData['heating_levels'].indexOf('8. piętro') >= 0 ? 'ogrzewane' : 'nieogrzewane'}</span>
                </div>
            }
            {
                currentCounter >= 7 && 
                <div className={`h-[80px] w-[160px] lg:w-[220px] flex flex-col items-center justify-center gap-0 ${formData['heating_levels'].indexOf('7. piętro') >= 0 ? 'bg-[rgb(254,174,174)]' : 'bg-[rgb(200,245,255)]'}`}>
                    <span className="font-bold">7. piętro</span>
                    <span className='font-light'>{formData['heating_levels'].indexOf('7. piętro') >= 0 ? 'ogrzewane' : 'nieogrzewane'}</span>
                </div>
            }
            {
                currentCounter >= 6 && 
                <div className={`h-[80px] w-[160px] lg:w-[220px] flex flex-col items-center justify-center gap-0 ${formData['heating_levels'].indexOf('6. piętro') >= 0 ? 'bg-[rgb(254,174,174)]' : 'bg-[rgb(200,245,255)]'}`}>
                    <span className="font-bold">6. piętro</span>
                    <span className='font-light'>{formData['heating_levels'].indexOf('6. piętro') >= 0 ? 'ogrzewane' : 'nieogrzewane'}</span>
                </div>
            }
            {
                currentCounter >= 5 && 
                <div className={`h-[80px] w-[160px] lg:w-[220px] flex flex-col items-center justify-center gap-0 ${formData['heating_levels'].indexOf('5. piętro') >= 0 ? 'bg-[rgb(254,174,174)]' : 'bg-[rgb(200,245,255)]'}`}>
                    <span className="font-bold">5. piętro</span>
                    <span className='font-light'>{formData['heating_levels'].indexOf('5. piętro') >= 0 ? 'ogrzewane' : 'nieogrzewane'}</span>
                </div>
            }
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