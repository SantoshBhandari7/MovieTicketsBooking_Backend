import { v2 as cloudinary } from "cloudinary";
import ENV_CONFIG from "./Env.config";

cloudinary.config({
  cloud_name: ENV_CONFIG.cloud_name,
  api_key: ENV_CONFIG.cloudinary_api_key,
  api_secrete: ENV_CONFIG.cloudinary_api_secrete,
});
