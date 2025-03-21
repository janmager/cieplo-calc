export const raportEmailTemplate = ({email, raport_url, raportId}: {email: string, raport_url: string, raportId: string}) => {
    let html = ''
    html = /*html*/`
    <!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- Wymuszenie jasnego motywu -->
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>Nowy Raport</title>
  <style>
    /* Reset stylów i podstawowe ustawienia */
    body, table, td, a {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    table {
      border-collapse: collapse !important;
    }
    img {
      border: 0;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      display: block;
    }
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f5f6 !important;
    }
    /* Kontener emaila */
    .email-container {
      max-width: 600px;
      width: 100%;
      margin: auto;
    }
  </style>
</head>
<body style="background-color: #f4f5f6; margin:0; padding:0;">
  <!--[if mso]>
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td>
  <![endif]-->
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f5f6; padding: 30px 0;">
    <tr>
      <td align="center">
        <!-- Główny kontener emaila -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="email-container" style="background: #ffffff; border: 1px solid #eaebed; border-radius: 16px;">
          <tr>
            <td align="center" style="padding: 24px 24px 0 24px;">
              <!-- Logo -->
              <img src="https://i.ibb.co/924Yvxw/logo-black-small.png" alt="logo" width="164" height="32" style="margin-bottom: 20px;">
            </td>
          </tr>
          <tr>
            <td style="padding: 0 24px 68px 24px; font-family: Helvetica, Arial, sans-serif; font-size: 16px; color: #000;">
              <!-- Nagłówek -->
              <p style="font-size: 20px; font-weight: bold; margin: 10px 0 16px 5px;">Nowy raport</p>
              <!-- Treść wiadomości -->
              <p style="font-size: 15px; color: gray; margin: 0 0 8px 5px;">Twój raport wyceny został wygenerowany</p>
              <!-- Przycisk pobierania -->
              <a href="https://cieplo-calc.vercel.app/wynik/e4a53385-3ef9-40b3-a4cd-4f1b9e32d295?auto_download=true" target="_blank" style="background: #ff4510; text-decoration: none; font-size: 17px; color: #fff; padding: 15px 30px; display: inline-block; border-radius: 5px; margin-bottom: 20px;">
                Pobierz Raport
              </a>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 24px; font-family: Helvetica, Arial, sans-serif; font-size: 14px; color: #9a9ea6;">
              © 2025 GreeCalc
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  <!--[if mso]>
        </td>
      </tr>
    </table>
  <![endif]-->
</body>
</html>

    `

    return html;
}