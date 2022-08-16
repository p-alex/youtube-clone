import config from 'config';
import cl from 'cloudinary';
const cloudinary = cl.v2;

// Return "https" URLs by setting secure: true
cloudinary.config({
  cloud_name: config.get<string>('cloudinary_name'),
  api_key: config.get<string>('cloudinary_api_key'),
  api_secret: config.get<string>('cloudinary_api_secret'),
  secure: true,
});

export { cloudinary };
