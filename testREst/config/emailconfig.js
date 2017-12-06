const nodemailer = require('nodemailer');

function configmail(){
  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport({
      service: 'Hotmail',
      auth: {
          user: 'plataformatransitopasto@hotmail.com',
          pass: '7hujikolp8'
      }
  });

  return transporter;
}

module.exports.configmail = configmail;