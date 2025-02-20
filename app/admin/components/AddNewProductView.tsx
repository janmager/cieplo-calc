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
        <div className='flex flex-col gap-5 items-end'>
            <div className='flex w-full flex-1 flex-col gap-1'>
                <label>Nazwa</label>
                <input onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} value={newProduct.name} placeholder='podaj nazwę produktu...' className='w-full outline-none border px-3 py-2' type='text' />
            </div>
            <div className='flex w-full flex-1 flex-col gap-1'>
                <label>Opis</label>
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
            <div onClick={handleAddNewProduct} className={`text-white bg-[#FF4510] py-3 px-8 ${valid ? 'cursor-pointer' : 'opacity-50 grayscale'}`}>{loading ? 'Trwa dodawanie...' : 'Dodaj nowy produkt'}</div>
        </div>
    )
}

export default AddNewProductView