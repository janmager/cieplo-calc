import { Raport } from "@prisma/client";

export const countWarmAPI = async (data: any) => {

    const formatedData = {
        token: process.env.NEXT_PUBLIC_API_KEY
    }

    try {
        const result = await fetch('https://cieplo.app/api/subscription?token=d45a59c760cf7aca5764a9aa7d9647093f797ca1', {
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
        console.log(res)

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