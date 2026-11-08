import { MailOptions } from "nodemailer/lib/smtp-pool";
import ENV_CONFIG from "../config/Env.config";
import transporter from "../config/nodeMailer.config";
interface IMailOptions {
  to: string;
  subject: string;
  html: string;
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: any[];
}

export const sendEmail = async (mailOptions: IMailOptions) => {
  const { to, html, subject, cc, bcc, attachments } = mailOptions;
  try {
    const options: MailOptions = {
      to,
      from: ENV_CONFIG.smtp_mail_from,
      html,
      subject,
    };
    if (bcc) {
      options["bcc"] = bcc;
    }
    if (cc) {
      options["cc"] = cc;
    }

    if (attachments) {
      options["attachments"] = attachments;
    }

    await transporter.sendMail(options);
    console.log("mail sent to:", to);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
