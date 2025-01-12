'use server'

import prisma from '@/app/libs/db';

export const deleteRaportFromDb = async (raportId: any) => {
    console.log(raportId)
    try{
        const del = await prisma.raport.delete({
            where: {
                id: raportId
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