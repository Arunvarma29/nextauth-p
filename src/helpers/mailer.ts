import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';


export const sendEmail = async ({ email, emailType, userID }: any) => {

  try {
    const hashedToken = await bcryptjs.hash(userID.toString(), 10)

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userID,
        {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000
        }
      )
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userID,
        {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000
        })
    }


    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "b931b0d78348ec",
        pass: "b09264aaef4bb4"
      }
    });


    const mailOptions = {
      from: 'helium924@gmail.com',
      to: email,
      subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password",
      text: "Hello world?",
      html: `<p> Click <a href="${process.env.DOMAIN}/
              verifyemail?token=${hashedToken}">here</a> to 
                ${emailType === "VERIFY" ? "verify your email" :
          "reset your password"}
                  or copy and paste the link below in your browser.
                  <br>${process.env.DOMAIN}/verifyemail?tooken=${hashedToken}
                  </p>`,
    };


    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;


  } catch (error: any) {
    throw new Error(error.message)
  }
}