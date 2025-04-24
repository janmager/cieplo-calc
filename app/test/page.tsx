'use client'
import { countKwForSpecificTemp } from '@/utils/api/countKwForSpecificTemp';
import { getPompaData } from '@/utils/api/getPompaData';
import { selectHeatPumps } from '@/utils/api/selectHeatPumps';
import { getAllProducts } from '@/utils/supabase/getAllProducts'
import { getCurrentMonthRaports } from '@/utils/supabase/getCurrentMonthRaports';
import { difference } from 'next/dist/build/utils';
import React, { useEffect, PureComponent, useState } from 'react'
type OutsideTemp = '-25' | '-20' | '-15' | '-10' | '-7' | '-2' | '2' | '7' | '10' | '15';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceArea } from 'recharts';

const range = ['-20', '-15', '-10', '-7', '-2', '2', '7', '10'].reverse()

function page() {
    const [ products, setProducts ] = useState<any>([])
    const [ apiDataReturn, setApiDataReturn ] = useState<any>([])

    const [ apiData, setApiData ] = useState({
        proj_temp_outside: -20,
        needed_kw: 0,
        temp_inside: 0,
        max_install_temp: 35,
        geo_biwa_point: -10
    })

    const count = () => {
        if(products.length == 0) return;
        
        const res = selectHeatPumps({
            max_install_temp: apiData.max_install_temp,
            proj_temp_outside: apiData.proj_temp_outside,
            needed_kw: apiData.needed_kw,
            temp_inside: apiData.temp_inside,
            products: products,
            all: true
        })

        let oldProds = products
        let out: any = []
        oldProds.map((prod: any) => {
            let single: any = res.find((r) => r.name == prod.desc)
            if(single){
                out[prod.desc] = {
                    isGood: single.differenceBivalent <= 2 ? true : false,
                    differenceBivalent: single.differenceBivalent,
                    currentBivalent: single.currentBivalent
                }
            }
        })

        setApiDataReturn(out)
    }

    useEffect(() => {
        const get = async () => {
            const prods = await getAllProducts()
            const currentMonthRaports: any = await getCurrentMonthRaports();

            if(prods.data) setProducts(prods.data)
        }
        get()
    }, [])
  return (
    <div className='py-20 max-w-[1550px] mx-auto px-5 w-full'>
        <h1 className='mt-10 font-[700] text-3xl tracking-tight'>Test sugerowanych produktów</h1>
        <div className='my-5 border border-gray-200 rounded w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 px-5 py-3'>
            <div className='flex gap-1 flex-col'>
                <label>Zapotrzebowanie cieplne (kW)</label>
                <input onChange={(e: any) => setApiData({...apiData, needed_kw: e.target.value})} value={apiData.needed_kw} className='px-2 py-1 border border-gray-200 rounded' type="number" placeholder='np. 8.45' />
            </div>
            <div className='flex gap-1 flex-col'>
                <label>Temperatura w pomieszczeniach (°C)</label>
                <input onChange={(e: any) => setApiData({...apiData, temp_inside: e.target.value})} value={apiData.temp_inside} className='px-2 py-1 border border-gray-200 rounded' type="number" placeholder='np. 21' />
            </div>
            <div className='flex gap-1 flex-col'>
                <label>Projektowa temperatura zewnętrzna (°C)</label>
                <select value={apiData.proj_temp_outside} onChange={(e: any) => setApiData({...apiData, proj_temp_outside: Number(e.target.value), geo_biwa_point: Number(e.target.value)/2})} className='px-2 py-1 border border-gray-200 rounded'>
                    <option value="-16">-16°C</option>
                    <option value="-18">-18°C</option>
                    <option value="-20">-20°C</option>
                    <option value="-22">-22°C</option>
                    <option value="-24">-24°C</option>
                </select>
                <p className='text-xs font-gray-600 mt-1'>Punkt biwalentny dla tej strefy: {(Number(apiData.proj_temp_outside)/2).toFixed(0)}°C</p>
            </div>
            <div className='flex gap-1 flex-col'>
                <label>Maksymalna moc instalacji (°C)</label>
                <select value={apiData.max_install_temp} onChange={(e: any) => setApiData({...apiData, max_install_temp: Number(e.target.value)})} className='px-2 py-1 border border-gray-200 rounded'>
                    <option value="25">25°C</option>
                    <option value="30">30°C</option>
                    <option value="35">35°C</option>
                    <option value="40">40°C</option>
                    <option value="45">45°C</option>
                    <option value="50">50°C</option>
                </select>
            </div>
            {
                Object.keys(apiDataReturn).filter((id: any) => apiDataReturn[id].isGood ? 1 : 0).length > 0 ? <div className='flex w-full items-center md:col-span-2 xl:col-span-4 justify-center text-sm text-center'>
                    <span>Łącznie <b className='font-[700]'>{Object.keys(apiDataReturn).filter((id: any) => apiDataReturn[id].isGood ? 1 : 0).length}</b> pasujących produktów</span>
                </div> : ""
            }
            <div onClick={count} className={`md:col-span-2 xl:col-span-4 bg-[#FF4510] text-white py-4 px-1 w-full rounded-lg hover:underline text-lg font-[600] text-center flex items-center justify-center leading-[100%] ${products.length == 0 ? 'opacity-20 cursor-default' : ' cursor-pointer'}`}>
                <span>Oblicz</span>
            </div>
        </div>
        <div className='w-full flex items-center gap-3 flex-row'>
            <div className='h-[30px] w-[30px] bg-[#ff7300] opacity-20'></div>
            <span className='text-gray-600 text-[14px]'>- zaznaczony tolerowany zakres punktu biwalentnego dla projektowej temperatury zewnętrznej ({apiData.geo_biwa_point} °C +/- 2°C)</span>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3 mt-5 w-full'>
            {
                products && products.length ? products.map((product: any, idx: number) => {
                    const d: any = []

                    range.map((r, i) => {
                        const pomp = getPompaData({
                            max_power: apiData.max_install_temp,
                            outside_temp: (r).toString() as OutsideTemp,
                            pompa: product
                        })
                        d.push({
                            name: r,
                            'Moc pompy ciepła': pomp,
                            'Zapotrzebowanie budynku': countKwForSpecificTemp({
                                power_kW: apiData.needed_kw,
                                temp_outside_climate: apiData.proj_temp_outside,
                                temp_inside_project: apiData.temp_inside,
                                temp_outside: Number(r)
                            }),
                        })
                    })

                    return (
                        <div className='w-full bg-gray-50 shadow rounded-lg py-5 h-full flex flex-col'>
                            <span className='pl-5 text-xl font-[700]'>{product.desc}</span>
                            <span className='pl-5 text-sm font-[300] text-gray-500'>{product.type}</span>
                            <span className='pl-5 text-sm font-[300] text-gray-500'>{product.name}</span>
                            <div className='flex flex-row gap-2 items-center pl-5 mt-2'>
                                <div style={{backgroundColor: apiDataReturn[product.desc]?.isGood ? 'green' : 'red'}} className='h-[17px] w-[17px] rounded-full'></div>
                                <span style={{color: apiDataReturn[product.desc]?.isGood ? 'green' : 'red'}} className='uppercase font-[600] mt-[1px]'>{apiDataReturn[product.desc]?.isGood ? 'poprawne' : 'niepoprawne'}</span>
                            </div>
                            {apiDataReturn[product.desc] && <div className='pl-5 flex flex-col'>
                                <span className='text-xs font-[400]'>Punkt biwalentny: <b className='font-[600]'>{apiDataReturn[product.desc].currentBivalent.toFixed(2)} °C</b></span>
                                <span className='text-xs font-[400]'>Różnica od idealnego punktu biwalentnego: <b className='font-[600]'>{apiDataReturn[product.desc].differenceBivalent.toFixed(2)} °C</b></span>
                            </div>}
                            <div className='mt-5 w-full h-[400px]'>
                                {apiData && <ResponsiveContainer width="99%" height="100%">
                                    <LineChart
                                    width={500}
                                    height={300}
                                    data={d}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                    >
                                    <ReferenceArea
                                        x1={apiData.geo_biwa_point-2}
                                        x2={apiData.geo_biwa_point+2}
                                        stroke="none"
                                        fill="#ff7300"
                                        fillOpacity={0.2}
                                    />
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        reversed
                                        type="number"
                                        dataKey="name"
                                        domain={[-20, 10]}
                                        />
                                    <YAxis type="number" domain={[2,17]} />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="Moc pompy ciepła" stroke="#8884d8" activeDot={{ r: 8 }} />
                                    <Line type="monotone" dataKey="Zapotrzebowanie budynku" stroke="#82ca9d" />
                                    </LineChart>
                                </ResponsiveContainer>}
                            </div>
                        </div>
                    )
                }) : ''
            }
        </div>
    </div>
  )
}

export default page