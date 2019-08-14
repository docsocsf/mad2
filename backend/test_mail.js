const nodemailer = require('nodemailer');

async function main () {
  let mailer = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
      user: 'pp2916@ic.ac.uk',
      pass: process.env.EMAIL_PASSWORD
    }
  })

  let info = await mailer.sendMail({
    from: 'pp2916@ic.ac.uk',
    to: 'if2818@ic.ac.uk',
    subject: 'Hello',
    text: 'Hai adelina',
    html: '<h1>Hello Adelina</h1>'
  })

  console.log(info.messageId)
}

main().catch(err => {
  console.log(err);
})
