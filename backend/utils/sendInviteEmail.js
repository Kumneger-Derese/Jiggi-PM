import 'dotenv/config'
import nodemailer from 'nodemailer'

const sendInviteEmail = async ({ to, subject, html }) => {
  // Create transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  })

  // define email option
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html
  }

  //send email
  return await transporter.sendMail(mailOptions)
}

export { sendInviteEmail }
