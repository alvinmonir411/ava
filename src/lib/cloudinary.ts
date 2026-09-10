import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dgaiqqh7k',
  api_key: process.env.CLOUDINARY_API_KEY || '368739197945927',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'MM9dKJjFjiCgX-KSvoFLItdUBeg',
  secure: true,
});

export default cloudinary;
