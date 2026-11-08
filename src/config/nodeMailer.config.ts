import nodemailer from "nodemailer";
import ENV_CONFIG from "./Env.config";

const transporter = nodemailer.createTransport({
  host: ENV_CONFIG.smtp_host,
  service: ENV_CONFIG.smtp_service,
  port: ENV_CONFIG.smtp_port,
  secure: ENV_CONFIG.smtp_port === "465",
  auth: {
    user: ENV_CONFIG.smtp_user,
    pass: ENV_CONFIG.smtp_pass,
  },
});

export const verifySMTPConnection = async () => {
  try {
    await transporter.verify();
    console.log("SMTP Server Connected");
  } catch (error) {
    console.log("verification failed:", error);
  }
};

export default transporter;
