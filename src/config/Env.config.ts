import "dotenv/config";
const ENV_CONFIG = {
  node_env: process.env.NODE_ENV!!,

  DB_URI: process.env.DB_URI!!,
  port: process.env.PORT!!,

  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!!,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY!!,
  cloudinary_api_secrete: process.env.CLOUDINARY_API_SECRETE!!,
};

export default ENV_CONFIG;
