import React from 'react'

function InfoBox({title, value}: {title: string, value: any}) {
    let print = ''

    if(value && typeof value == 'object') value.map((item: string, id: number) => id == 0 ? print += item : print += ', ' + item);
    else print = value;

    return (
        <div className='flex flex-col gap-1 mt-5'>
            <span className='font-[400] onPrintLabel'>{title}</span>
            <span className={value ? 'font-[700]' : 'opacity-30 font-light overflow-x-auto'}>
                {print ? Number(print) == 0 ? 'Brak' : print : 'brak danych'}
            </span>
        </div>
    )
}

export default InfoBox