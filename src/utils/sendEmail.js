const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");
const dotenv = require('dotenv');
dotenv.config();

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});

const sentFrom = new Sender("you@trial-o65qngkmd7wlwr12.mlsender.net", "Oikarium");

/**
 * Sends an email to the specified recipients.
 *
 * @param {string[]} recipients - The email addresses of the recipients.
 * @param {string} subject - The subject of the email.
 * @param {string} setHtml - The HTML content of the email.
 * @param {string} setText - The plain text content of the email.
 * @returns {Promise<void>} - A promise that resolves when the email is sent successfully, or rejects with an error if there was a problem sending the email.
 */
const sendEmail = async (recipients, subject, setHtml, setText) => {
  try {
    const sendToMails = recipients.map(email => new Recipient(email));

    const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(sendToMails)
    .setReplyTo(sentFrom)
    .setSubject(subject)
    .setHtml(setHtml)
    .setText(setText);
    
    await mailerSend.email.send(emailParams)
    console.log("Correo enviado exitosamente")
  } catch (error) {
    console.log("Error al enviar el correo:", error)
  }
}

module.exports = sendEmail;