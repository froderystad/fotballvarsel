var postmark = require("postmark");

var protocol = process.env.TEST_PROTOCOL || "https";
var hostnameWithPort = process.env.TEST_HOSTNAME_WITH_PORT || "fotballvarsel.herokuapp.com";

var client = new postmark.Client(process.env.POSTMARK_API_KEY);
var fromAddress = "fotballvarsel@rystad.no";
var footer = "Takk for at du bruker Fotballvarsel! Feil og forbedringsønsker kan meldes til fotballvarsel@rystad.no.";

exports.sendEmail = function(subscriber, team, newArticles) {
    client.sendEmail({
      "From": fromAddress,
      "To": subscriber.email,
      "Subject": team.name + " har nye artikler",
      "TextBody": "Disse artiklene er nye:\n\n" + renderArticleUrls(newArticles) +
          footer + "\n\nLink for å endre dine abonnementer:\n" + loginLink(subscriber)
  });
};

var renderArticleUrls = function(articles) {
  var str = "";
  for (i = 0; i < articles.length; i++) {
    str = str + articles[i].title + "\n";
    str = str + articles[i].link + "\n\n";
  }
  return str;
};

exports.newSecret = function(subscriber, callback) {
    client.sendEmail({
        "From": fromAddress,
        "To": subscriber.email,
        "Subject": "Din innloggingslink til Fotballvarsel",
        "TextBody": "Din innloggingslink til Fotballvarsel:\n" +
        loginLink(subscriber) + "\n\n" +
        footer
    }, callback);
};

var loginLink = function(subscriber) {
    return protocol + "://" + hostnameWithPort + "/#/loginByLink/"+ subscriber.email + "?secret=" + subscriber.secret;
};
