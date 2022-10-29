export const createRandomCode = (length: number) => {
  const numbers = '1234567890';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += numbers.charAt(Math.floor(Math.random() * length));
  }
  return result;
};
