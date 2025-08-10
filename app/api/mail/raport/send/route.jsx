import { raportEmailTemplate } from "@/templates/emails/raportEmailTemplate";
const nodemailer = require("nodemailer");
import { fetchRaportData } from "@/utils/supabase/fetchRaportData";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request) {
  const formData = await request.json();
  const email = formData.email;
  const raportId = formData.raportId;
  const emailType = formData.type;

  try {
    let getRaportData = await fetchRaportData(raportId);

    if (getRaportData.response && getRaportData.data) {
      const username = "Kalkulator GREE";
      const myEmail = process.env.ENV_PUBLIC_EMAIL;

      const recipientEmail = getRaportData.data.contact_email_address;

      const port = Number(process.env.ENV_EMAIL_PORT);
      const isSecure = port === 465;

      const transporter = nodemailer.createTransport({
        host: process.env.ENV_EMAIL_HOST,
        port: port,
        secure: isSecure,
        auth: {
          user: myEmail,
          pass: process.env.ENV_EMAIL_PASSWORD,
        },
      });

      let printTitle;

      switch (emailType) {
        case "oferta":
          printTitle = `Prośba o ofertę na pompy ciepła`;
          break;
        case "kontakt":
          printTitle = `Prośba o kontakt doradcy`;
          break;
        default:
          printTitle = `Raport doboru mocy pompy ciepła GREE`;
          break;
      }
      try {
        const mail = await transporter.sendMail({
          from: `${username} <${myEmail}>`,
          to: [recipientEmail, myEmail],
          subject: printTitle,
          html: raportEmailTemplate({
            email: recipientEmail,
            raport_url: getRaportData.data.raport_url,
            raportId: getRaportData.data.id,
            type: emailType,
          }),
        });

        return NextResponse.json({ message: "Success: email was sent" });
      } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "COULD NOT SEND MESSAGE" }, { status: 500 });
      }
    } else {
      return NextResponse.json({ message: "COULD NOT SEND MESSAGE" }, { status: 500 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "COULD NOT SEND MESSAGE" }, { status: 500 });
  }
}

export async function OPTIONS(request) {
  const allowedOrigin = request.headers.get("origin");
  const response = new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": allowedOrigin || "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400",
    },
  });
  return response;
}