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

Tjenesten bruker MongoDB som database. Det må legges på en unik indeks på artiklenes id-felt (forskjellig fra `_id`).
`db.articles.createIndex( { id: 1 }, { unique: true } )`
