import { FileUploader } from "react-drag-drop-files";
import React, { useState } from 'react'
import trashIcon from '@/assets/svg/trash-icon.svg'

const fileTypes = ["JPG", "PNG", "GIF"];
import { createClient } from '@supabase/supabase-js';
import toast from "react-hot-toast";
import { addProduct } from "@/utils/supabase/addProduct";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;
export const supabase: any = createClient(supabaseUrl, supabaseKey);

function AddNewProductView() {
    const [ loading, setLoading ] = useState(false);
    const [ valid, setValid ] = useState(true);
    const [ successUpload, setSuccessUpload ] = useState(false);
    
    const [ newProduct, setNewProduct ] = useState<any>({
        id: crypto.randomUUID(),
        name: '',
        desc: '',
        product_link: '',
        image: '',
    })

    const handleAddNewProduct = async () => {
        if(loading) return false;
        if(!valid) return false;

        let addProductResult: any = await addProduct(newProduct)

        if(addProductResult.response){
            toast.success('Zapisano poprawnie nowy produkt')
            setSuccessUpload(false)
            setLoading(false)
            setNewProduct({id: crypto.randomUUID(), name: '', desc: '', image: '', product_link: ''})
            setValid(false)
        }
        else {
            toast.error('Wystąpił błąd podczas zapisywania nowego produktu')
            return false;
        }
    }

    const [file, setFile] = useState(null);
    const handleChange = async (file: any) => {
        setFile(file);
        setLoading(true)

        try{
            const {data,error} = await supabase.storage.from("products").upload(`${newProduct.id}/image.${file.name.split(".").pop()}`, file, { upsert: true });
        
            if (error) {
                console.error("Error uploading file:", error.message);
                setLoading(false)
                toast.error('Wystąpił błąd podczas zapisywania zdjecia')
            } else {
                const { data: file } = await supabase.storage.from("products").getPublicUrl(data?.path);
                setNewProduct({...newProduct, image: file.publicUrl})
                setLoading(false)
                setSuccessUpload(true)
            }
        }
        catch(e){ 
            setLoading(false)
            toast.error('Wystąpił błąd podczas zapisywania zdjecia')
        }
    };

    return (
        <div className='flex flex-col gap-5 items-start max-w-[742px]'>
            <div className='flex w-full flex-1 flex-col gap-1'>
                <label>Nazwa</label>
                <input onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} value={newProduct.name} placeholder='podaj nazwę produktu...' className='w-full outline-none border px-3 py-2' type='text' />
            </div>
            <div className='flex w-full flex-1 flex-col gap-1'>
                <label>Typ</label>
                <select onChange={(e) => setNewProduct({...newProduct, type: e.target.value})} value={newProduct.type} className='w-full outline-none border px-3 py-2'>
                    <option value="All-In-One">All-In-One</option>
                    <option value="Monoblok">Monoblok</option>
                    <option value="Split">Split</option>
                </select>
            </div>
            <div className='flex w-full flex-1 flex-col gap-1'>
                <label>Model</label>
                <input onChange={(e) => setNewProduct({...newProduct, desc: e.target.value})} value={newProduct.desc} placeholder='podaj opis produktu...' className='w-full outline-none border px-3 py-2' type='text' />
            </div>
            <div className='flex w-full flex-1 flex-col gap-1'>
                <label>Link do karty produktu</label>
                <input onChange={(e) => setNewProduct({...newProduct, product_link: e.target.value})} value={newProduct.product_link} placeholder='podaj link do karty produktu...' className='w-full outline-none border px-3 py-2' type='text' />
            </div>
            <div className='flex w-full flex-1 flex-col gap-1'>
                <label>Zdjęcie</label>
                {
                    successUpload ? 
                    <div>
                        <img src={newProduct.image} alt="" width={300} />
                        <div className="text-xs mt-4 opacity-80 duration-300 transition-all hover:opacity-100 cursor-pointer flex flex-row items-center justify-start gap-3" onClick={() => {setSuccessUpload(false);setFile(null);setNewProduct({...newProduct, image: ''})}}>
                            <img src={trashIcon.src} height={15} width={15} alt="remove" />
                            <span>usuń i wybierz inne</span>
                        </div>
                    </div> : 
                    <FileUploader handleChange={handleChange} classes='file-product-uploader' name="file" types={fileTypes} />
                }
            </div>
            <div className="flex justify-start">
                <table className="admin-edit-table mt-5 mb-3">
                                <tr>
                                    <td colSpan={12} className='py-4 text-xs font-[600] text-gray-800'>Wydajność grzewcza {newProduct.name} {newProduct.desc}</td>
                                </tr>
                                <tr>
                                    <td rowSpan={2} className='py-2 px-4 text-xs font-[600]'>Temperatura<br/>zasilania [°C]</td>
                                    <td colSpan={10} className='py-2 text-xs font-[600]'>Temperatura zewnętrzna [°C]</td>
                                </tr>
                                <tr>
                                    <td className='nr'>-25</td>
                                    <td className='nr'>-20</td>
                                    <td className='nr'>-15</td>
                                    <td className='nr'>-10</td>
                                    <td className='nr'>-7</td>
                                    <td className='nr'>-2</td>
                                    <td className='nr'>2</td>
                                    <td className='nr'>7</td>
                                    <td className='nr'>10</td>
                                    <td className='nr'>15</td>
                                </tr>
                                <tr>
                                    <td className='py-1 rid'>25</td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p25_minus25: Number(e.target.value)})} value={newProduct.p25_minus25 ? newProduct.p25_minus25.toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p25_minus20: Number(e.target.value)})} value={newProduct.p25_minus20 ? newProduct.p25_minus20.toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p25_minus15: Number(e.target.value)})} value={newProduct.p25_minus15 ? newProduct.p25_minus15.toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p25_minus10: Number(e.target.value)})} value={newProduct.p25_minus10 ? newProduct.p25_minus10.toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p25_minus7: Number(e.target.value)})} value={newProduct.p25_minus7 ? newProduct.p25_minus7.toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p25_minus2: Number(e.target.value)})} value={newProduct.p25_minus2 ? newProduct.p25_minus2.toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p25_plus2: Number(e.target.value)})} value={newProduct.p25_plus2 ? newProduct.p25_plus2.toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p25_plus7: Number(e.target.value)})} value={newProduct.p25_plus7 ? newProduct.p25_plus7.toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p25_plus10: Number(e.target.value)})} value={newProduct.p25_plus10 ? newProduct.p25_plus10.toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p25_plus15: Number(e.target.value)})} value={newProduct.p25_plus15 ? newProduct.p25_plus15.toString() : ''} type="number" /></td>
                                </tr>
                                <tr>
                                    <td className='py-1 rid'>30</td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p30_minus25: Number(e.target.value)})} value={newProduct.p30_minus25 ? Number(newProduct.p30_minus25).toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p30_minus20: Number(e.target.value)})} value={newProduct.p30_minus20 ? Number(newProduct.p30_minus20).toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p30_minus15: Number(e.target.value)})} value={newProduct.p30_minus15 ? Number(newProduct.p30_minus15).toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p30_minus10: Number(e.target.value)})} value={newProduct.p30_minus10 ? Number(newProduct.p30_minus10).toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p30_minus7: Number(e.target.value)})} value={newProduct.p30_minus7 ? Number(newProduct.p30_minus7).toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p30_minus2: Number(e.target.value)})} value={newProduct.p30_minus2 ? Number(newProduct.p30_minus2).toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p30_plus2: Number(e.target.value)})} value={newProduct.p30_plus2 ? Number(newProduct.p30_plus2).toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p30_plus7: Number(e.target.value)})} value={newProduct.p30_plus7 ? Number(newProduct.p30_plus7).toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p30_plus10: Number(e.target.value)})} value={newProduct.p30_plus10 ? Number(newProduct.p30_plus10).toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p30_plus15: Number(e.target.value)})} value={newProduct.p30_plus15 ? Number(newProduct.p30_plus15).toString() : ''} type="number" /></td>
                                </tr>
                                <tr>
                                    <td className='py-1 rid'>35</td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p35_minus25: Number(e.target.value)})} value={newProduct.p35_minus25 ? Number(newProduct.p35_minus25).toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p35_minus20: Number(e.target.value)})} value={newProduct.p35_minus20 ? Number(newProduct.p35_minus20).toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p35_minus15: Number(e.target.value)})} value={newProduct.p35_minus15 ? Number(newProduct.p35_minus15).toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p35_minus10: Number(e.target.value)})} value={newProduct.p35_minus10 ? Number(newProduct.p35_minus10).toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p35_minus7: Number(e.target.value)})} value={newProduct.p35_minus7 ? Number(newProduct.p35_minus7).toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p35_minus2: Number(e.target.value)})} value={newProduct.p35_minus2 ? Number(newProduct.p35_minus2).toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p35_plus2: Number(e.target.value)})} value={newProduct.p35_plus2 ? Number(newProduct.p35_plus2).toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p35_plus7: Number(e.target.value)})} value={newProduct.p35_plus7 ? Number(newProduct.p35_plus7).toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p35_plus10: Number(e.target.value)})} value={newProduct.p35_plus10 ? Number(newProduct.p35_plus10).toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p35_plus15: Number(e.target.value)})} value={newProduct.p35_plus15 ? Number(newProduct.p35_plus15).toString() : ''} type="number" /></td>
                                </tr>
                                <tr>
                                    <td className='py-1 rid'>40</td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p40_minus25: Number(e.target.value)})} value={newProduct.p40_minus25 ? Number(newProduct.p40_minus25).toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p40_minus20: Number(e.target.value)})} value={newProduct.p40_minus20 ? Number(newProduct.p40_minus20).toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p40_minus15: Number(e.target.value)})} value={newProduct.p40_minus15 ? Number(newProduct.p40_minus15).toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p40_minus10: Number(e.target.value)})} value={newProduct.p40_minus10 ? Number(newProduct.p40_minus10).toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p40_minus7: Number(e.target.value)})} value={newProduct.p40_minus7 ? Number(newProduct.p40_minus7).toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p40_minus2: Number(e.target.value)})} value={newProduct.p40_minus2 ? Number(newProduct.p40_minus2).toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p40_plus2: Number(e.target.value)})} value={newProduct.p40_plus2 ? Number(newProduct.p40_plus2).toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p40_plus7: Number(e.target.value)})} value={newProduct.p40_plus7 ? Number(newProduct.p40_plus7).toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p40_plus10: Number(e.target.value)})} value={newProduct.p40_plus10 ? Number(newProduct.p40_plus10).toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p40_plus15: Number(e.target.value)})} value={newProduct.p40_plus15 ? Number(newProduct.p40_plus15).toString() : ''} type="number" /></td>
                                </tr>
                                <tr>
                                    <td className='py-1 rid'>45</td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p45_minus25: Number(e.target.value)})} value={newProduct.p45_minus25 ? Number(newProduct.p45_minus25).toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p45_minus20: Number(e.target.value)})} value={newProduct.p45_minus20 ? Number(newProduct.p45_minus20).toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p45_minus15: Number(e.target.value)})} value={newProduct.p45_minus15 ? Number(newProduct.p45_minus15).toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p45_minus10: Number(e.target.value)})} value={newProduct.p45_minus10 ? Number(newProduct.p45_minus10).toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p45_minus7: Number(e.target.value)})} value={newProduct.p45_minus7 ? Number(newProduct.p45_minus7).toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p45_minus2: Number(e.target.value)})} value={newProduct.p45_minus2 ? Number(newProduct.p45_minus2).toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p45_plus2: Number(e.target.value)})} value={newProduct.p45_plus2 ? Number(newProduct.p45_plus2).toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p45_plus7: Number(e.target.value)})} value={newProduct.p45_plus7 ? Number(newProduct.p45_plus7).toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p45_plus10: Number(e.target.value)})} value={newProduct.p45_plus10 ? Number(newProduct.p45_plus10).toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p45_plus15: Number(e.target.value)})} value={newProduct.p45_plus15 ? Number(newProduct.p45_plus15).toString() : ''} type="number" /></td>
                                </tr>
                                <tr>
                                    <td className='py-1 rid'>50</td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p50_minus25: Number(e.target.value)})} value={newProduct.p50_minus25 ? Number(newProduct.p50_minus25).toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p50_minus20: Number(e.target.value)})} value={newProduct.p50_minus20 ? Number(newProduct.p50_minus20).toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p50_minus15: Number(e.target.value)})} value={newProduct.p50_minus15 ? Number(newProduct.p50_minus15).toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p50_minus10: Number(e.target.value)})} value={newProduct.p50_minus10 ? Number(newProduct.p50_minus10).toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p50_minus7: Number(e.target.value)})} value={newProduct.p50_minus7 ? Number(newProduct.p50_minus7).toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p50_minus2: Number(e.target.value)})} value={newProduct.p50_minus2 ? Number(newProduct.p50_minus2).toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p50_plus2: Number(e.target.value)})} value={newProduct.p50_plus2 ? Number(newProduct.p50_plus2).toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p50_plus7: Number(e.target.value)})} value={newProduct.p50_plus7 ? Number(newProduct.p50_plus7).toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p50_plus10: Number(e.target.value)})} value={newProduct.p50_plus10 ? Number(newProduct.p50_plus10).toString() : ''} type="number" /></td>
                                    <td className="answ"><input onChange={(e) => setNewProduct({...newProduct, p50_plus15: Number(e.target.value)})} value={newProduct.p50_plus15 ? Number(newProduct.p50_plus15).toString() : ''} type="number" /></td>
                                </tr>
                            </table>
                
            </div>
            <div onClick={handleAddNewProduct} className={`text-white bg-[#FF4510] py-3 px-8 ${valid ? 'cursor-pointer' : 'opacity-50 grayscale'}`}>{loading ? 'Trwa dodawanie...' : 'Dodaj nowy produkt'}</div>
        </div>
    )
}

export default AddNewProductView