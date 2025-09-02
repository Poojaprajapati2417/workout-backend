import nodemailer from "nodemailer";

const sendmail = async (to, subject, text) => {
    console.log("SMTP_USER:", process.env.SMTP_USER);
    console.log("SMTP_PASS:", process.env.SMTP_PASS ? "Loaded ✅" : "Not Loaded ❌");

    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",   // ✅ Gmail shortcut
            auth: {
                user: process.env.SMTP_USER,   // Gmail ID
                pass: process.env.SMTP_PASS,   // App Password (not normal pwd)
            },
        });

        await transporter.sendMail({
            from: `"Workout form" <${process.env.SMTP_USER}>`,
            to,
            subject,
            text,
        });

        console.log("✅ Email sent successfully!!");
    } catch (error) {
        console.error("❌ Email failed:", error);
    }
};

export default sendmail;
