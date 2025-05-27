import multer from "multer";
import path from "path";

//argh relative naming can break depending upon where the server is launched
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("public/tmp")); // safer than relative "../../"
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({ storage });
