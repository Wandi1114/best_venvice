var otp = require('otp-generator');

var code = otp.generate(6,{
    upperCase : false,
    alphabets : false,
    specialChars : false
})

console.log(code);