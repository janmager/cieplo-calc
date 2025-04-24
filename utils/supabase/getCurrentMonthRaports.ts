'use server'

import prisma from '@/app/libs/db';

export const getCurrentMonthRaports = async () => {
    try{
        const find: any = await prisma.raport.findMany({
            where: {
                created_at: {
                    gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                    lte: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
                }
            }
        })

        if(find){
            return {
                response: true,
                length: find.length
            }
        }
        else{
            return {
                response: false
            }
        }
    }
    catch(error) {
        console.log(error)
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