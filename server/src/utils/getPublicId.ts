export const getImagePublicId = (url: string) => {
  return url.split(/\/image\/upload\/v[0-9]+\/+/)[1].replace('.jpg', '');
};

export const getVideoPublicId = (url: string) => {
  return url.split(/\/video\/upload\/v[0-9]+\/+/)[1].replace('.mp4', '');
};
