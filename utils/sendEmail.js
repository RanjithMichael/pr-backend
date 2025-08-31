import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text) => {
  try {
    // transporter setup
    const transporter = nodemailer.createTransport({
      service: "gmail", // or "smtp"
      auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS, // app password
      },
    });

    // email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    // send email
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully");
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    throw new Error("Email could not be sent");
  }
};

export default sendEmail;
