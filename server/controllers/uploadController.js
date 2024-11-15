import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 8, // 8MB
  },
});

export const uploadPPCV = upload.fields([
  { name: "profile_pic", maxCount: 1 },
  { name: "cv", maxCount: 1 },
]);
