'use server'

import prisma from '@/app/libs/db';


export const saveInstalator = async (newInstalator: any) => {
    try{
        const add = await prisma.instalators.update({
            where: {
                id: newInstalator.id
            },
            data: newInstalator
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