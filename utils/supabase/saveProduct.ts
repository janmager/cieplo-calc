'use server'

import prisma from '@/app/libs/db';
import { Product } from '@prisma/client';


export const saveProduct = async (product: Product) => {
    try{
        const add = await prisma.product.update({
            where: {
                id: product.id
            },
            data: product
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