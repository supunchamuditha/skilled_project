import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const uploadPPCV = upload.fields([
  { name: "profile_pic", maxCount: 1 },
  { name: "cv", maxCount: 1 },
]);
