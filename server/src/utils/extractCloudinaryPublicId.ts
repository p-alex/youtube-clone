export const extractCloudinaryPublicId = (image: string) => {
  return image.substring(image.indexOf('youtube'), image.indexOf('.jpg'));
};
