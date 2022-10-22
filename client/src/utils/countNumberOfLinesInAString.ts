export const countNumberOfLinesInAString = (string: string) => {
  console.log(string.split(/\n/));
  return string.split(/\r\n|\r|\n/).length;
};
