interface EmailProps {
  full_name: string;
  email: string;
  createdAt: Date;
}

export const registerEmailTemplate = ({
  full_name,
  email,
  createdAt,
}: EmailProps) => {
  const registrationDate = new Date(createdAt).toLocaleString("en-NP", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Asia/Kathmandu",
  });

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to MKSH</title>
  </head>

  <body style="margin:0;padding:0;background-color:#f4f4f5;font-family:Arial,sans-serif;">

    <div style="max-width:600px;margin:30px auto;background-color:#ffffff;border-radius:12px;overflow:hidden;">

      <div style="background-color:#171717;padding:30px;text-align:center;">
        <h1 style="color:#e50914;margin:0;font-size:28px;">
          MKSH TIXORA
        </h1>
        <p style="color:#ffffff;font-size:14px;">
          Your Movie. Your Seat. Your Experience.
        </p>
      </div>

      <div style="padding:35px 30px;">

        <h2 style="color:#171717;">
          Welcome, ${full_name}! 🎬
        </h2>

        <p style="color:#525252;font-size:15px;line-height:1.7;">
          Congratulations! Your account has been successfully
          created with MKSH Tixora.
        </p>

        <p style="color:#525252;font-size:15px;line-height:1.7;">
          Now you can explore movies, check showtimes,
          select your favorite seats, and book movie tickets easily.
        </p>

        <div style="background-color:#f4f4f5;padding:20px;border-radius:8px;margin:25px 0;">

          <h3 style="color:#171717;margin-top:0;">
            Your Account Details
          </h3>

          <p style="color:#525252;font-size:14px;">
            <strong>Full Name:</strong> ${full_name}
          </p>

          <p style="color:#525252;font-size:14px;">
            <strong>Email Address:</strong> ${email}
          </p>

          <p style="color:#525252;font-size:14px;">
            <strong>Registration Date:</strong> ${registrationDate}
          </p>

          <p style="color:#16a34a;font-size:14px;">
            <strong>Account Status:</strong> Successfully Registered
          </p>

        </div>

        <p style="color:#525252;font-size:14px;line-height:1.7;">
          Thank you for choosing MKSH Tixora.
          We hope you enjoy an amazing movie experience with us!
        </p>

        <h3 style="color:#171717;">Happy Watching! 🍿</h3>

      </div>

      <div style="background-color:#171717;padding:20px;text-align:center;">
        <p style="color:#a3a3a3;font-size:12px;">
          © ${new Date().getFullYear()} MKSH Tixora. All rights reserved.
        </p>
        <p style="color:#a3a3a3;font-size:12px;">
          This is an automated email. Please do not reply.
        </p>
      </div>

    </div>
  </body>
  </html>
  `;
};

interface LoginEmailProps {
  full_name: string;
  email: string;
  loginDate: Date;
}

export const loginEmailTemplate = ({
  full_name,
  email,
  loginDate,
}: LoginEmailProps) => {
  const formattedLoginDate = new Date(loginDate).toLocaleString("en-NP", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Asia/Kathmandu",
  });

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Login Notification</title>
  </head>

  <body style="
    margin: 0;
    padding: 0;
    background-color: #f4f4f5;
    font-family: Arial, sans-serif;
  ">

    <div style="
      max-width: 600px;
      margin: 30px auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
    ">

      <!-- Header -->
      <div style="
        background-color: #171717;
        padding: 30px;
        text-align: center;
      ">
        <h1 style="color: #e50914; margin: 0; font-size: 28px;">
          MKSH TIXORA
        </h1>

        <p style="color: #ffffff; font-size: 14px;">
          Your Movie. Your Seat. Your Experience.
        </p>
      </div>

      <!-- Main Content -->
      <div style="padding: 35px 30px;">

        <h2 style="color: #171717;">
          Hello, ${full_name}! 👋
        </h2>

        <p style="
          color: #525252;
          font-size: 15px;
          line-height: 1.7;
        ">
          You have successfully logged in to your
          MKSH Tixora account.
        </p>

        <!-- Login Details -->
        <div style="
          background-color: #f4f4f5;
          padding: 20px;
          border-radius: 8px;
          margin: 25px 0;
        ">

          <h3 style="color: #171717; margin-top: 0;">
            Login Details
          </h3>

          <p style="color: #525252; font-size: 14px;">
            <strong>Full Name:</strong> ${full_name}
          </p>

          <p style="color: #525252; font-size: 14px;">
            <strong>Email Address:</strong> ${email}
          </p>

          <p style="color: #525252; font-size: 14px;">
            <strong>Login Date:</strong> ${formattedLoginDate}
          </p>

          <p style="color: #16a34a; font-size: 14px;">
            <strong>Login Status:</strong> Successful
          </p>

        </div>

        <p style="
          color: #525252;
          font-size: 14px;
          line-height: 1.7;
        ">
          If this login was made by you, you can safely
          ignore this email.
        </p>

        <p style="
          color: #dc2626;
          font-size: 14px;
          line-height: 1.7;
        ">
          If you did not log in to your account,
          please change your password immediately.
        </p>

        <h3 style="color: #171717;">
          Enjoy Your Movie! 🍿
        </h3>

      </div>

      <!-- Footer -->
      <div style="
        background-color: #171717;
        padding: 20px;
        text-align: center;
      ">
        <p style="color: #a3a3a3; font-size: 12px;">
          © ${new Date().getFullYear()} MKSH Tixora.
          All rights reserved.
        </p>

        <p style="color: #a3a3a3; font-size: 12px;">
          This is an automated email. Please do not reply.
        </p>
      </div>

    </div>

  </body>
  </html>
  `;
};
