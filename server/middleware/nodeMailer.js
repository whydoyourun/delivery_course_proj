const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport(
    {
        host: 'smtp.mail.ru',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
           
            user: 'pizzamail123@mail.ru', 
            pass: 'eSrKtymyFxUvBQJQpnrb' 
        }
    },
    {
        from: 'Nasha pizza <pizzamail123@mail.ru>',
    }
)

const mailer = message => {
    transporter.sendMail(message, (err, info) => {
        if(err) return console.log(err)
        console.log('Email sent: ', info)
    })
}

module.exports = mailer

//mail ru - pizzamail123@mail.ru || 81451528136500c || eSrKtymyFxUvBQJQpnrb