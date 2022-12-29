export const verifyEmailTemplate = (verificationCode: string) => ({
  from: '"Fred Foo 👻" <foo@example.com>', // sender address
  to: 'bar@example.com, baz@example.com', // list of receivers
  subject: 'Hello ✔', // Subject line
  text: 'Hello world?', // plain text body
  html: `<b>This is the code for email verification: ${verificationCode}`, // html body
});
