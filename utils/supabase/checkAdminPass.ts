'use server'

import prisma from '@/app/libs/db';

export const checkAdminPass = async (pass: any) => {
    try{
        const find = await prisma.admin.findFirst({
            where: {
                name: 'admin',
                value: pass ? pass : ''
            }
        })

        if(find){
            return {
                response: true,
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