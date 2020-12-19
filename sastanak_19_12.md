APIJI
facebook
trakt (ima IDjeve na druge apije) - search Facebook stranica
tmdb
tastedive

Baza
- preporuke
- pogledani filmovi
- filmovi koje želi pogledat

1) metoda za mapiranje fejs filma (naziv, overview, birthday)
	- prvi način: fejs film -> trakt search id -> trakt movie recommendations -> baza (userFb kolekcija)
	- drugi način: fejs film -> tastedive -> mapiranje na bazu -> baza (userFb kolekcija)

2) trakt - za opcenito dohvat filmova (popularni itd.) -> ne spremamo u bazu, ide direkt upit na api

funkcija prima trakt ID
-> sve potrebne upite na druge apije (tmdb)
-> stvara "naš" filmski objekt

3) lista za gledanje ili pogledani filmovi: filmovi koje izbaci trakt će se spremit u bazu
	- towatch kolekcija
	- watched kolekcija

4) ALGORITAM ZA PREPORUČIVANJE
	- TODO ZA NEXT SASTANAK