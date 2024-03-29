const nodemailer = require("nodemailer");
const sendGmail = async (gmailId, otp, error) => {
  try {
    const mailSettings = {
      service: "gmail",
      auth: {
        user: "gowthamma9483@gmail.com",
        pass: "agolskfuiywiyqgu",
      },
    };
    const transporter = nodemailer.createTransport(mailSettings);
    const htmlTemplate = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>VSense Technologies - OTP for Password Reset</title>
  </head>
  <body>
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td align="center" style="background-color: #f5f5f5; padding: 20px">
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="600"
            style="
              background-color: #ffffff;
              border: 1px solid #e0e0e0;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            "
          >
            <tr>
              <td align="center" style="padding: 40px 0">
                <img
                  src="https://alvascollege.com/wp-content/uploads/2019/03/logo.png"
                  alt="VSense Technologies"
                  width="200"
                />
              </td>
            </tr>
            <tr>
              <td style="padding: 0 30px">
                <h1 style="font-size: 24px; margin-bottom: 20px">
                  Password Reset OTP
                </h1>
                <p style="font-size: 16px">Hello Admin,</p>
                <p style="font-size: 16px">
                  You have requested a password reset for your admin panel at
                  VSense Technologies. Please use the following OTP to reset
                  your password:
                </p>
                <p style="font-size: 24px; color: #007bff; font-weight: bold">
                  Your OTP: ${otp}
                </p>
                <p style="font-size: 16px">
                  This OTP is valid for a single use only and should be used
                  within the next <span style="color: red">3 minutes.</span>
                </p>
                <p style="font-size: 16px">
                  If you didn't request this reset, please ignore this email or
                  contact our support team.
                </p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 40px 0">
                <p style="font-size: 14px; color: #888">
                  This email was sent by VSense Technologies. All rights
                  reserved.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
    const gmailResult = await transporter.sendMail({
      from: mailSettings.auth.user,
      to: gmailId,
      subject: `${otp ? `OTP` : `Server Error Message`}`,
      html: otp
        ? htmlTemplate
        : `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
        <p>${error}</p>
    </body>
    </html>`,
    });
    if (!gmailResult.rejected.length) {
      return `OTP Sent To ${gmailId}`;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = sendGmail;
