import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the current file directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create the uploads directory inside Backend
const uploadDir = path.resolve(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure image storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const cleanName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "-");
    const uniqueName = `${Date.now()}-${cleanName}`;

    cb(null, uniqueName);
  },
});

// Allow image files only
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

// Configure Multer
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Maximum 5 MB
  },
});
