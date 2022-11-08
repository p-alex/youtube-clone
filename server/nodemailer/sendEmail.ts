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
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // config.get('smtp_user'), // generated ethereal user
      pass: testAccount.pass, // config.get('smtp_pass'), // generated ethereal password
    },
  });
  let info = await transporter.sendMail(template);
  console.log(info.response);
  console.log(nodemailer.getTestMessageUrl(info));
};
