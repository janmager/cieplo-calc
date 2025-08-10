import { raportEmailTemplate } from "@/templates/emails/raportEmailTemplate";
const nodemailer = require('nodemailer');
import { fetchRaportData } from "@/utils/supabase/fetchRaportData";
import { NextResponse, NextRequest } from 'next/server'

export async function POST(request) {
    const formData = await request.json()
    const email = formData.email
    const raportId = formData.raportId
    const emailType = formData.type

    let getRaportData = await fetchRaportData(raportId);

    if(getRaportData.response && getRaportData.data){
        const username = 'Kalculator GREE';
        const myEmail = 'raport@kalkulator.gree.pl';

        const email = getRaportData.data.contact_email_address

        const transporter = nodemailer.createTransport({
            host: "s128.cyber-folks.pl",
            port: 465,
            secure: true,
            auth: {
                user: myEmail,
                pass: "Admin123!@#",
            },
        });

        const d = new Date()

        let printTitle = 'Raport doboru mocy pompy ciepła GREE';
        
        switch(emailType){
            case 'oferta':
                printTitle = `Prośba o ofertę na pompy ciepła`
                break;
            case 'kontakt':
                printTitle = `Prośba o kontakt doradcy`
                break;
            case 'raport':
                printTitle = `Raport doboru mocy pompy ciepła GREE`
                break;
            default:
                printTitle = `Raport doboru mocy pompy ciepła GREE`
                break;
        }
        try {
            const mail = await transporter.sendMail({
                from: username,
                to: [email, myEmail],
                subject: `${printTitle}`,
                html: raportEmailTemplate({email: email, raport_url: getRaportData.data.raport_url, raportId: getRaportData.data.id, type: emailType}),
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