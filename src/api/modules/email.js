const nodemailer = require('nodemailer')
const SMTP_CONFIG = require('../../configs/smtp')
const FROM = "Developers GamaBank"

let transporter = nodemailer.createTransport({
    host: SMTP_CONFIG.host,
    port: SMTP_CONFIG.port,
    secure: false,
    auth: {
        user: SMTP_CONFIG.user,
        pass: SMTP_CONFIG.pass
    },
    tls: {
        rejectUnauthorized: false
    }
})


class Email {
    constructor(to, subject, text) {
        this.to = to
        this.subject = subject
        this.text = text
    }
    async run(){
        const mailSent = await transporter.sendMail({
            from: FROM,
            to:  this.to,
            subject:  this.subject,
            text: this.text
        });
        
        return mailSent
    }
}

module.exports = Email