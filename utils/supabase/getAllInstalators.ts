'use server'

import prisma from '@/app/libs/db';

export const getAllInstalators = async () => {
    try{
        const find: any = await prisma.instalators.findMany({})

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