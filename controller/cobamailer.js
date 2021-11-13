const { NotExtended } = require('http-errors');
const mailer = require('nodemailer');
const { google } = require('googleapis')
const CLIENT_ID = '377975876113-7184bj5osbimbb46cl3hnh5vgi41gunn.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04oz5dLObkIw3CgYIARAAGAQSNwF-L9IrzoFPKlaBCgTwOvWw2iNiGa5gKoD19N3zQTSY9cXZzadfpghbebKk_Lh3X0vgWXfYzRE'
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN})
var smtpTransport = require('nodemailer-smtp-transport');
// const accessToken = await oAuth2Client.getAccessToken()

var transporter = 
    const accessToken = oAuth2Client.getAccessToken()
    mailer.createTransport({
    
    service : 'gmail',
    auth : {
        type : "OAUTH2",
        user : "venviceindoensia@gmail.com",
        clientId: CLIENT_ID,
        clientSecret:CLIENT_SECRET,
        refreshToken:REFRESH_TOKEN,
        accessToken : accessToken
    }
})

var mailOptions = {
    from : "Official Vendvice <noreply>",
    to : "wandidh25.wd@gmail.com",
    subject : "TESTING API",
    text : "PESAN INI GAUSAH DIBALES YA ... !",
    html : "<button><a href='venvice.id'> KLIK DISINI <a><button>"
};

transporter.sendMail(mailOptions, (err, info)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Email berhasil dikirim : " + info.response);
    }
})