import "dotenv/config";
const ENV_CONFIG = {
  DB_URI: process.env.DB_URI!!,
  port: process.env.PORT!!,
};

export default ENV_CONFIG;
