import { raportEmailTemplate } from "@/templates/emails/raportEmailTemplate";
const nodemailer = require('nodemailer');
import { fetchRaportData } from "@/utils/supabase/fetchRaportData";
import { NextResponse, NextRequest } from 'next/server'

export async function POST(request) {
    const formData = await request.json()
    const token = formData.token

    console.log(token)
    const formatedData = {
        token
    }
    console.log(formatedData)
    console.log(`https://cieplo.app/api/subscription?token=${token}`)
    try {
        const result = await fetch(`https://cieplo.app/api/calculation?subscription=${token}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
        });

        if (!result.ok) {
            throw new Error(`response status: ${result.status}`);
        }

        let res = await result.json();

        return NextResponse.json({ message: "Success: email was sent" })

    } catch (e) {
        console.log(e);
        NextResponse.status(500).json({ message: "COULD NOT SEND MESSAGE" })

    }
}