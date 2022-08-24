const express = require('express')
const app = express()
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

let smtp_login = process.env.SMTP_LOGIN ;
let smtp_password = process.env.SMTP_PASSWORD ;

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: smtp_login ,
        pass: smtp_password
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})



app.post('/sendMessage', async function (req, res) {

    let {name, email, message} = req.body

    let info = await transporter.sendMail({
        from: 'HR want me 👻', // sender address
        to: "zent230096@mail.ru", // list of receivers
        subject: "Job offer", // Subject line
        html: `<b>Message from your portfolio</b>
<div>
name:${name}
</div>
<div>
email:${email}
</div>
<div>
${message}
</div>`,
    });

    res.send('ok')
})

let port = process.env.PORT;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})