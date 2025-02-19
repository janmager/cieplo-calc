'use server'

import prisma from '@/app/libs/db';

export const addProduct = async (newProduct: any) => {
    try{
        const add = await prisma.product.create({
            data: newProduct
        })
    
        return {
            response: true
        }
    }
    catch(error) {
        if (error instanceof Error){
            console.log("Error: ", error.stack)
            return {
                response: false
            }
        }
        else{
            return {
                response: false
            }
        }
    }
}