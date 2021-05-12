const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/test", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.post("/api/receivedEmail", (req, res) => {
  nodemailer.createTestAccount((err, account) => {
    const htmlEmail = `
        <h3><strong>We'll take it from here.</strong></h3>
       <p> 
       Great news ${req.body.vendorName}, we've received your device!
       <br> 
        Next, your device will be inspected to validate its model and condition.  We will send you updated status soon.
        <br> 
If you have questions please email our <a href = "mailto: support@mobilesource.com">Support Team</a>
.  
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
      `;
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "donot-reply@mobilesource.com", // generated ethereal user
        pass: "M@bile2020", // generated ethereal password
      },
    });
    let mailOptions = {
      from: "donot-reply@mobilesource.com",
      to: `${req.body.email}`,
      subject: "Your buy-back order has arrived!",
      html: htmlEmail,
    };

    console.log("rq.body", req.body);

    if (req.body.pictureGallery) {
      mailOptions.attachments = req.body.pictureGallery.map((picture) => ({
        path: picture.url,
      }));
    }

    console.log("mailOoptions ", mailOptions);

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return console.log(err);
      }
      console.log("Message Sent!!!");
    });
  });
});

app.post("/api/paymentEmail/", (req, res) => {
  nodemailer.createTestAccount((err, account) => {
    const htmlEmail = `
      
        <p>Dear ${req.body.vendorName} </p> 
        <p> Your payment is being processed, so you will receive a check in the mail for the amount of $${req.body.poTotal} within the next 3-5 business days. </p>
        <br> 
        <p> 
If you have questions please email our <a href = "mailto: support@mobilesource.com">Support Team</a>
.  <br>
Thank you</p>
        <br> 
        <p> 
        Mobilesource Corp
        </p> 
        <br>
        <p> 
       561.416.7224
        </p> 
      `;
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "donot-reply@mobilesource.com", // generated ethereal user
        pass: "M@bile2020", // generated ethereal password
      },
    });
    let mailOptions = {
      from: "donot-reply@mobilesource.com",
      to: `${req.body.email}`,
      subject: "Great News!!!",

      text: "Your payment has been initiated!",
      html: htmlEmail,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return console.log(err);
      }
      console.log("Message Sent!!!");
    });
  });
});
app.post("/api/orderProcess/", (req, res) => {
  nodemailer.createTestAccount((err, account) => {
    const htmlEmail = `
        <h3><strong>We are working on your order</strong></h3>
       
        <p> We appreciate your patience, We have completed testing of all the devices and we are making the proper adjustments to guarantee you the best price available. 
        </p>
        <br> 
        <p> 
        If you have questions please email our <a href = "mailto: support@mobilesource.com">Support Team</a>
        support team.  
        Thank you
               </p> 
               <p> 
               Mobilesource Corp
               </p> 
               <br>
               <p> 
              561.416.7224
               </p> 
      `;
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "donot-reply@mobilesource.com", // generated ethereal user
        pass: "M@bile2020", // generated ethereal password
      },
    });
    let mailOptions = {
      from: "donot-reply@mobilesource.com",
      to: `${req.body.email}`,
      text: "Text Received Order Email",
      html: htmlEmail,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return console.log(err);
      }
      console.log("Message Sent!!!");
    });
  });
});

app.post('/api/emailQuickQuote', (req, res) => {

  nodemailer.createTestAccount((err, account) => {
    const htmlEmail = `
        <h3><strong>HERE IS YOUR QUOTE</strong></h3>
       
        <p> Hello  ${req.body.customerName}
        </p>
        <p> Your quote for <strong> ${req.body.phoneModel.model} ${req.body.phoneModel.carrier} ${req.body.phoneModel.memory} </strong> n Good Condition
        </p>
        <br> 
        <p> <strong>$${req.body.customerQuote}</strong>  
        
        </p>
        <br/>
        </p> 
        Pending upon device inspection
        <p> 
        <br/>
        <p> 
        This offer is valid for 10 days 
        </p> 
        If you have questions please email our <a href = "mailto: support@mobilesource.com">Support Team</a>
        support team.  
        Thank you
               </p> 
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
      to: `${req.body.customerEmail}`,
      subject: "YOUR MOBILESOURCE OFFER IS READY",

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


const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server listing on port ${PORT}`);
});
