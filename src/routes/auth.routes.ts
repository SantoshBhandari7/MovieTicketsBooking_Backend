import express from "express";
import { Login, register } from "../controllers/auth.controller";
import { uploader } from "../middlewares/multer.middleware";
import { validate } from "../middlewares/validator.middleware";
import { loginSchema, userRegisterSchema } from "../validators/auth.validator";
const router = express.Router();
const upload = uploader();

router.post(
  "/register",
  upload.single("profile_image"),
  validate(userRegisterSchema),
  register,
);

router.post("/login", validate(loginSchema), Login);

export default router;
