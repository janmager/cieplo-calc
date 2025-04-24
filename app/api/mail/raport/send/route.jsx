import { raportEmailTemplate } from "@/templates/emails/raportEmailTemplate";
const nodemailer = require('nodemailer');
import { fetchRaportData } from "@/utils/supabase/fetchRaportData";
import { NextResponse, NextRequest } from 'next/server'

export async function POST(request) {
    const formData = await request.json()
    const email = formData.email
    const raportId = formData.raportId

    let getRaportData = await fetchRaportData(raportId);

    if(getRaportData.response && getRaportData.data){
        const username = 'GreeCalc';
        const myEmail = 'greekalkulator@gmail.com';

        const email = getRaportData.data.contact_email_address

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
            user: myEmail,
            pass: "anst jhzh pdak pyhv",
            },
        });

        const d = new Date()

        let printDate = `${d.getHours() >= 10 ? '' : '0'}${d.getHours()}:${d.getMinutes() >= 10 ? '' : '0'}${d.getMinutes()} ${d.getDate() >= 10 ? '' : '0'}${d.getDate()}.${d.getMonth()+1 >= 10 ? '' : '0'}${d.getMonth()+1}.${d.getFullYear()}`

        try {
            const mail = await transporter.sendMail({
                from: username,
                to: [email, myEmail],
                subject: `Twój raport doboru mocy pompy ciepła GREE | ${printDate}`,
                html: raportEmailTemplate({email: email, raport_url: getRaportData.data.raport_url, raportId: getRaportData.data.id})
            })
            
            return NextResponse.json({ message: "Success: email was sent" })
        } catch (error) {
            console.log(error)
            NextResponse.status(500).json({ message: "COULD NOT SEND MESSAGE" })
        }
    }
    else{
        NextResponse.status(500).json({ message: "COULD NOT SEND MESSAGE" })
    }

}

export async function OPTIONS(request) {
    const allowedOrigin = request.headers.get("origin");
    const response = new NextResponse(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": allowedOrigin || "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
        "Access-Control-Max-Age": "86400",
      },
    });
  
    return response;
  }