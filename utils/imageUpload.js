// utils/imageUpload.js

export const uploadImage = (req) => {
    if (!req.file) {
      throw new Error("No file uploaded");
    }
  
    return {
      image: req.file.buffer,
      image_type: req.file.mimetype,
    };
  };
  