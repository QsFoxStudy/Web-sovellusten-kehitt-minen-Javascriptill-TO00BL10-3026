// API-avain ja osoite Last.fm:n rajapintaan
const API_AVAIN = "2cd0037aa9ddff0af96edb6fa6bd877b";
const API_OSOITE = "https://ws.audioscrobbler.com/2.0/";

// Haetaan HTML-elementit: artistin valintalista ja albumilista
const artistiValinta = document.getElementById("artistiValinta");
const albumilista = document.getElementById("albumilista");

// Kun käyttäjä vaihtaa artistia valikosta, haetaan uudet albumit
artistiValinta.addEventListener("change", () => {
  const artisti = artistiValinta.value; // otetaan valittu artisti
  haeAlbumit(artisti); // kutsutaan albumien hakufunktiota
});

// Funktio hakee artistin suosituimmat albumit Last.fm:n API:sta
function haeAlbumit(artisti) {
  albumilista.innerHTML = "Ladataan tietoja..."; // näytetään latausviesti

  // Rakennetaan API-kutsu artistin nimellä
  const url = `${API_OSOITE}?method=artist.gettopalbums&artist=${artisti}&api_key=${API_AVAIN}&format=json`;

  // Haetaan data fetch-kutsulla
  fetch(url)
    .then((vastaus) => vastaus.json()) // muunnetaan vastaus JSON-muotoon
    .then((data) => {
      albumilista.innerHTML = ""; // tyhjennetään vanhat albumit

      // Otetaan vain 6 ensimmäistä albumia listasta
      const albumit = data.topalbums.album.slice(0, 10);

      // Käydään albumit läpi ja lisätään ne sivulle
      albumit.forEach((albumi) => {
        const div = document.createElement("div"); // luodaan uusi div
        div.className = "albumikortti"; // annetaan CSS-luokka

        // Albumin kuva
        const kuva = document.createElement("img");
        kuva.src = albumi.image[2]["#text"]; //Keskikokoinen kuva
        kuva.alt = albumi.name; //alt kuvaus kuvalle

        //Albumin nimi
        const nimi = document.createElement("h3");
        nimi.textContent = albumi.name;

        // Kuuntelumäärä
        const kuuntelut = document.createElement("p");
        const luettavakuuntelu = new Intl.NumberFormat("fi-FI", {
          notation: "compact",
          maximumFractionDigits: 1, //Näyttää yhden desimaalin näin muokattu luettavampaan muotoon (esim 1,2 miljoonaa)
        }).format(albumi.playcount);

        kuuntelut.textContent = `Kuuntelukerrat: ${luettavakuuntelu}`;

        // Uusi OSA: Last.fm-linkki (URL)
        const linkki = document.createElement("a");
        linkki.href = albumi.url;
        linkki.textContent = "Katso lisää Last.fm:ssä";
        linkki.target = "_blank"; //Avaa uuteen välilehteen

        //Lisätään kaikki elementit korttiin
        div.appendChild(kuva);
        div.appendChild(nimi);
        div.appendChild(kuuntelut);
        div.appendChild(linkki);

        albumilista.appendChild(div); // lisätään div albumilistaan
      });
    })
    .catch((virhe) => {
      // Jos haku epäonnistuu, näytetään virheviesti
      console.error("Virhe tietojen haussa:", virhe);
      albumilista.textContent = "Tietojen hakeminen epäonnistui.";
    });
}

// Haetaan albumit heti sivun latautuessa valitulle artistille
haeAlbumit(artistiValinta.value);
