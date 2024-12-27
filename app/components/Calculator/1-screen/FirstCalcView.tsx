import React, { useEffect, useState } from 'react'
import bg from '@/assets/png/bg-image.png'
import loader from '@/assets/svg/loader.svg'
import CustomDropdownSelect from '../../Customs/CustomDropdownSelect'
import { house_building_years } from '@/app/consts/house_building_years'
import CustomLabel from '../../Customs/CustomLabel'
import NextButton from '../../Customs/NextButton'
import Image from 'next/image'
import infoIcon from '@/assets/svg/red-info-icon.svg'
// @ts-ignore
import proj4 from 'proj4'
import "ol/ol.css";
import Map from "ol/map";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import OSM from "ol/source/OSM";
import * as olProj from 'ol/proj';
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import Icon from 'ol/style/Icon'
import Style from 'ol/style/Style'
import { Feature } from 'ol'
import { Point } from 'ol/geom'
import mapPin from '@/assets/svg/map-pin.svg'
import checkSelectBorder from '@/assets/svg/select-border.svg'
import checkSelectDot from '@/assets/svg/select-dot.svg'
import InputWithPlaceholder from '../../Customs/InputWithPlaceholder'

function FirstCalcView({formData, setFormData, setViewId}: {formData: any, setFormData: any, setViewId: any}) {  
    const [ clickedMap, setClickedMap ] = useState<any>({})  
    const [ loading, setLoading ] = useState(false)

    useEffect(() => {
        const map = new Map({
          target: "map",
          layers: [
            new TileLayer({
              source: new OSM(),
            }),
          ],
          view: new View({
            center: [2130029.282397711,6785475.626968577],
            zoom: 6,
          }),
        });

        let iconFeature, vectorSource, vectorLayer: any;
        var iconStyle = new Style({
            image: new Icon({
                anchor: [0.5, 0.5],
                src: mapPin.src,
                height: 30,
                width: 23,
            })
          });

        map.on('click', async function(evt) {
            if(loading) return false;
            setLoading(true)
            let x = proj4('EPSG:3857', 'EPSG:4326',evt.coordinate);
            const pinInfo: any = await fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + x[0] + '&lat=' + x[1])

            // @ts-ignore
            map.removeLayer(vectorLayer);
            if(pinInfo){
                let data = await pinInfo.json();
                setClickedMap({
                    lat: x[1],
                    lng: x[0],
                    full_name: `${data.address.road ? `${data.address.road}, ` : ''}${data.address.postcode ? `${data.address.postcode}, ` : ''}${data.address.city ? `${data.address.city}, ` : ''}${data.address.state ? `${data.address.state}, ` : ''}${data.address.country ? `${data.address.country}` : ''}`,
                })
                iconFeature = new Feature({
                    geometry: new Point(proj4('EPSG:4326', 'EPSG:3857', x))
                  });
              
                  iconFeature.setStyle(iconStyle);
              
                  vectorSource = new VectorSource({
                    features: [iconFeature]
                  });
              
                  vectorLayer = new VectorLayer({
                    source: vectorSource
                  });
              
                  map.addLayer(vectorLayer);
                  map.getView().setCenter(proj4('EPSG:4326', 'EPSG:3857', x));
                  setLoading(false)
            }
            
        });
    
        return () => {
          map.setTarget();
        };
    }, []);

    useEffect(() => {
        clickedMap.lat && clickedMap.lng && setFormData({...formData, house_location: {
            lat: clickedMap.lat,
            lng: clickedMap.lng,
            full_name: clickedMap.full_name
        }})
    }, [clickedMap])
  
    return (
    <div className='flex flex-col items-center w-full'>
        <div style={{backgroundImage: `url(${bg.src})`, backgroundAttachment: 'fixed', backgroundSize: 'cover',}} className='w-full relative flex items-end justify-center h-[625px]'>
            <div className='max-w-[1172px] px-5 xl:px-0 text-white flex flex-col gap-8 pb-8 z-20'>
                <h1 className='text-[40px] sm:text-[60px] lg:text-[80px] font-bold leading-[110%]'>Kalkulator doboru<br/>pompy ciepła</h1>
                <h2 className='text-[15px] md:text-[20px] font-light opacity-75'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed <b>do eiusmod tempor incididunt</b> ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </h2>
            </div>
            <div className='absolute w-full h-full bg-black opacity-70'></div>
        </div>
        <div className='py-10 px-5 w-full max-w-[1172px] flex flex-col lg:grid grid-cols-1 lg:grid-cols-2'>
            <div className='flex w-full flex-col  gap-4'>
                <CustomLabel label={'Lata budowy domu'} />
                <CustomDropdownSelect formDataValue={'house_building_years'} options={house_building_years} setFormData={setFormData} formData={formData} placeholder={'2027+'} />
            </div>
            <div className='flex w-full flex-col gap-3 lg:col-span-2 mt-7'>
                <CustomLabel label={'Wybierz lokalizację budynku'} />
                {
                    formData['house_location'] ?
                    <div className='border font-bold bg-[#FF4510]/5 border-[#FF4510] text-[#FF4510] mt-1 min-h-[50px] flex items-center px-5 py-2'>
                        {formData['house_location']['full_name']}
                    </div> : 
                    <div className='bg-[#F8F8F8] w-full min-h-[50px] mt-1 py-2 flex-row gap-4 flex items-center pl-5'>
                        <Image src={infoIcon.src} height={24} width={24} alt="info icon" />
                        <span className='tx-[16px]'>Wystarczy, że wskażesz miejscowość, w której znajduje się budynek.</span>
                    </div>
                }
                <div className={`max-h-[480px] transition-all relative cursor-pointer duration-300 bg-gray-100 ${!formData['house_location'] ? 'grayscale hover:grayscale-0' : ``}`}>
                    {/* {loading && <div className='flex bg-black/80 items-center justify-center z-30 w-full h-full absolute left-0 top-0'>
                        <Image src={loader.src} height={24} width={24} alt="loader icon" className='animate-spin' />
                    </div>} */}
                    <div id="map" className='z-20' style={{width: "100%", height: "450px"}}/>
                </div>
            </div>
            <div className='flex w-full flex-col gap-3 lg:col-span-2 mt-10 mb-20'>
                <CustomLabel label={'Podaj zapotrzebowanie cieplne swojego budynku:'} />
                <div className='grid grid-cols-1 md:grid-cols-2 mt-5 gap-10 md:gap-10'>
                    <div className='flex flex-col pl-0'>
                        <div className='md:max-w-[275px] flex flex-row items-start gap-3 cursor-pointer opacity-90 hover:opacity-100 duration-200 transition-all' onClick={() => setFormData({...formData, heat_demand: {...formData.heat_demand, know: true, kW: '', temp: ''}})}>
                            <div className='relative min-h-[18px] min-w-[18px] max-h-[18px] max-w-[18px]'>
                                <Image src={checkSelectBorder.src} className={formData.heat_demand && formData.heat_demand.know ? '' : 'opacity-50'} height={18} width={18} alt={'border'} />
                                {formData.heat_demand && formData.heat_demand.know && <Image className='absolute left-[3.5px] top-[4.5px]' src={checkSelectDot.src} height={10} width={10} alt={'dot'} />}
                            </div>
                            <span className='mt-[-4px]'><b>Znam</b> zapotrzebowanie cieplne swojego budynku </span>
                        </div>
                        {
                            formData.heat_demand && formData.heat_demand.know &&
                            <div>
                                <div className='flex flex-row gap-4 items-start mt-5 md:mt-10'>
                                    <Image src={infoIcon.src} height={24} width={24} alt="info icon" />
                                    <span className='mt-[-4px]'>W przypadku nowszych budynków taką informację znajdziesz w projekcie budowlanym. Wcześniej zweryfikuj czy budynek zostałwykonany zgodnie z projektem.</span>
                                </div>
                                <div className='mt-5 flex flex-col gap-2'>
                                    <label>Zapotrzebowanie cieplne</label>
                                    <InputWithPlaceholder type={'number'} placeholder={'kW'} formDataValue1={'heat_demand'} formDataValue2={'kW'} setFormData={setFormData} formData={formData} />
                                </div>
                            </div>
                        }
                    </div>
                    <div className='flex flex-col border-0 md:border-l-2 pl-0 md:pl-10'>
                        <div className='md:max-w-[320px] flex flex-row items-start gap-3 cursor-pointer opacity-90 hover:opacity-100 duration-200 transition-all' onClick={() => setFormData({...formData, heat_demand: {...formData.heat_demand, know: false, kW: '', temp: ''}})}>
                            <div className='relative min-h-[18px] min-w-[18px] max-h-[18px] max-w-[18px]'>
                                <Image src={checkSelectBorder.src} className={formData.heat_demand && !formData.heat_demand.know ? '' : 'opacity-50'} height={18} width={18} alt={'border'} />
                                {formData.heat_demand && !formData.heat_demand.know && <Image className='absolute left-[3.5px] top-[4.5px]' src={checkSelectDot.src} height={10} width={10} alt={'dot'} />}
                            </div>
                            <span className='mt-[-4px]'><b>Nie znam</b> zapotrzebowania cieplnego mojego budynku i chcę go policzyć</span>
                        </div>
                        {
                            formData.heat_demand && !formData.heat_demand.know &&
                            <div>
                                <div className='mt-5 md:mt-10 flex flex-col gap-2'>
                                    <label>Podaj projektową temperaturę pomieszczenia.</label>
                                    <InputWithPlaceholder type={'number'} placeholder={'C°'} formDataValue1={'heat_demand'} formDataValue2={'temp'} setFormData={setFormData} formData={formData} />
                                    <span className='mt-1 text-[14px] font-light opacity-50'>Informację odczytaj z projektu budowlanego lub audytu energetycznego</span>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className='col-span-2 flex justify-end items-end'>
                <NextButton active={!loading && formData['house_location'] && (formData.heat_demand && (parseFloat(formData.heat_demand.kW) > 0 || parseFloat(formData.heat_demand.temp) > 0)) && formData.house_building_years} setViewId={setViewId} nextView={2} />
            </div>
        </div>
    </div>
  )
}

export default FirstCalcView