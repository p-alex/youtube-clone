export const converToTagList = (tags: string) => {
  return Array.from(new Set(tags.split(/ ?, ?/)));
};
