import "dotenv/config";
const ENV_CONFIG = {
  node_env: process.env.NODE_ENV!!,

  DB_URI: process.env.DB_URI!!,
  port: process.env.PORT!!,
};

export default ENV_CONFIG;
