const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadDir = "./public/uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/uploads/"); // Save files to "uploads" folder
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    }
  });
  
  // File filter (Optional: Allow only specific file types)
  const fileFilter = (req, file, cb) => {
    console.log(file);
    if (!file) {
      return cb(new Error("File not found"), false);
    }
    cb(null, true); // Accept the file

    // if (file.mimetype.startsWith("image/")) {
    //   cb(null, true); // Accept the file
    // } else {
    //   cb(new Error("Only images are allowed!"), false);
    // }
  };
  
  // Configure Multer with storage, limits, and file filter
  const upload = multer({
    storage: storage,
    limits: { fileSize: 25 * 1024 * 1024 }, // 25MB file size limit
    fileFilter: fileFilter
  });

module.exports=upload;