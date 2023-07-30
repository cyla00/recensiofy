import nodemailer from 'nodemailer'

const env = useRuntimeConfig()

export const mailer = nodemailer.createTransport({
    host: env.EMAIL_CLIENT_HOST,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: env.EMAIL_CLIENT_USER, // generated ethereal user
      pass: env.EMAIL_CLIENT_PASS, // generated ethereal password
    },
})