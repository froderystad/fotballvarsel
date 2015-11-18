var postmark = require("postmark");

var client = new postmark.Client(process.env.POSTMARK_API_KEY);
var fromAddress = "fotballvarsel@rystad.no";
var footer = "Takk for at du bruker Fotballvarsel-tjenesten! Feil og forbedringsønsker kan meldes til fotballvarsel@rystad.no.";

exports.sendEmail = function(subscriber, team, newArticles) {
    client.sendEmail({
      "From": fromAddress,
      "To": subscriber.email,
      "Subject": team.name + " har " + newArticles.length + " nye artikler", 
      "TextBody": "Disse artiklene er nye:\n\n" + renderArticleUrls(newArticles) + footer
  });
};

var renderArticleUrls = function(articles) {
  var str = "";
  for (i = 0; i < articles.length; i++) {
    str = str + articles[i].title + "\n";
    str = str + "http://skeid.no" + articles[i].link + "\n\n";
  }
  console.log("Rendering %d articles as: %s", articles.length, str);
  return str;
};

exports.newSecret = function(subscriber, callback) {
    client.sendEmail({
        "From": fromAddress,
        "To": subscriber.email,
        "Subject": "Din innloggingslink til Fotballvarsel",
        "TextBody": "Din innloggingslink til Fotballvarsel:\n"
            + "https://fotballvarsel.heroku.com/#/loginByLink/"+ subscriber.email + "?secret=" + subscriber.secret
            + "\n\n" + footer
    }, callback);
};
