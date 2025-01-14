import { Raport } from "@prisma/client";

export const countWarmAPI = async (data: any) => {

    const formatedData = {
        token: process.env.NEXT_PUBLIC_API_KEY
    }

    try {
        const result = await fetch('/api/cieplo', {
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