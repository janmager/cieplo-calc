import { fetchRaportData } from '@/utils/supabase/fetchRaportData';
import { Metadata } from 'next';
import Link from 'next/link';
import RenderSinglePageRaport from '../RenderSinglePageRaport/RenderSinglePageRaport';

export const metadata: Metadata = {
    title: "Raport | " + process.env.NEXT_PUBLIC_SITE_NAME,
    description: "Raport | " + process.env.NEXT_PUBLIC_SITE_NAME,
};

async function page({ params }: { params: {id: string }}) {
    const { id } = params
    let raport: any;
    const find = await fetchRaportData(id)

    if(find.response && find.data){
        raport = find.data;
    } 
    else{
        return <div className='pt-52 pb-32 opacity-50 text-center'>
            brak takiego raportu
        </div>
    }

   
    if(raport) return (
        <RenderSinglePageRaport raport={raport} />
    )
    else{
        return <div className='flex items-center justify-center px-4 py-40 font-light flex-col gap-5 text-gray-500'>
            <span>Wystąpił błąd podczas ładowania raportu {process.env.NEXT_PUBLIC_SITE_NAME}</span>
            <Link href="/" className='flex flex-row gap-3 text-sm items-center border border-[#D9D9D9] rounded-lg text-oze-green py-2 px-10 hover:bg-[#D9D9D9] hover:text-gray-500 transition-all font-normal'>Powrót</Link>
        </div>
    }
}

export default page