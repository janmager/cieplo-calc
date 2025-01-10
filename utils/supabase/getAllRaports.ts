'use server'

import prisma from '@/app/libs/db';

export const getAllRaports = async () => {
    try{
        const find: any = await prisma.raport.findMany({
            orderBy: {
                created_at: 'desc'
            }
        })

        if(find){
            return {
                response: true,
                data: find
            }
        }
        else{
            return {
                response: false
            }
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