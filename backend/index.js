const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require("nodemailer")
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/api/receivedEmail', (req, res) => {

  nodemailer.createTestAccount((err, account) => {
    const htmlEmail = `
        <h3>Test Email</h3>
        <ul>
          <li> Email Test: ${req.body.email}</li>
          
        </ul>
        <p> Your order has been received</p>
      `
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'donot-reply@mobilesource.com', // generated ethereal user
        pass: 'M@bile2020' // generated ethereal password
      },
    });
    let mailOptions = {
      from: 'donot-reply@mobilesource.com',
      to: `${req.body.email}`,
      text: "Text Received Order Email",
      html: htmlEmail
    }
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return console.log(err)
      }
      console.log('Message Sent!!!')
    })
  })
})

app.post('/api/paymentEmail', (req, res) => {

  nodemailer.createTestAccount((err, account) => {
    const htmlEmail = `
        <h3>Test Email</h3>
        <ul>
          <li> Email Test: ${req.body.email}</li>
          
        </ul>
        <p> Payment is on the way!</p>
      `
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'donot-reply@mobilesource.com', // generated ethereal user
        pass: 'M@bile2020' // generated ethereal password
      },
    });
    let mailOptions = {
      from: 'donot-reply@mobilesource.com',
      to: `${req.body.email}`,
      text: "Text Received Order Email",
      html: htmlEmail
    }
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return console.log(err)
      }
      console.log('Message Sent!!!')
    })
  })
})
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server listing on port ${PORT}`)
})