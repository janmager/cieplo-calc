import { cutStartAndEndString } from '@/utils/globals/cutStartAndEndString'
import { Product, Raport } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

function RaportsTable({raports}: {raports: Raport[]}) {
  
    return (
        <div className='text-[14px]'>
            {/* header */}
            <div className='hidden md:grid md:grid-cols-12 border py-2 font-bold'>
                <div className='md:col-span-2 border-r px-4'>
                    ID
                </div>
                <div className='md:col-span-3 border-r px-4'>
                    Utworzono
                </div>
                <div className="md:col-span-6 border-r px-4">
                    Klient
                </div>
                <div className="md:col-span-1 px-4">
                    
                </div>
            </div>

            {/* content */}
            <div className='border-t md:border-0'>
            {
                raports.map((raport) => {
                    return (
                        <div key={raport.id} className='grid grid-cols-2 md:grid-cols-12 border-b border-l border-r py-2'>
                            <div className='md:col-span-2 px-4 border-r flex items-center'>
                                {cutStartAndEndString(raport.id, 5)}
                            </div>
                            <div className='md:col-span-3 px-4 border-r flex items-center'>
                                {new Date(raport.created_at).toLocaleString('pl-PL', {day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric'})}
                            </div>
                            <div className='col-span-2 md:col-span-6 px-4 border-r flex items-center'>
                                {raport.contact_email_address}{raport.contact_phone_number && raport.contact_phone_number.length > 0 ? `, tel: ${raport.contact_phone_number }`: ''}
                            </div>
                            <div className='col-span-2 md:col-span-1 flex justify-center mt-5 md:mt-0 lg:justify-end px-4 lg:items-end'>
                                <Link href={`/wynik/${raport.id}`} className='text-[12px]'>Otwórz</Link>
                            </div>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}

export default RaportsTable