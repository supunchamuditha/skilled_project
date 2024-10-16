// utils/pdfUpload.js

export const uploadPDF = (req) => {
  if (!req.file) {
    throw new Error("No PDF uploaded");
  }

  return {
    pdf: req.file.buffer,
    pdf_type: req.file.mimetype,
  };
};
