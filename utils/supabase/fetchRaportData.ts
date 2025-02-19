'use server'

import prisma from '@/app/libs/db';

export const fetchRaportData = async (id: string) => {
    try{
        const find: any = await prisma.raport.findFirst({
            where: {
                id: id
            }
        })
    
        if(find){
            find.heat_demand = {
                know: find.heat_demand_know,
                temp: find.heat_demand_temp,
                kW: find.heat_demand_kW
            }
            find.house_location = {
                full_name: find.house_location_full_name,
                lat: find.house_location_lat,
                lng: find.house_location_lng
            }
        }
        else{
            return {
                response: false
            }
        }
    
        return {
            response: true,
            data: find
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