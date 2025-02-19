'use server'

import prisma from '@/app/libs/db';

export const deleteInstalatorFromDb = async (instalatorId: any) => {
    try{
        const del = await prisma.instalators.delete({
            where: {
                id: instalatorId
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