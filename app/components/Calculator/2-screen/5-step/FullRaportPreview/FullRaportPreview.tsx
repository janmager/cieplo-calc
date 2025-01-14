'use client'

import Image from 'next/image'
import React, { use, useEffect, useRef, useState } from 'react'
import copy from '@/assets/svg/copy.svg';
import { copyToClipboard } from '@/utils/globals/copyToClipboard';
import toast, { Toaster } from 'react-hot-toast';
import CustomLabel from '@/app/components/Customs/CustomLabel';
import InfoBox from '@/app/components/Customs/InfoBox';
import DynamicHouseSketch from '../../1-step/DynamicHouseSketch';
import SuggestedProductThumbnail from '../SuggestedProductThumbnail/SuggestedProductThumbnail';
import RecommendedInstalators from '../RecommendedInstalators/RecommendedInstalators';
import { links } from '@/app/consts/links';
import { useReactToPrint } from 'react-to-print';
import logo from '@/assets/png/logo.png'
import { getAllInstalators } from '@/utils/supabase/getAllInstalators';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { supabase } from '@/utils/supabase/client';
import { updateRaportUrl } from '@/utils/supabase/updateRaportUrl';
import { getAllProducts } from '@/utils/supabase/getAllProducts';
import ShowRaportDetailsAdminModal from '@/app/admin/components/ShowRaportDetailsAdminModal';
import { Product } from '@prisma/client';

