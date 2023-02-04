import config from 'config';

export const securePasswordGenerator = () => {
  const length = parseInt(config.get('secure_password_generator_length'));
  let password = '';
  const charList: string[] = [
    'abcdefghijklmnopqrstuvwxyz',
    'abcdefghijklmnopqrstuvwxyz'.toUpperCase(),
    '29374381650',
    `!?'"$%^&*()[]{}_-+=.,:;@~#<>/`,
  ];
  for (let i = 0; i < length; i++) {
    if (i < charList.length) {
      password += charList[i].charAt(Math.floor(Math.random() * charList[i].length));
    } else {
      const RNG = Math.floor(Math.random() * charList.length);
      password += charList[RNG].charAt(Math.floor(Math.random() * charList[RNG].length));
    }
  }
  return password;
};
