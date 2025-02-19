'use server'

import prisma from '@/app/libs/db';

export const addInstalator = async (newInstalator: any) => {
    try{
        const add = await prisma.instalators.create({
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