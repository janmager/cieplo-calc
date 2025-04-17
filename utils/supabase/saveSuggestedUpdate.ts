'use server'

import prisma from '@/app/libs/db';


export const saveSuggestedUpdate = async (raport: any) => {
    try{
        const add = await prisma.raport.update({
            where: {
                id: raport.id
            },
            data: {
                recommendedProducts: raport.recommend
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