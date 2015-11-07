var postmark = require("postmark");

var client = new postmark.Client(process.env.POSTMARK_API_KEY);

exports.sendEmail = function(subscriber, team, newArticles) {
  client.sendEmail({
      "From": "fotballvarsel@rystad.no",
      "To": subscriber.email,
      "Subject": team.name + " har " + newArticles.length + " nye artikler", 
      "TextBody": "Disse artiklene er nye:\n\n" + renderArticleUrls(newArticles) + "Takk for at du bruker Fotballvarsel-tjenesten! Feil og forbedringsønsker kan meldes til fotballvarsel@rystad.no."
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