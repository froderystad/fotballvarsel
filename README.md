# Fotballvarsel #

Dette er en applikasjon for å varsle når det legges ut nyheter på [Skeid sine nettsider](http://skeid.no). Behovet skyldes at publiseringsløsningen [123klubb](http://www.123klubb.no/) fra KX Products as ikke har støtte for varsling ved oppdateringer.

## Bruksanvisning ##

Brukere som er interessert i å registrere eller endre et varsel kan gå til https://fotballvarsel.herokuapp.com. Ved å oppgi sin e-postadresse får brukeren tilsendt en link til en side hvor du kan velge hvilke oversiktssider du ønsker å abonnere på. Der kan nye varsel opprettes, og varsel kan slettes.

Applikasjonen sjekker for endringer hver time, og sender deg e-post hvis en oversiktsside du abonnerer på får en ny artikkel.

## Ansvarsfraskrivelse ##

Tjenesten er utviklet av [Frode Rystad](mailto:frode.rystad@gmail.com) på privat initiativ. Tjenesten er på ingen måte assosiert med Rystads arbeidsgiver, Skeid eller KX Products as. Spørsmål om applikasjonen rettes til Rystad direkte.

Tjenesten tilbys gratis og uten garantier. Frode Rystad er uten erstatningsansvar hvis feil i tjenesten skulle medføre problemer for abonnenten.

## Teknisk informasjon ##

Dette er informasjon om utvikling og drift. Brukere trenger ikke lese dette.

### Utvikleroppsett

Du trenger NPM, Node og MongoDB installert. Løsningen er lagd for å kjøre i Heroku, og du trenger derfor en `.env`-fil med følgende properties:

```
PORT=  
POSTMARK_API_KEY=  
MONGOLAB_URI=  
```

Etter å ha klonet Git-repoet, kommer du i gang med følgende kommandoer:

```
npm install  
env $(cat .env | xargs) node server.js  
```

Hvis du utvikler på Windows, noe jeg absolutt ikke kan anbefale, så kan det hende Node ikke stenger ned
som det skal. Avslutt da prosessen med `taskkill /F /IM node.exe`

### Databaseindex

Tjenesten bruker MongoDB som database. Det må legges på en unik indeks på artiklenes id-felt:
```db.articles.createIndex( { id: 1 }, { unique: true } )```
