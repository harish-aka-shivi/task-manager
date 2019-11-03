const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// sgMail.send({
//     to:'r.shivi@yahoo.com',
//     from:'r.shivi@yahoo.com',
//     subject:'Mail from sendgrid',
//     text:'This is my sendgrid mail first'
// })

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to:email,
        from:'r.shivi@yahoo.com',
        subject:'Thanks for joining in',
        text:`Welcome ${name} to task manager app`,
    }).then((res) => {
    //    console.log(res); 
    }).catch(e => {
        // console.log(e);
    });
}

const sendGoodbyeEmail = (email, name) => {
    // console.log('calling send eamil', email,name);
    sgMail.send({
        to:email,
        from:'r.shivi@yahoo.com',
        subject:'Thank you for the journey',
        text:`Goodbye ${name} `,
    }).then((res) => {
    //    console.log(res); 
    }).catch(e => {
        // console.log(e);
    });
}


module.exports = {
    sendWelcomeEmail,
    sendGoodbyeEmail
}