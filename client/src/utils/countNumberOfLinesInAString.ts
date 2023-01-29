export const countNumberOfLinesInAString = (string: string) => {
  return string.split(/\r\n|\r|\n/).length;
};
