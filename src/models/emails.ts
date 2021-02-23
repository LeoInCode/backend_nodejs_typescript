import { User } from './../typed/typed';
import nodemailer from 'nodemailer'

class VerifyEmail {
  async sendEmail (address: string, user: User) {    
    const testAccount = await nodemailer.createTestAccount()
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      auth: testAccount
    })
    const send = await transporter.sendMail({
      from: 'no-reply@gmail.com',
      to: user.email,
      subject: 'Verificação de e-mail',
      text: `Olá! Verifique seu e-mail aqui: ${address}`,
      html: `<h1>Olá!</h1> Verifique seu e-mail aqui: <a href="${address}">${address}</a>`
    })
    console.log('URL: '+nodemailer.getTestMessageUrl(send))
  }
}

export default VerifyEmail