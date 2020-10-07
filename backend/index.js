const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require("nodemailer")
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/api/receivedEmail', (req, res) => {

  nodemailer.createTestAccount((err, account) => {
    const htmlEmail = `
        <h3><strong>We'll take it from here.</strong></h3>
       <p> 
       Great news ${req.body.vendorName}, we've received your device!
       <br> 
        Next, your device will be inspected to validate its model and condition.  We will send you updated status soon.
        <br> 
If you have questions please email our <a href = "mailto: support@mobilesource.com">Support Team</a>
support team.  
Thank you
       </p> 
       <br> 
        <p> Your order has been received</p>
        <br> 
        <p> 
        Mobilesource Corp
        </p> 
        <br>
        <p> 
       561.416.7224
        </p> 
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
      subject: "Your buy-back order has arrived!",
      attachments: [
        {path: `${req.body.url}`}],
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