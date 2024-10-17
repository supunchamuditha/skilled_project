import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const uploadImage = upload.single('image');
export const uploadLogo = upload.single('logo'); // Add this line

// This could be expanded later if needed for additional image handling logic
