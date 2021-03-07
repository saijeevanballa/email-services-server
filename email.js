var nodemailer = require('nodemailer');

const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL,
    pass: PASSWORD
  }
});

function sendMail(options){
    try {
        var mailOptions = {
            from: EMAIL,
            to: options.email,
            subject: options.subject,
            text: options.text
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    } catch (error) {
        console.log("error occur while sent mail", error)
    }
}

module.exports = sendMail;