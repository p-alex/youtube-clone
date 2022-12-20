import nodemailer from 'nodemailer';
import config from 'config';

type Template = {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
};

export const sendEmail = async (template: Template) => {
  const testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: process.env.NODE_ENV === 'production' ? true : false, // true for 465, false for other ports
    auth: {
      user:
        process.env.NODE_ENV === 'production'
          ? config.get('smtp_user')
          : testAccount.user,
      pass:
        process.env.NODE_ENV === 'production'
          ? config.get('smtp_pass')
          : testAccount.pass,
    },
  });
  await transporter.sendMail(template);
};
