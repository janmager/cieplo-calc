'use server'

import prisma from '@/app/libs/db';

export const updateRaportUrl = async ({raportId, raportUrl}: {raportId: string, raportUrl: string}) => {
    try{
        const upd = await prisma.raport.update({
            data: {
                raport_url: raportUrl 
            },
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