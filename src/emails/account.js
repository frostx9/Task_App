const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name)=>{
    sgMail.send({
        to: email,
        from: 'saumyasom92@gmail.com',
        subject: 'Thanks For Joining',
        text:`Welcome to the app , ${name}.`
    })

}

const sendCancellEmail = (email, name)=>{
    sgMail.send({
        to:email,
        from:'saumyasom92@gmail.com',
        subject:'Good Bye! Hope We see you again',
        text:`Thank You ${name} for using our app`

    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellEmail  
}