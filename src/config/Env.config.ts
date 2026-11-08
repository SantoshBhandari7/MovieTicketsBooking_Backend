import "dotenv/config";
const ENV_CONFIG = {
  node_env: process.env.NODE_ENV!!,

  DB_URI: process.env.DB_URI!!,
  port: process.env.PORT!!,

  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!!,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY!!,
  cloudinary_api_secrete: process.env.CLOUDINARY_API_SECRETE!!,

  cookie_expiry: process.env.COOKIE_EXPIRY!!,

  jwt_secrete: process.env.JWT_SECRETE!!,
  jwt_expiries_in: process.env.JWT_EXPIRIES_IN!!,

  smtp_host: process.env.SMTP_HOST!!,
  smtp_service: process.env.SMTP_SERVICE!!,
  smtp_port: process.env.SMTP_PORT!!,
  smtp_user: process.env.SMTP_USER!!,
  smtp_pass: process.env.SMTP_PASS!!,
  smtp_mail_from: process.env.SMTP_MAIL_FROM!!,
};

export default ENV_CONFIG;
