'use server'

import prisma from '@/app/libs/db';

export const deleteProductFromDb = async (productId: any) => {
    try{
        const del = await prisma.product.delete({
            where: {
                id: productId
            }
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