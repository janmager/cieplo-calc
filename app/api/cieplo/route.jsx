import { translateForCieploAPI } from '@/utils/api/translateForCieploAPI'
import { NextResponse, NextRequest } from 'next/server'

export async function POST(request) {
    const formData = await request.json()

    const formatedData = translateForCieploAPI(formData)

    try {
        const result = await fetch(`https://cieplo.app/api/calculation?token=${process.env.NEXT_PUBLIC_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formatedData),
        })
        const res = await result.json();
        if(!res?.errors) return NextResponse.json({ response: true, data: res, base: formatedData })
        else return NextResponse.json({ response: false, data: res })

    } catch (e) {
        console.log(e);
        NextResponse.status(500).json({ response: false })

    }
}