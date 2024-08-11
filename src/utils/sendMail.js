const nodemailer = require("nodemailer");


let transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "gaston.cath14@gmail.com", // generated ethereal user
        pass: "dgzPO2WQqbpfN1t8", // generated ethereal password
    },
});



const sendMail = async (email, subject, text) => {
    try {
        await transporter.sendMail({
            from: 'gaston.cath14@gmail.com', // sender address
            to: email, // list of receivers
            subject: subject, // Subject line
            // text: text, // plain text body
            html: `<a>${text}</a>`, // html body
        });
        console.log("Correo enviado exitosamente a", email);
    } catch (error) {
        console.log("Error al enviar el correo:", error)
    }
}

module.exports = sendMail;