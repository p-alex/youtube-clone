import nodemailer from 'nodemailer';
import config from 'config';
import log from '../utils/logger';

type Template = {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
};

export const sendEmail = async (template: Template): Promise<{ success: boolean }> => {
  try {
    let testAccount: any;
    if (process.env.NODE_ENV === 'development') {
      testAccount = await nodemailer.createTestAccount();
    }
    let transporter = nodemailer.createTransport({
      host:
        process.env.NODE_ENV === 'production'
          ? 'smtp.sendgrid.net'
          : 'smtp.ethereal.email',
      port: process.env.NODE_ENV === 'production' ? 465 : 587,
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

    let info = await transporter.sendMail(template);

    process.env.NODE_ENV === 'development' &&
      log.info(nodemailer.getTestMessageUrl(info));
    return { success: true };
  } catch (error: any) {
    log.error(error.message);
    return { success: false };
  }
};
