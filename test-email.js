var postmark = require("postmark");

var client = new postmark.Client(process.env.POSTMARK_API_KEY);

client.sendEmail({
    "From": "fotballvarsel@rystad.no",
    "To": "frode.rystad@gmail.com",
    "Subject": "Test", 
    "TextBody": "Hilsen fra Fotballvarsel!"
}, function(error, result) {
    if(error) {
        console.error("Unable to send via postmark: " + error.message);
        return;
    }
    console.info("Sent to postmark for delivery")
});
