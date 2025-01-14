import { Raport } from "@prisma/client";

export const countWarmAPI = async (data: any) => {

    const formatedData = {
        ...data,
        token: process.env.NEXT_PUBLIC_API_KEY
    }

    try {
        const result = await fetch('https://cieplo.app/api/calculation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(formatedData),
        });

        if (!result.ok) {
            throw new Error(`response status: ${result.status}`);
        }

        let res = await result.json();

        return {
            response: true,
            data: res
        }
    } catch (e) {
        console.log(e);
        return {
            response: false,
        }
    }
};