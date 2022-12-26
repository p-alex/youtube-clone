export const convertToTagList = (tags: string) => {
  return Array.from(new Set(tags.split(/ ?, ?/)));
};
