export const removeEmptyLinesFromString = (string: string) => {
  const newString = string.trim().replace(/^\s{1,}\n/gm, '\n');
  return newString;
};
