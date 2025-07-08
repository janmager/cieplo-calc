export const raportEmailTemplate = ({email, raport_url, raportId, type}: {email: string, raport_url: string, raportId: string, type: 'oferta' | 'kontakt' | 'raport'}) => {
    let html = ''
    if(type == 'raport') html = /*html*/`
    <!doctype html>
        <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                <title>Raport doboru mocy pompy ciepła GREE</title>
                <style media="all" type="text/css">
                </style>
            </head>
            <body style="font-family: Helvetica, sans-serif; -webkit-font-smoothing: antialiased; font-size: 16px; line-height: 1.3; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #f4f5f6; margin: 0; padding: 0;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; padding-top: 30px; padding-bottom: 30px; background-color: #f4f5f6; width: 95%; margin: 0 auto;" width="100%" bgcolor="#f4f5f6">
                <tr>
                    <td>&nbsp;</td>
                    <td style="text-align: center;">
                        <img src="https://cieplo-calc.vercel.app/logo.png" alt="logo" height="32" width="164" style="margin-bottom: 20px;" />
                    </td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td style="font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top;" valign="top">&nbsp;</td>
                    <td class="container" style="font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; max-width: 700px; padding: 0; padding-top: 24px; width: 700px; margin: 0 auto;" width="600" valign="top">
                        <div class="content" style="box-sizing: border-box; display: block; margin: 0 auto; max-width: 700px; padding: 0;">
                            <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">Raport doboru mocy pompy ciepła GREE</span>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; border: 1px solid #eaebed; border-radius: 16px; width: 100%; height: 100%;" width="100%">
                                <tr>
                                    <td class="wrapper" style="font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; box-sizing: border-box; padding: 24px 24px 24px 24px;" valign="top">
                                        <p style="color: black; font-family: Helvetica, sans-serif; font-size: 20px; font-weight: bold; margin-bottom: 16px; margin-top: 10px; margin-left: 5px;">Raport doboru mocy pompy ciepła GREE</p>
                                        <p style="font-family: Helvetica, sans-serif; font-size: 15px; line-height: 24px; font-weight: normal; color: gray; margin: 0; margin-bottom: 8px; margin-left: 5px;">Dziękujemy za skorzystanie z kalkulatora doboru pomp ciepła Gree. Twój raport doboru pompy ciepła GREE został utworzony.</p><br/>
                                        <a style="background: #FF4510; margin-bottom: 20px; width: 175px; text-decoration: none; font-size: 17px; color: white; height: 50px; line-height: 50px; text-align: center; font-weight: bold; display: block; border-radius: 5px;" href="${`https://gree.ivn-works.com/kalkulator-wynik?hash=${raportId}`}">Pobierz Raport</a>
                                        <p style="font-family: Helvetica, sans-serif; font-size: 14px; line-height: 20px; font-weight: normal; color: gray;">Pozdrawiamy,<br/>Zespół Gree</p>
                                    </td>
                                </tr>
                            </table>
                            <div class="footer" style="clear: both; padding-top: 24px; text-align: center; width: 100%;">
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
                                    <tr>
                                    <td class="content-block powered-by" style="font-family: Helvetica, sans-serif; vertical-align: top; color: #9a9ea6; font-size: 11px; line-height: 20px; padding-top: 0px;" valign="top" align="center">
                                        <p>Wiadomość e-mail wygenerowana automatycznie - prosimy na nią nie odpowiadać.</p>
                                        <p>Administratorem Państwa danych osobowych jest Spółka pod firmą FREE Polska sp. z o.o. z siedzibą w Krakowie, adres: ul. Dobrego Pasterza 13/3, 31-416 Kraków, NIP: 5252291850, REGON: 015652188, KRS: 015652188, Sąd Rejestrowy: Sąd Rejonowy dla Krakowa – Śródmieścia w Krakowie. Przetwarzanie Państwa danych osobowych w związku z przygotowaniem oraz przesłaniem oferty odbywa się na podstawie art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes realizowany przez Administratora). Szczegółowe informacje dotyczące przetwarzania Państwa danych osobowych zawarte zostały w Polityce Prywatności FREE Polska sp. z o.o., dostępnej pod adresem: <a style="color: inherit;" href="https://freepolska.pl/polityka-prywatnosci/">https://freepolska.pl/polityka-prywatnosci/</a></p>
                                        <p>Z Administratorem można skontaktować się za pośrednictwem poczty elektronicznej, na adres e-mail: <a style="color: inherit;" href="mailto:gree@gree.pl">gree@gree.pl</a>; poprzez nadanie przesyłki pisemnej na adres: ul. Dobrego Pasterza 13/3, 31-416 Kraków; telefonicznie pod numerem: +48 12 307 06 40.</p>
                                        <p>Administrator wyznaczył Inspektora Ochrony Danych. Kontakt z Inspektorem Ochrony Danych możliwy jest za pośrednictwem poczty elektronicznej na adres e-mail: <a style="color: inherit;" href="mailto:iod@gree.pl">iod@gree.pl</a></p>
                                        &copy; 2025 GreeCalc
                                    </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </td>
                    <td style="font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top;" valign="top">&nbsp;</td>
                </tr>
                </table>
            </body>
        </html>
    `
    else if(type == 'oferta') html = /*html*/`
    <!doctype html>
        <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                <title>Kalkulator doboru pompy ciepła Gree</title>
                <style media="all" type="text/css">
                </style>
            </head>
            <body style="font-family: Helvetica, sans-serif; -webkit-font-smoothing: antialiased; font-size: 16px; line-height: 1.3; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #f4f5f6; margin: 0; padding: 0;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; padding-top: 30px; padding-bottom: 30px; background-color: #f4f5f6; width: 95%; margin: 0 auto;" width="100%" bgcolor="#f4f5f6">
                <tr>
                    <td>&nbsp;</td>
                    <td style="text-align: center;">
                        <img src="https://cieplo-calc.vercel.app/logo.png" alt="logo" height="32" width="164" style="margin-bottom: 20px;" />
                    </td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td style="font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top;" valign="top">&nbsp;</td>
                    <td class="container" style="font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; max-width: 700px; padding: 0; padding-top: 24px; width: 700px; margin: 0 auto;" width="600" valign="top">
                        <div class="content" style="box-sizing: border-box; display: block; margin: 0 auto; max-width: 700px; padding: 0;">
                            <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">Kalkulator doboru pompy ciepła Gree</span>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; border: 1px solid #eaebed; border-radius: 16px; width: 100%; height: 100%;" width="100%">
                                <tr>
                                    <td class="wrapper" style="font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; box-sizing: border-box; padding: 24px 24px 24px 24px;" valign="top">
                                        <p style="color: black; font-family: Helvetica, sans-serif; font-size: 20px; font-weight: bold; margin-bottom: 16px; margin-top: 10px; margin-left: 5px;">Kalkulator doboru pompy ciepła Gree</p>
                                        <p style="font-family: Helvetica, sans-serif; font-size: 15px; line-height: 24px; font-weight: normal; color: gray; margin: 0; margin-bottom: 8px; margin-left: 5px;">Dziękujemy za skorzystanie z kalkulatora doboru pomp ciepła Gree. Zgodnie z Twoją prośbą skontaktujemy się z firmą instalacyjną z Twojej okolicy celem przygotowania oferty na urządzenia. Dane firmy i szczegóły oferty otrzymasz w kolejnej wiadomości.</p><br/>
                                        <a style="background: #FF4510; margin-bottom: 20px; width: 175px; text-decoration: none; font-size: 17px; color: white; height: 50px; line-height: 50px; text-align: center; font-weight: bold; display: block; border-radius: 5px;" href="${`https://gree.ivn-works.com/kalkulator-wynik?hash=${raportId}`}">Pobierz Raport</a>
                                        <p style="font-family: Helvetica, sans-serif; font-size: 14px; line-height: 20px; font-weight: normal; color: gray;">Pozdrawiamy,<br/>Zespół Gree</p>
                                    </td>
                                </tr>
                            </table>
                            <div class="footer" style="clear: both; padding-top: 24px; text-align: center; width: 100%;">
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
                                    <tr>
                                    <td class="content-block powered-by" style="font-family: Helvetica, sans-serif; vertical-align: top; color: #9a9ea6; font-size: 11px; line-height: 20px; padding-top: 0px;" valign="top" align="center">
                                        <p>Wiadomość e-mail wygenerowana automatycznie - prosimy na nią nie odpowiadać.</p>
                                        <p>Administratorem Państwa danych osobowych jest Spółka pod firmą FREE Polska sp. z o.o. z siedzibą w Krakowie, adres: ul. Dobrego Pasterza 13/3, 31-416 Kraków, NIP: 5252291850, REGON: 015652188, KRS: 015652188, Sąd Rejestrowy: Sąd Rejonowy dla Krakowa – Śródmieścia w Krakowie. Przetwarzanie Państwa danych osobowych w związku z przygotowaniem oraz przesłaniem oferty odbywa się na podstawie art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes realizowany przez Administratora). Szczegółowe informacje dotyczące przetwarzania Państwa danych osobowych zawarte zostały w Polityce Prywatności FREE Polska sp. z o.o., dostępnej pod adresem: <a style="color: inherit;" href="https://freepolska.pl/polityka-prywatnosci/">https://freepolska.pl/polityka-prywatnosci/</a></p>
                                        <p>Z Administratorem można skontaktować się za pośrednictwem poczty elektronicznej, na adres e-mail: <a style="color: inherit;" href="mailto:gree@gree.pl">gree@gree.pl</a>; poprzez nadanie przesyłki pisemnej na adres: ul. Dobrego Pasterza 13/3, 31-416 Kraków; telefonicznie pod numerem: +48 12 307 06 40.</p>
                                        <p>Administrator wyznaczył Inspektora Ochrony Danych. Kontakt z Inspektorem Ochrony Danych możliwy jest za pośrednictwem poczty elektronicznej na adres e-mail: <a style="color: inherit;" href="mailto:iod@gree.pl">iod@gree.pl</a></p>
                                        &copy; 2025 GreeCalc
                                    </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </td>
                    <td style="font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top;" valign="top">&nbsp;</td>
                </tr>
                </table>
            </body>
        </html>
    `
    else if(type == 'kontakt') html = /*html*/`
    <!doctype html>
        <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                <title>Kalkulator doboru pompy ciepła Gree</title>
                <style media="all" type="text/css">
                </style>
            </head>
            <body style="font-family: Helvetica, sans-serif; -webkit-font-smoothing: antialiased; font-size: 16px; line-height: 1.3; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #f4f5f6; margin: 0; padding: 0;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; padding-top: 30px; padding-bottom: 30px; background-color: #f4f5f6; width: 95%; margin: 0 auto;" width="100%" bgcolor="#f4f5f6">
                <tr>
                    <td>&nbsp;</td>
                    <td style="text-align: center;">
                        <img src="https://cieplo-calc.vercel.app/logo.png" alt="logo" height="32" width="164" style="margin-bottom: 20px;" />
                    </td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td style="font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top;" valign="top">&nbsp;</td>
                    <td class="container" style="font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; max-width: 700px; padding: 0; padding-top: 24px; width: 700px; margin: 0 auto;" width="600" valign="top">
                        <div class="content" style="box-sizing: border-box; display: block; margin: 0 auto; max-width: 700px; padding: 0;">
                            <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">Kalkulator doboru pompy ciepła Gree</span>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; border: 1px solid #eaebed; border-radius: 16px; width: 100%; height: 100%;" width="100%">
                                <tr>
                                    <td class="wrapper" style="font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; box-sizing: border-box; padding: 24px 24px 24px 24px;" valign="top">
                                        <p style="color: black; font-family: Helvetica, sans-serif; font-size: 20px; font-weight: bold; margin-bottom: 16px; margin-top: 10px; margin-left: 5px;">Kalkulator doboru pompy ciepła Gree</p>
                                        <p style="font-family: Helvetica, sans-serif; font-size: 15px; line-height: 24px; font-weight: normal; color: gray; margin: 0; margin-bottom: 8px; margin-left: 5px;">Dziękujemy za skorzystanie z kalkulatora doboru pomp ciepła Gree. Nasz doradca skontaktuje się z Tobą w ciągu 24h (w przypadku weekendu w najbliższym dniu roboczym).</p><br/>
                                        <a style="background: #FF4510; margin-bottom: 20px; width: 175px; text-decoration: none; font-size: 17px; color: white; height: 50px; line-height: 50px; text-align: center; font-weight: bold; display: block; border-radius: 5px;" href="${`https://gree.ivn-works.com/kalkulator-wynik?hash=${raportId}`}">Pobierz Raport</a>
                                        <p style="font-family: Helvetica, sans-serif; font-size: 14px; line-height: 20px; font-weight: normal; color: gray;">Pozdrawiamy,<br/>Zespół Gree</p>
                                    </td>
                                </tr>
                            </table>
                            <div class="footer" style="clear: both; padding-top: 24px; text-align: center; width: 100%;">
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
                                    <tr>
                                    <td class="content-block powered-by" style="font-family: Helvetica, sans-serif; vertical-align: top; color: #9a9ea6; font-size: 11px; line-height: 20px; padding-top: 0px;" valign="top" align="center">
                                        <p>Wiadomość e-mail wygenerowana automatycznie - prosimy na nią nie odpowiadać.</p>
                                        <p>Administratorem Państwa danych osobowych jest Spółka pod firmą FREE Polska sp. z o.o. z siedzibą w Krakowie, adres: ul. Dobrego Pasterza 13/3, 31-416 Kraków, NIP: 5252291850, REGON: 015652188, KRS: 015652188, Sąd Rejestrowy: Sąd Rejonowy dla Krakowa – Śródmieścia w Krakowie. Przetwarzanie Państwa danych osobowych w związku z przygotowaniem oraz przesłaniem oferty odbywa się na podstawie art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes realizowany przez Administratora). Szczegółowe informacje dotyczące przetwarzania Państwa danych osobowych zawarte zostały w Polityce Prywatności FREE Polska sp. z o.o., dostępnej pod adresem: <a style="color: inherit;" href="https://freepolska.pl/polityka-prywatnosci/">https://freepolska.pl/polityka-prywatnosci/</a></p>
                                        <p>Z Administratorem można skontaktować się za pośrednictwem poczty elektronicznej, na adres e-mail: <a style="color: inherit;" href="mailto:gree@gree.pl">gree@gree.pl</a>; poprzez nadanie przesyłki pisemnej na adres: ul. Dobrego Pasterza 13/3, 31-416 Kraków; telefonicznie pod numerem: +48 12 307 06 40.</p>
                                        <p>Administrator wyznaczył Inspektora Ochrony Danych. Kontakt z Inspektorem Ochrony Danych możliwy jest za pośrednictwem poczty elektronicznej na adres e-mail: <a style="color: inherit;" href="mailto:iod@gree.pl">iod@gree.pl</a></p>
                                        &copy; 2025 GreeCalc
                                    </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </td>
                    <td style="font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top;" valign="top">&nbsp;</td>
                </tr>
                </table>
            </body>
        </html>
    `

    return html;
}