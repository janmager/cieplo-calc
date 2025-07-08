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
import loaderIco from '@/assets/svg/loader.svg'

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { supabase } from '@/utils/supabase/client';
import { updateRaportUrl } from '@/utils/supabase/updateRaportUrl';
import { getAllProducts } from '@/utils/supabase/getAllProducts';
import ShowRaportDetailsAdminModal from '@/app/admin/components/ShowRaportDetailsAdminModal';
import { Product } from '@prisma/client';
import { numberWithSpaces } from '@/utils/globals/numberWithSpaces';
import { findBestFitProduct } from '@/utils/api/findBestFitProduct';
import { saveSuggestedUpdate } from '@/utils/supabase/saveSuggestedUpdate';
import { selectHeatPumps } from '@/utils/api/selectHeatPumps';
import TooMuchkWInfo from '@/app/admin/components/TooMuchkWInfo';

function FullRaportPreview({formData, setFormData, step, setStep, singleView, autoDownload = false}: {formData: any, setFormData: any, step?: any, setStep?: any, singleView?: boolean, autoDownload?: boolean}) {
    const [ instalators, setInstalators ] = useState<any>(null) 
    const [ suggestedProducts, setSuggestedProducts ] = useState<any>(null) 
    const [ loading, setLoading ] = useState(true)
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

    const fetchSuggested = async () => {
        // const ins = await getAllInstalators();
        const products: any = await getAllProducts();

        let checkedProducts: any = selectHeatPumps({
            products: products.data, 
            proj_temp_outside: Number(formData.project_outside_temp), 
            needed_kw: formData.heat_demand.know ? Number(formData.heat_demand.kW) : Number(formData.api_max_heating_power) + Number(formData.api_hot_water_power ? formData.api_hot_water_power : 0),
            temp_inside: Number(formData.temp_in_heat_rooms),
            max_install_temp: Number(formData.max_temp_of_power_instalation.split(' ')[0])
        })
        
        let suggested: any = checkedProducts
        const saveSuggested = await saveSuggestedUpdate({id: formData.id, recommend: JSON.stringify(checkedProducts)})
        // autoDownload && handleOpenModalRaport(true);
        
        setSuggestedProducts(suggested.data ? suggested.data : suggested)
        setLoading(false)
    }

    useEffect(() => {
        if(instalators == null){
            fetchSuggested()
        }
    }, [])

    const contentRef = useRef<HTMLDivElement>(null);
    const raportLinkRef = useRef<any>(null);

    const reactToPrintFn = useReactToPrint({ 
        contentRef,
        onBeforePrint: async () => {
            document.title = `Raport-${links.host}-${formData.human_id}`;
        },
    });

    // generate pdf, save pdf to db, send email with download pdf url
    // const savetoPDF = async ({first = false}: {first?: boolean}) => {
    //     if(loading) return false;

    //     if(formData.raport_url){
    //         window.open(formData.raport_url);
    //         return false;
    //     }

    //     hideOnGeneratePdf();
    //     setLoading(true);
    //     try{
    //         const canvas = await html2canvas(contentRef.current!);
    //         const imgData = canvas.toDataURL('image/png');

    //         const pdf = new jsPDF({
    //             orientation: 'portrait',
    //             unit: 'px',
    //             format: [canvas.width, canvas.height],
    //         })

    //         const width = pdf.internal.pageSize.getWidth();
    //         const height = (canvas.height * width) / canvas.width;

    //         pdf.addImage(imgData, 'PNG', 0, 0, width, height, '', 'FAST');
    //         const out = pdf.output('blob');
    //         try{
    //             const {data,error} = await supabase.storage.from("raports").upload(`${formData.id}/raport-${new Date().valueOf()}.pdf`, out, {upsert: true, contentType: "application/pdf"});
            
    //             if (error) {
    //                 console.error("Error uploading file:", error.message);
    //                 toast.error('Wystąpił błąd podczas przesyłania raportu')
    //             } else {
    //                 showOnGeneratePdf();
    //                 const { data: file } = await supabase.storage.from("raports").getPublicUrl(data?.path);
    //                 setFormData({...formData, raport_url: file.publicUrl})
    //                 const updateRaportUrlDb = await updateRaportUrl({raportId: formData.id, raportUrl: file.publicUrl});

    //                 // if(updateRaportUrlDb.response && formData.send_raport_email){
    //                 //     try {
    //                 //         const response = await fetch('/api/mail/raport/send', {
    //                 //             method: 'post',
    //                 //             body: JSON.stringify({email: formData.send_raport_email, raportId: formData.id})
    //                 //         });
                    
    //                 //         if (!response.ok) {
    //                 //             throw new Error(`response status: ${response.status}`);
    //                 //         }
    //                 //         const responseData = await response.json();

    //                 //         setLoading(false);
    //                 //         setLoading(false)
    //                 //         // if(!first)toast.success('Poprawnie wygenerowano PDF')
    //                 //     }
    //                 //     catch(e){
    //                 //         console.log(e);
    //                 //         if(!first) toast.error('Wystąpił błąd podczas wysyłania raportu do klienta')
    //                 //         setLoading(false)
    //                 //     }   
    //                 // }
    //                 // else if(!updateRaportUrlDb.response){
    //                 //     if(!first) toast.error('Wystąpił błąd podczas generowania PDF')
    //                 // }
    //                 if(updateRaportUrlDb.response) setLoading(false);
    //                 else{
    //                     toast.error('Wystąpił błąd podczas generowania raportu')
    //                 }
    //             }
    //         }
    //         catch(e){ 
    //             toast.error('Wystąpił błąd podczas przesyłania raportu')
    //             showOnGeneratePdf();
    //             setLoading(false);
    //         }
    //         // pdf.save(`raport-${new Date().valueOf()}.pdf`);
    //     }
    //     catch(e){
    //         console.log(e)
    //     }
    // }

    const handleOpenModalRaport = (force = false) => {
        setOpenModalRaport(true)
    }

    if(loading){
        return <div className='pt-20 pb-20'>
            <img src={loaderIco.src}  className='h-10 w-10 animate-spin opacity-10' />
        </div>
    }
    
    return (
        <div className='flex flex-col gap-0 pb-0 px-5 md:px-10' ref={contentRef}>
            <Toaster position="top-center" />
            <div className='py-10 w-full hidden mt-[-30px] mb-5 bg-black items-center justify-center px-10 showOnPrint'>
                <Image src={logo.src} className='mt-[20px]' alt="Logo Gree" width={160} height={40} />
            </div>
            <div className="max-w-[1172px] w-full mx-auto mb-0">
                <div className='text-[32px] md:text-[48px] font-[600] max-w-[1000px] uppercase tracking-tighter leading-[110%]'>Raport doboru mocy pompy ciepła GREE</div>
                
                <div className='mt-5 pagebreak'>
                    <p className='text-[24px] md:text-[30px] text-[#FF4510] font-[700] max-md:tracking-wide'>Sugerowane urządzenia do Twojego budynku</p>
                    <div className='grid grid-cols-1 onPrintHardGrid3 onPrintSmaller mt-7 lg:grid-cols-3 gap-5 lg:gap-5'>
                    {suggestedProducts && suggestedProducts.length ? suggestedProducts.map((p: any) => {
                        return (
                            <SuggestedProductThumbnail key={p.product.id} suggestedProduct={p.product} />
                        )}) : 
                        <TooMuchkWInfo />
                    }
                    </div>
                </div>

                {formData.building_type ? <div className='text-[20px] md:text-[30px] leading-[36px] font-[400] mt-5 md:mt-10 max-w-[900px]'>{formData.building_type} {formData.house_floor_plan.toLowerCase()}</div> : ''}
                {formData.building_type ? <div className='mt-2 text-gray-500'>ogrzewane {formData.api_heated_area}m², {formData.house_building_years.indexOf('-') >= 0 ? 'lata' : 'rok'} {formData.house_building_years}, {formData.house_location.full_name.split(',')[2] ? formData.house_location.full_name.split(',')[2].trim() : ""}</div> : ''}
            </div>

            {formData.id && <div className='mt-5 onPrintMarginBottom'>
                <div className='flex flex-col md:flex-row items-start md:items-center gap-2.5' ref={raportLinkRef}>
                    <p className='onPrintText14'>Raport jest dostępny pod adresem: </p>
                    <div className='flex flex-row gap-4 md:gap-2 items-center justify-center'>
                        <span onClick={() => { window.parent.postMessage({ type: 'redirectTo', id: formData.id }, '*')}} className='underline cursor-pointer hover:underline'>{`${process.env.NEXT_PUBLIC_TARGET_PAGE}/kalkulator-wynik?hash=`}{formData.id.substring(0,4)}...</span>
                        <Image 
                            onClick={() => {copyToClipboard(`${process.env.NEXT_PUBLIC_TARGET_PAGE}/kalkulator-wynik?hash=${formData.id}`); toast.success('Poprawnie skopiowano link do schowka')}} 
                            src={copy.src} 
                            alt="copy icon" 
                            height={20} 
                            width={20} 
                            className='hover:cursor-pointer mt-[-3px]'
                        />
                    </div>
                </div>
            </div>}
            
            <div className='mt-10'>
                <CustomLabel label='W skrócie o budynku' />
                <div className='pt-2' />
                <div className='grid md:grid-cols-3 gap-5 w-full'>
                    <div className='flex flex-col w-full'>
                        <InfoBox title='Lokalizacja' value={`${formData.house_location.full_name.split(',')[2] ? formData.house_location.full_name.split(',')[2].trim() : ''}${formData.house_location.full_name.split(',')[4] ? `, ${formData.house_location.full_name.split(',')[4].trim()}` : ''}`} />
                        {formData.house_location.full_name.split(',')[2] ? <p className='text-[12px] font-[300] text-gray-500 mt-[-2px]'>Dane klimatyczne dla m. {formData.house_location.full_name.split(',')[2].trim()}, PL</p> : null}
                    </div>
                    {formData.building_type ? <InfoBox title='Powierzchnia ogrzewana' value={`${formData.api_heated_area} m²`} /> : ''}
                    {/* <InfoBox title='Jakość izolacji' value={'x'} /> */}
                    <InfoBox title='Średnia temperatura w domu' value={formData.temp_in_heat_rooms ? `${formData.temp_in_heat_rooms} °C` : '? °C'} />
                    <InfoBox title='Maksymalna temperatura instalacji' value={formData.max_temp_of_power_instalation ? `${formData.max_temp_of_power_instalation}` : '? °C'} />
                    {formData.building_type ? <div className='flex flex-col w-full md:col-span-2 md:mt-[-16px]'>
                        <InfoBox title='Ogrzewanie' value={`${formData.main_heat_sources}`} />
                        <p className='text-[12px] font-[300] text-gray-500 mt-[-2px]'>Instalacja c.o: {formData.type_of_heating_instalation}, max. temp. {formData.max_temp_of_power_instalation}</p>
                    </div> : ''}
                </div>
                {/* <InfoBox title='Rok budowy' value={formData.house_building_years ? formData.house_building_years : ''} />
                <InfoBox title='Lokalizacja' value={formData['house_location'] && formData['house_location']['full_name']} />
                <InfoBox title='Zapotrzebowanie cieplne' value={formData.heat_demand && formData.heat_demand.know && formData.heat_demand.kW ? `${formData.heat_demand.kW} kW` : `${(Number(formData.api_max_heating_power) + (formData.api_hot_water_power ? Number(formData.api_hot_water_power) : 0)).toFixed(2)} kW`} />
                <InfoBox title='Projektowa temperatura zewnętrzna' value={formData.project_outside_temp ? `${formData.project_outside_temp} °C` : '? °C'} />
                <InfoBox title='Zakładana temperatura w pomieszczeniu' value={formData.temp_in_heat_rooms ? `${formData.temp_in_heat_rooms} °C` : '? °C'} /> */}
            </div>

            {(formData.heat_demand_know || formData.api_bivalent_point_heating_power) && <div className='mt-10 md:mt-20'>
                <p className={`text-[28px] md:text-[40px] ${formData.heat_demand_know ? 'xl:text-[40px]' : 'xl:text-[50px]'} font-[600] max-w-[800px] onPrintTopMarginExtra leading-[110%]`}>{formData.heat_demand_know ? 'Z' : 'Szacunkowe z'}apotrzebowanie na moc i energię cieplną</p>
                <div className='flex flex-col lg:flex-row mt-10 mb-10 gap-5 lg:gap-10 items-start justify-start'>
                    <div className='pdf-padding-bottom flex flex-col w-full md:w-auto text-white bg-[#FF4510] items-center md:items-start justify-start py-2.5 pl-7 pr-7 md:pr-10'>
                        <span className='font-[700] text-[32px]'>Moc grzewcza</span>
                        <div className='flex flex-col items-center md:items-start gap-0'>
                            <span className='text-[48px] mt-[-8px] onPrintText20 font-[700]'>{formData.heat_demand_know ? formData.heat_demand_kW : formData.api_max_heating_power ? (Number(formData.api_max_heating_power) + (formData.api_hot_water_power ? Number(formData.api_hot_water_power) : 0)).toFixed(2) : '?'}kW</span>
                            <p className='font-[400] onPrintText20 mt-[-3px] pb-2 text-[20px]'>(C.O. + CWU)</p>
                        </div>
                    </div>
                    {!formData.heat_demand_know && <div className='pdf-padding-bottom flex flex-col w-full lg:w-auto text-white bg-[#FF4510] items-center md:items-start justify-center py-2.5 px-7'>
                        <span className='font-[700] max-md:text-center text-[32px]'>Maksymalna moc grzewcza</span>
                        <div className='flex flex-row items-center gap-2.5'>
                            <span className='text-[48px] mt-[-8px] onPrintText20 font-[700]'>{formData.api_max_heating_power ? (Number(formData.api_max_heating_power)).toFixed(2) : '?'}kW</span>
                            <span className='font-[400] mt-[2px] onPrintText20 text-[20px]'>(C.O)</span>
                        </div>
                        <p className='text-[13px] max-w-[400px] max-md:text-center opacity-100 font-[300]'>w "najmroźniejszy" dzień zimy, tj. przy średniej dobowej za oknem <b>{Number(formData.api_design_outdoor_temperature).toFixed(1)} °C</b> i średniej temperaturze w domu <b>{Number(formData.temp_in_heat_rooms).toFixed(1)} °C</b></p>
                    </div>}
                    {/* <div className='pdf-padding-bottom flex w-full lg:w-auto flex-col text-white bg-[#FF4510] items-start justify-center py-2.5 px-5'>
                        <span className='font-[400] text-[24px]'>Energia cieplna</span>
                        <div className='flex flex-row items-center gap-2.5'>
                            <span className='text-[30px] onPrintText20 font-[700]'>~{formData.api_annual_energy_consumption ? numberWithSpaces(formData.api_annual_energy_consumption+(Number(formData.api_hot_water_power)*15400), 0) : '?'}kWh = {formData.api_annual_energy_consumption ? numberWithSpaces(((formData.api_annual_energy_consumption+(Number(formData.api_hot_water_power)*15400)) * 0.0036), 2) : '?'}GJ</span>
                            <span className='font-[400] text-[20px]'>(C.O. + CWU)</span>
                        </div>
                    </div> */}
                </div>
                {!formData.heat_demand_know && <InfoBox title='Wskaźnik zapotrzebowania na moc grzewczą' value={`${Number(formData.api_heating_power_factor).toFixed(1)} W/m²`} />}
            </div>}

            {formData.building_type && <div className='mt-10 md:mt-20 pagebreak'>
                <p className='text-[36px] md:text-[50px] font-[600] max-w-[800px] leading-[110%]'>Wymiary</p>
                <div className='grid grid-cols-1 md:grid-cols-10 gap-10 mt-10'>
                    <div className='flex flex-col md:col-span-4'>
                        <CustomLabel label='Obrys budynku' />
                        <div className='pt-2' />
                        <InfoBox title='Powierzchnia zabudowy' value={formData.building_area ? `${formData.building_area} m²` : formData.building_outline_width_m ? `${formData.building_outline_width_m}m x ${formData.building_outline_length_m}m` : ''} />
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
            </div>}

            {formData.building_type && <div className='mt-10 md:mt-20 pagebreak'>
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
            </div>}

            {formData.building_type && <div className='mt-10 md:mt-20 pagebreak'>
                <p className='text-[36px] md:text-[50px] font-[600] max-w-[800px] leading-[110%]'>Poddasze i parter</p>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-10'>
                    <div>
                        <CustomLabel label='Izolacja stropu między poddaszem, a piętrem poniżej' />
                        <InfoBox title='Czy jest jakakolwiek izolacja stropu między poddaszem, a piętrem niżej?' value={formData.is_roof_isolation ? formData.is_roof_isolation : ''} />
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
                    {
                        (!formData.heat_demand_know && formData.heating_levels.indexOf('Poddasze') == -1 && formData.house_roof_plan && formData.house_roof_plan.toLowerCase() == 'skośny z poddaszem') && !formData.heat_demand_know && 
                        <div className='md:col-span-2'>
                            <InfoBox title='Jak wygląda sytuacja na nieogrzewanym poddaszu?' value={formData.unheated_space_type ? formData.unheated_space_type : ''} />
                        </div>
                    }
                </div>
            </div>}

            {formData.building_type && <div className='mt-10 md:mt-20 pagebreak'>
                <p className='text-[36px] md:text-[50px] font-[600] max-w-[800px] leading-[110%]'>Ogrzewanie budynku</p>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-10'>
                    <div>
                        <InfoBox title='Główne źródło ciepła' value={formData.main_heat_sources ? formData.main_heat_sources : ''} />
                        <InfoBox title='Rodzaj wentylacji' value={formData.vent_type ? formData.vent_type : ''} />
                        {formData.heating_isolation_material && <InfoBox title='Materiał' value={formData.heating_isolation_material ? formData.heating_isolation_material : ''} />}
                        {formData.heating_isolation_material_thickness && <InfoBox title='Grubość' value={formData.heating_isolation_material_thickness ? `${formData.heating_isolation_material_thickness}cm` : ''} />}
                    </div>
                    <div>
                        <CustomLabel label='Instalacja grzewcza' />
                        <p className='pt-2.5 onPrintLabel'>Przez inżynierów zwana Ciepłą Wodą Użytkową (CWU).</p>
                        <p className='pt-1.5 onPrintLabel'>Oblicz zapotrzebowanie energii na podgrzewanie CWU</p>
                        <p className='font-[700] pt-1 onPrintText14'>{formData.count_need_energy_cwu ? 'Tak' : 'Nie'}</p>
                        { formData.count_need_energy_cwu && 
                            <>
                                <InfoBox title='Ile osób używa ciepłej wody?' value={formData.hot_water_person_using ? formData.hot_water_person_using : ''} />
                                <InfoBox title='Jak intensywnie używana jest ciepła woda?' value={formData.hot_water_using_style ? formData.hot_water_using_style : ''} />
                            </>
                        }
                        {/* <div className='my-7 w-[100px] h-[1px] bg-[#FF4510]' />
                        <CustomLabel label='Energia odnawialna' />
                        <p className='font-[700] mt-2.5 onPrintText14'>{!formData.hot_water_steroid_foto && !formData.how_water_steroid_kolektor ? 'brak' : `${formData.hot_water_steroid_foto ? 'Instalacja fotowoltaiczna' : ''}${formData.how_water_steroid_kolektor && formData.hot_water_steroid_foto ? ', Kolektory słoneczne' : formData.how_water_steroid_kolektor ? 'Kolektory słoneczne' : ''}`}</p> */}
                    </div>
                </div>
            </div>}

            {/* {formData.api_max_heating_power && <div className='mt-20 pagebreak'>
                <p className='text-[36px] md:text-[50px] font-[600] max-w-[800px] leading-[110%]'>Obliczone zapotrzebowanie</p>
                <div className='grid grid-cols-1 gap-10 mt-10'>
                    <div>             
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>        
                            <InfoBox title='Całkowita powierzchnia budynku' value={formData.api_total_area ? `${formData.api_total_area} m²` : '-'} />
                            <InfoBox title='Ogrzewana powierzchnia budynku' value={formData.api_heated_area ? `${formData.api_heated_area} m²` : '-'} />
                        </div> 
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>   
                            <InfoBox title='Maksymalna moc grzewcza na potrzeby wyłącznie ogrzewania budynku w najzimniejszym dniu zimy (dla projektowej temperatury zewnętrznej)' value={formData.api_max_heating_power ? `${Number(formData.api_max_heating_power).toFixed(2)} kW` : '-'} />
                            <InfoBox title='Przeciętna moc grzewcza na potrzeby wyłącznie ogrzewania budynku przy średniej zimowej temperaturze zewnętrznej' value={formData.api_avg_heating_power ? `${Number(formData.api_avg_heating_power).toFixed(2)} kW` : '-'} />      
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>  
                            <InfoBox title='Moc grzewcza w punkcie biwalentnym, tj. przy temperaturze zewnętrznej wyliczonej odpowiednio dla strefy klimatycznej, w której znajduje się budynek' value={formData.api_bivalent_point_heating_power ? `${formData.api_bivalent_point_heating_power} kW` : '-'} />
                            <InfoBox title='Średnia temperatura zewnętrzna w ciągu sezonu grzewczego na podstawie danych klimatycznych' value={formData.api_avg_outdoor_temperature ? `${formData.api_avg_outdoor_temperature} °C` : '-'} />    
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>   
                            <InfoBox title='Całkowite roczne zużycie energii na potrzeby wyłącznie ogrzewania budynku (nie jest w to wliczone przygotowanie CWU)' value={formData.api_annual_energy_consumption ? `${Number(formData.api_annual_energy_consumption).toFixed(2)} kWh` : '-'} />
                            <InfoBox title='Współczynnik zapotrzebowania na ciepło.' value={formData.api_annual_energy_consumption_factor ? `${Number(formData.api_annual_energy_consumption_factor).toFixed(2)} kWh/m²` : '-'} />      
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'> 
                            <InfoBox title='Współczynnik zapotrzebowania na moc grzewczą' value={formData.api_heating_power_factor ? `${Number(formData.api_heating_power_factor).toFixed(2)} W/m²` : '-'} />
                            <InfoBox title='Projektowa temperatura zewnętrzna w danej lokalizacji, dla której liczona jest maksymalna wymagana moc grzewcza na potrzeby wyłącznie ogrzewania budynku' value={formData.api_design_outdoor_temperature ? `${formData.api_design_outdoor_temperature} °C` : '-'} />      
                        </div>
                        {formData.api_hot_water_power && <div className='grid grid-cols-1 gap-10'>  
                            {formData.api_hot_water_power && <InfoBox title='Dodatkowa moc grzewcza na potrzeby przygotowania CWU' value={formData.api_hot_water_power ? `${formData.api_hot_water_power} kW` : '-'} />}         
                        </div>}
                    </div>
                </div>
            </div>} */}

            {/* <div className='mt-20 pagebreak'>
                <p className='text-[30px] text-[#FF4510] font-[700] pb-10'>Rekomendowani instalatorzy</p>
                <RecommendedInstalators instalators={instalators} />
            </div> */}

            <div className={`flex flex-col sm:flex-row gap-7 md:mt-14 hideOnPrint ${loading ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
                {/* <div onClick={() => reactToPrintFn()} className='product-link uppercase font-[700] h-[50px] flex items-center justify-center px-6 border border-[#FF4510] text-[#FF4510] hover:bg-[#FF4510] hover:text-white cursor-pointer transition-all duration-200'>
                    <span>wydrukuj</span>
                </div> */}
                <div onClick={() => {copyToClipboard(`${process.env.NEXT_PUBLIC_TARGET_PAGE}/kalkulator-wynik?hash=${formData.id}`); toast.success('Poprawnie skopiowano link do schowka')}} className='product-link uppercase font-[700] h-[50px] flex items-center justify-center px-6 border border-[#FF4510] text-[#FF4510] hover:bg-[#FF4510] hover:text-white cursor-pointer transition-all duration-200'>
                    <span>kopiuj link do raportu</span>
                </div>
                <div onClick={() => handleOpenModalRaport()} className='product-link uppercase font-[700] h-[50px] flex items-center justify-center px-6 border border-[#FF4510] text-[#FF4510] hover:bg-[#FF4510] hover:text-white cursor-pointer transition-all duration-200'>
                    <span>{loading ? 'trwa pobieranie...' : 'pobierz raport pdf'}</span>
                </div>
            </div>

            <div className='flex w-full mt-10 flex-col gap-5 text-xs md:text-sm text-gray-400 font-[400]'>
                <p className='leading-[200%]'>Raport pochodzi z autorskiego kalkulatora doboru mocy pompy ciepła GREE.</p>

                <p className='leading-[200%]'>Kalkulator doboru mocy pompy ciepła został przygotowany z najwyższą starannością, jednak jego poprawne działanie zależy od prawidłowego wprowadzenia danych wejściowych przez użytkownika. Nie ponosimy odpowiedzialności za ewentualne błędne wyniki wynikające z nieprawidłowych lub niepełnych danych. Kalkulator ma charakter pomocniczy i nie zastępuje profesjonalnego projektu instalacji</p>
            </div>

            { openModalRaport && <ShowRaportDetailsAdminModal automaticDownload={false} visible={openModalRaport} setVisible={setOpenModalRaport} data={formData} /> }
        </div>
    )
}

export default FullRaportPreview