import multer, { FileFilterCallback } from "multer";
import fs from "fs";
import path from "path";
import { Request } from "express";
import { ApiError } from "../utils/apiError.utils";

export const uploader = () => {
  const folder = "uploads/";

  const fileSize = 5 * 1024 * 1024;

  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      const fileName = Date.now() + "-" + file.originalname;
      cb(null, fileName);
    },
  });

  const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => {
    const allowed_extensions = [
      ".png",
      ".jpg",
      ".peng",
      ".jpeg",
      ".svg",
      ".webp",
    ];

    const mime_types = [
      "image/png",
      "image/jpg",
      "image/peng",
      "image/webp",
      "image/svg+xml",
    ];

    const file_ext = path.extname(file.originalname);

    if (
      !mime_types.includes(file.mimetype) ||
      !allowed_extensions.includes(file_ext)
    ) {
      cb(
        new ApiError(
          `Invalid file format.  Only ${allowed_extensions.join(",").replaceAll(".", "")} files are accepted`,
          422,
        ),
      );
    } else {
      cb(null, true);
    }
  };

  const upload = multer({
    storage,
    fileFilter: fileFilter,
    limits: {
      fileSize: fileSize,
    },
  });
  return upload;
};