function FullRaportPreview({formData, setFormData, step, setStep, singleView, autoDownload = false}: {formData: any, setFormData: any, step?: any, setStep?: any, singleView?: boolean, autoDownload?: boolean}) {
    const [ instalators, setInstalators ] = useState<any>(null) 
    const [ suggestedProducts, setSuggestedProducts ] = useState<any>(null) 
    const [ loading, setLoading ] = useState(false)
    const [ openModalRaport, setOpenModalRaport ] = useState(false)

    const hideOnGeneratePdf = () => {
        document.querySelectorAll('.product-link').forEach((el: any) => {
            el.style.display = 'none'
        })
        document.querySelectorAll('.pdf-margin-top').forEach((el: any) => {
            el.style.marginTop = '13px'
        })
        document.querySelectorAll('.pdf-padding-bottom').forEach((el: any) => {
            el.style.paddingBottom = '35px'
        })
        raportLinkRef.current.style.display = 'none';
    }

    const showOnGeneratePdf = () => {
        document.querySelectorAll('.product-link').forEach((el: any) => {
            el.style.display = 'flex'
        })
        document.querySelectorAll('.pdf-margin-top').forEach((el: any) => {
            el.style.marginTop = '0px'
        })
        document.querySelectorAll('.pdf-padding-bottom').forEach((el: any) => {
            el.style.paddingBottom = '10px'
        })
        raportLinkRef.current.style.display = 'flex';
    }

    const fetchAllInstalators = async () => {
        const ins = await getAllInstalators();
        // const suggested = await getAllProducts();
        console.log(formData.recommendedProducts)
        let suggested: any = formData.recommendedProducts ? JSON.parse(formData.recommendedProducts) : await getAllProducts();
        console.log(suggested)
        autoDownload && handleOpenModalRaport(true);

        if(ins.response && (suggested.length || suggested.response)){
            setInstalators(ins.data)
            setSuggestedProducts(suggested.data ? suggested.data : suggested)

            if(!formData.raport_url && !loading){
                setTimeout(() => savetoPDF({first: true}), 2_000);
            }
        }
        else {
            setInstalators([])
            setSuggestedProducts([])
        }
    }

    useEffect(() => {
        if(instalators == null){
            fetchAllInstalators()
        }
    }, [])

    const contentRef = useRef<HTMLDivElement>(null);
    const raportLinkRef = useRef<any>(null);

    const reactToPrintFn = useReactToPrint({ 
        contentRef,
        onBeforePrint: async () => {
            document.title = `Raport-${links.host}-${formData.id}`;
        },
    });

    // generate pdf, save pdf to db, send email with download pdf url
    const savetoPDF = async ({first = false}: {first?: boolean}) => {
        if(loading) return false;

        if(formData.raport_url){
            window.open(formData.raport_url);
            return false;
        }

        hideOnGeneratePdf();
        setLoading(true);
        try{
            const canvas = await html2canvas(contentRef.current!);
            const imgData = canvas.toDataURL('image/png');

            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [canvas.width, canvas.height],
            })

            const width = pdf.internal.pageSize.getWidth();
            const height = (canvas.height * width) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, width, height, '', 'FAST');
            const out = pdf.output('blob');
            try{
                const {data,error} = await supabase.storage.from("raports").upload(`${formData.id}/raport-${new Date().valueOf()}.pdf`, out, {upsert: true, contentType: "application/pdf"});
            
                if (error) {
                    console.error("Error uploading file:", error.message);
                    toast.error('Wystąpił błąd podczas przesyłania raportu')
                } else {
                    const { data: file } = await supabase.storage.from("raports").getPublicUrl(data?.path);
                    setFormData({...formData, raport_url: file.publicUrl})
                    const updateRaportUrlDb = await updateRaportUrl({raportId: formData.id, raportUrl: file.publicUrl});

                    if(updateRaportUrlDb.response){
                            try {
                                const response = await fetch('/api/mail/raport/send', {
                                    method: 'post',
                                    body: JSON.stringify({email: formData.send_raport_email, raportId: formData.id})
                                });
                    
                                if (!response.ok) {
                                    throw new Error(`response status: ${response.status}`);
                                }
                                const responseData = await response.json();

                                setLoading(false);
                                showOnGeneratePdf();
                                setLoading(false)
                                // if(!first)toast.success('Poprawnie wygenerowano PDF')
                            }
                            catch(e){
                                console.log(e);
                                if(!first) toast.error('Wystąpił błąd podczas wysyłania raportu do klienta')
                                    showOnGeneratePdf()
                                setLoading(false)
                        }   
                    }
                    else{
                        if(!first) toast.error('Wystąpił błąd podczas generowania PDF')
                        showOnGeneratePdf()
                    }
                }
            }
            catch(e){ 
                toast.error('Wystąpił błąd podczas przesyłania raportu')
                showOnGeneratePdf();
                setLoading(false);
            }
            // pdf.save(`raport-${new Date().valueOf()}.pdf`);
        }
        catch(e){
            console.log(e)
        }
    }

    const handleOpenModalRaport = (force = false) => {
        setOpenModalRaport(true)
    }
    
    return (
        <div className='flex flex-col gap-0 pb-10 px-10' ref={contentRef}>
            <Toaster position="top-center" />
            <div className='py-10 w-full hidden mt-[-30px] mb-10 bg-black items-center justify-center px-10 showOnPrint'>
                <Image src={logo.src} className='mt-[20px]' alt="Logo Gree" width={160} height={40} />
            </div>
            <div className="max-w-[1172px] w-full mx-auto mb-0">
                <div className='text-[32px] md:text-[50px] font-[600] max-w-[800px] uppercase leading-[110%]'>Pełny raport</div>
                <div className='text-[20px] md:text-[30px] leading-[36px] font-[400] mt-5 md:mt-10 max-w-[900px]'>Prezentujemy pełny raport</div>
            </div>

            {<div className='mt-10 onPrintMarginBottom'>
                <div className='flex flex-row items-center gap-2.5' ref={raportLinkRef}>
                    <p className='onPrintText14'>Raport jest dostępny pod adresem: <a href={`${links.host}/wynik/${formData.id}`} className='underline'>{links.host}/wynik/{formData.id}</a></p>
                    <Image 
                        onClick={() => {copyToClipboard(`${links.host}/wynik/${formData.id}`); toast.success('Poprawnie skopiowano link do schowka')}} 
                        src={copy.src} 
                        alt="copy icon" 
                        height={20} 
                        width={20} 
                        className='hover:cursor-pointer'
                    />
                </div>
            </div>}
            
            <div className='mt-10'>
                <CustomLabel label='Podstawowe informacje' />
                <div className='pt-2' />
                <InfoBox title='Rok budowy' value={formData.house_building_years ? formData.house_building_years : ''} />
                <InfoBox title='Lokalizacja' value={formData['house_location'] && formData['house_location']['full_name']} />
                <InfoBox title='Zapotrzebowanie cieplne' value={formData.heat_demand && formData.heat_demand.know ? `${formData.heat_demand.kW} kW` : 'Nie znam'} />
                <InfoBox title='Projektowa temperatura zewnętrzna' value={formData.heat_demand && formData.heat_demand.temp ? `${formData.heat_demand.temp}°C` : ''} />
                <InfoBox title='Zakładana temperatura w pomieszczeniu' value={formData.heat_assumed_temp ? formData.heat_assumed_temp : ''} />
            </div>

            <div className='mt-20'>
                <p className='text-[36px] md:text-[50px] font-[600] max-w-[800px] onPrintTopMarginExtra leading-[110%]'>Szacunkowe zapotrzebowanie na moc i energię cieplną</p>
                <div className='flex flex-col lg:flex-row mt-10 gap-5 lg:gap-16 items-start justify-start'>
                    <div className='pdf-padding-bottom flex flex-col w-full lg:w-auto text-white bg-[#FF4510] items-start justify-center py-2.5 px-5'>
                        <span className='font-[400] text-[24px]'>Moc grzewcza</span>
                        <div className='flex flex-row items-center gap-2.5'>
                            <span className='text-[30px] onPrintText20 font-[700]'>11,7kW</span>
                            <span className='font-[400] onPrintText20 text-[20px]'>(C.O. + CWU)</span>
                        </div>
                    </div>
                    <div className='pdf-padding-bottom flex w-full lg:w-auto flex-col text-white bg-[#FF4510] items-start justify-center py-2.5 px-5'>
                        <span className='font-[400] text-[24px]'>Energia cieplna</span>
                        <div className='flex flex-row items-center gap-2.5'>
                            <span className='text-[30px] onPrintText20 font-[700]'>~29 178kWh = 105GJ</span>
                            <span className='font-[400] text-[20px]'>(C.O. + CWU)</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mt-20 pagebreak'>
                <p className='text-[36px] md:text-[50px] font-[600] max-w-[800px] leading-[110%]'>Wymiary</p>
                <div className='grid grid-cols-1 md:grid-cols-10 gap-10 mt-10'>
                    <div className='flex flex-col md:col-span-4'>
                        <CustomLabel label='Obrys budynku' />
                        <div className='pt-2' />
                        <InfoBox title='Powierzchnia zabudowy' value={formData.building_area ? `${formData.building_area} mkw.` : ''} />
                        <div className='w-[100px] h-[1px] mt-7 mb-7 bg-[#FF1F1F]' />
                        <CustomLabel label='Układ pięter' />
                        <div className='pt-2' />
                        <InfoBox title='Dom jest' value={formData.house_floor_plan ? formData.house_floor_plan : ''} />
                        <InfoBox title='Dach jest' value={formData.house_roof_plan ? formData.house_roof_plan : ''} />
                        <InfoBox title='Dom jest podpiwniczony' value={formData.building_has_basement ? 'TAK' : 'NIE'} />
                        <InfoBox title='Które piętra są ogrzewane?' value={formData.heating_levels ? formData.heating_levels : ''} />
                        <InfoBox title='Wysokość pięter' value={formData.house_levels_height ? formData.house_levels_height : ''} />
                        <InfoBox title='Dom ma balkon(y)' value={formData.building_has_taras ? 'TAK' : 'NIE'} />
                        <InfoBox title='Garaż w bryle budynku' value={formData.house_garage ? formData.house_garage : ''} />
                        
                    </div>
                    <div className='md:col-span-6 bg-[#F8F8F8] flex items-center justify-center'>
                        <DynamicHouseSketch paddingLeft={false} setFormData={setFormData} formData={formData} />
                    </div>
                </div>
            </div>

            <div className='mt-20 pagebreak'>
                <p className='text-[36px] md:text-[50px] font-[600] max-w-[800px] leading-[110%]'>Ściany</p>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-10'>
                    <div>
                        <CustomLabel label='Rodzaj konstrukcji budynku' />
                        <div className='py-3' />
                        <p className='text-[16px] font-[700]'>{formData.building_construction_type ? formData.building_construction_type : '-'}</p>
                        <InfoBox title='Całkowita (razem z ew. dociepleniem) grubość ścian zewnętrznych' value={formData.total_wall_thickness ? `${formData.total_wall_thickness}cm` : ''} />
                        <div className='pb-4 pt-1' />
                        <CustomLabel label='Izolacja wewnątrz ściany' />
                        <InfoBox title='Ściana ma izolację w środku' value={formData.wall_insulation ? `TAK` : 'NIE'} />
                        <div className='my-7 w-[100px] h-[1px] bg-[#FF4510]' />
                        <CustomLabel label='Okna' />
                        <InfoBox title='Rodzaj okien' value={formData.windows_type ? formData.windows_type : ''} />
                        <InfoBox title='Liczba okien' value={formData.windows_number ? formData.windows_number : ''} />
                        <InfoBox title='Liczba drzwi balkonowych' value={formData.taras_doors_number ? formData.taras_doors_number : ''} />
                        <InfoBox title='Liczba dużych przeszkleń' value={formData.large_glazings_number ? formData.large_glazings_number : ''} />
                    </div>
                    <div>
                        <CustomLabel label='Materiały konstrukcyjne' />
                        <InfoBox title='Podstawowy materiał' value={formData.basic_construction_material ? formData.basic_construction_material : ''} />
                        <InfoBox title='Dodatkowy materiał' value={formData.additional_construction_material ? formData.additional_construction_material : ''} />
                        <div className='my-7 w-[100px] h-[1px] bg-[#FF4510]' />
                        <CustomLabel label='Docieplenie' />
                        <InfoBox title='Dom jest docieplony' value={formData.house_insulation ? 'TAK' : 'NIE'} />
                        {
                            formData.house_insulation &&
                            <>
                                <InfoBox title='Docieplenie od zewnątrz' value={formData.outside_insulation ? formData.outside_insulation : ''} />
                                <InfoBox title='Grubość' value={formData.insulation_thickness ? `${formData.insulation_thickness}cm` : ''} />
                            </>
                        }
                        <div className='my-7 w-[100px] h-[1px] bg-[#FF4510]' />
                        <CustomLabel label='Drzwi' />
                        <InfoBox title='Rodzaj drzwi zewnętrznych' value={formData.doors_type ? formData.doors_type : ''} />
                    </div>
                </div>
            </div>

            <div className='mt-20 pagebreak'>
                <p className='text-[36px] md:text-[50px] font-[600] max-w-[800px] leading-[110%]'>Poddasze i parter</p>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-10'>
                    <div>
                        <CustomLabel label='Izolacja dachu' />
                        <InfoBox title='Czy jest jakakolwiek izolacja dachu?' value={formData.is_roof_isolation ? formData.is_roof_isolation : ''} />
                        {
                            formData.is_roof_isolation && formData.is_roof_isolation.indexOf('Tak') >= 0 && 
                            <>
                                <InfoBox title='Materiał' value={formData.isolation_roof_material ? formData.isolation_roof_material : ''} />
                                <InfoBox title='Grubość' value={formData.isolation_roof_thickness ? `${formData.isolation_roof_thickness}cm` : ''} />
                            </>
                        }
                    </div>
                    <div>
                        <CustomLabel label='Izolacja wewnątrz ściany' />
                        <InfoBox title='Czy jest jakakolwiek izolacja podłogi parteru?' value={formData.is_parter_floor_isolation ? formData.is_parter_floor_isolation : ''} />
                        {
                            formData.is_parter_floor_isolation && formData.is_parter_floor_isolation.indexOf('Tak') >= 0 && 
                            <>
                                <InfoBox title='Materiał' value={formData.isolation_parter_floor_material ? formData.isolation_parter_floor_material : ''} />
                                <InfoBox title='Materiał' value={formData.isolation_parter_floor_thickness ? `${formData.isolation_parter_floor_thickness}cm` : ''} />
                            </>
                        }
                    </div>
                </div>
            </div>

            <div className='mt-20 pagebreak'>
                <p className='text-[36px] md:text-[50px] font-[600] max-w-[800px] leading-[110%]'>Ogrzewanie budynku</p>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-10'>
                    <div>
                        <InfoBox title='Główne źródło ciepła' value={formData.main_heat_source ? formData.main_heat_source : ''} />
                        <InfoBox title='Temperatura w pomieszczeniach ogrzewanych (Przeciętna temperatura utrzymywana zimą)' value={formData.temp_in_heat_rooms ? `${formData.temp_in_heat_rooms}°C` : ''} />
                        <InfoBox title='Rodzaj wentylacji' value={formData.vent_type ? formData.vent_type : ''} />
                        <InfoBox title='Materiał' value={formData.heating_isolation_material ? formData.heating_isolation_material : ''} />
                        <InfoBox title='Grubość' value={formData.heating_isolation_material_thickness ? `${formData.heating_isolation_material_thickness}cm` : ''} />
                    </div>
                    <div>
                        <CustomLabel label='Instalacja grzewcza' />
                        <p className='pt-2.5 onPrintLabel'>Przez inżynierów zwana Ciepłą Wodą Użytkową (CWU).</p>
                        <p className='pt-5 onPrintLabel'>Oblicz zapotrzebowanie energii na podgrzewanie CWU</p>
                        <p className='font-[700] pt-1 onPrintText14'>{formData.count_need_energy_cwu ? 'Tak' : 'Nie'}</p>
                        { formData.count_need_energy_cwu && 
                            <>
                                <InfoBox title='Ile osób używa ciepłej wody?' value={formData.hot_water_person_using ? formData.hot_water_person_using : ''} />
                                <InfoBox title='Jak intensywnie używana jest ciepła woda?' value={formData.hot_water_using_style ? formData.hot_water_using_style : ''} />
                            </>
                        }
                        <div className='my-7 w-[100px] h-[1px] bg-[#FF4510]' />
                        <CustomLabel label='Energia odnawialna' />
                        <p className='font-[700] mt-2.5 onPrintText14'>{!formData.hot_water_steroid_foto && !formData.how_water_steroid_kolektor ? 'brak' : `${formData.hot_water_steroid_foto ? 'Instalacja fotowoltaiczna' : ''}${formData.how_water_steroid_kolektor && formData.hot_water_steroid_foto ? ', Kolektory słoneczne' : formData.how_water_steroid_kolektor ? 'Kolektory słoneczne' : ''}`}</p>
                    </div>
                </div>
            </div>

            <div className='mt-20 pagebreak'>
                <p className='text-[30px] text-[#FF4510] font-[700]'>Sugerowane urządzenia do Twojego budynku</p>
                <div className='grid grid-cols-1 onPrintHardGrid3 onPrintSmaller mt-7 lg:grid-cols-3 gap-5 lg:gap-10'>
                {suggestedProducts && suggestedProducts.map((p: any) => {
                    return (
                        <SuggestedProductThumbnail suggestedProduct={p} />
                    )})
                }
                </div>
            </div>

            <div className='mt-20 pagebreak'>
                <p className='text-[30px] text-[#FF4510] font-[700] pb-10'>Rekomendowani instalatorzy</p>
                <RecommendedInstalators instalators={instalators} />
            </div>

            <div className={`flex flex-row gap-7 mt-14 hideOnPrint ${loading ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
                {/* <div onClick={() => reactToPrintFn()} className='product-link uppercase font-[700] h-[50px] flex items-center justify-center px-6 border border-[#FF4510] text-[#FF4510] hover:bg-[#FF4510] hover:text-white cursor-pointer transition-all duration-200'>
                    <span>wydrukuj</span>
                </div> */}
                {formData.raport_url && <div onClick={() => savetoPDF({first: false})} className='product-link uppercase font-[700] h-[50px] flex items-center justify-center px-6 border border-[#FF4510] text-[#FF4510] hover:bg-[#FF4510] hover:text-white cursor-pointer transition-all duration-200'>
                    <span>{loading ? 'trwa pobieranie...' : 'zapisz stronę'}</span>
                </div>}
                <div onClick={() => handleOpenModalRaport()} className='product-link uppercase font-[700] h-[50px] flex items-center justify-center px-6 border border-[#FF4510] text-[#FF4510] hover:bg-[#FF4510] hover:text-white cursor-pointer transition-all duration-200'>
                    <span>{loading ? 'trwa pobieranie...' : 'pobierz raport'}</span>
                </div>
            </div>

            { openModalRaport && <ShowRaportDetailsAdminModal automaticDownload={true} visible={openModalRaport} setVisible={setOpenModalRaport} data={formData} /> }
        </div>
    )
}

export default FullRaportPreview