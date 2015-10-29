var postmark = require("postmark");

var client = new postmark.Client(process.env.POSTMARK_API_KEY);

client.sendEmail({
    "From": "fotballvarsel@rystad.no",
    "To": "frode.rystad@gmail.com",
    "Subject": "Test", 
    "TextBody": "Hilsen fra Fotballvarsel!"
});