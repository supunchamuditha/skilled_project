import multer from "multer";

// Set up memory storage to temporarily store the file in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Export the upload middleware for single PDF file uploads
export const uploadPDF = upload.single("pdf");
