const nodemailer = require("nodemailer");


let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});



const sendMail = async (email, subject, text) => {
    try {
        await transporter.sendMail({
            from: 'gaston.cath14@gmail.com', // sender address
            to: email, // list of receivers
            subject: subject, // Subject line
            // text: text, // plain text body
            html: `${text}`, // html body
        });
        console.log("Correo enviado exitosamente a", email);
    } catch (error) {
        console.log("Error al enviar el correo:", error)
    }
}

module.exports = sendMail;