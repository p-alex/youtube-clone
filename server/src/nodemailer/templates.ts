import config from 'config';

export const verifyEmailTemplate = ({
  to,
  username,
  verificationCode,
}: {
  to: string;
  username: string;
  verificationCode: string;
}) => ({
  from: config.get<string>('app_email'), // sender address
  to: to, // list of receivers
  subject: 'AlexTube | Email verification', // Subject line
  text: '', // plain text body
  html: `
  <div style="text-align: center; position: relative; width: 400px; padding: 40px; margin:0 auto; background-color: #0F0F0F; font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif; color: white;">
    <br/><br/>
    <h1 style="color: white; font-size: 45px;">AlexTube</h1>
    <h2>Email Confirmation</h2>
    <br/>
    <p style="font-size:1.4rem;">
      Hi <b style="text-transform: capitalize; color: #3EA6FF;">${username}</b>,
      <br/>
      This is your confirmation code.
    </p>
    <br/>
    <h2 style="letter-spacing: 1px">${verificationCode}</h2>
    <br/><br/>
  </div>
  `, // html body
});

export const forgetPasswordVerificationCodeTemplate = (
  to: string,
  verificationCode: string
) => ({
  from: 'alex.', // sender address
  to: to, // list of receivers
  subject: 'Password change', // Subject line
  text: '', // plain text body
  html: ``, // html body
});
