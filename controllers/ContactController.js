import ContactModel from "../models/ContactModel.js";

import sendMail from "../utils/sendmail.js";


const contactController = async (req, res) => {
    try {
        const { name, email, message } = req.body
        if (!name || !email || !message) {
            res.status(200).send({
                Status: "notsuccess",
                message: "All fields are required"

            })

        }
        const recruiter = await ContactModel.create(
            {
                name,
                email,
                message
            }
        )

        // 📧 Email Send
        const subject = "New Workout Tracker Contact Submission";
        const text = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
        await sendMail(process.env.SMTP_USER, subject, text);

        //  ✅ 2. Mail to  (user)
        const userSubject = "Thank You for Contacting Me!";
        const userText = `Hi ${name},

Thank you so much for taking the time to connect with me.


Looking forward to staying in touch!

Warm regards,
Poojakumari Prajapati`;
        await sendMail(email, userSubject, userText);


        return res.status(200).send({
            Status: "success",
            message: "Details submitted successfully!!",
            data: recruiter
        })
    } catch (error) {
        console.log("error registering response", error)
    }
}

export { contactController }