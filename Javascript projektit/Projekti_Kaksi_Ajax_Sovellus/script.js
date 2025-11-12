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
        .then(vastaus => vastaus.json()) // muunnetaan vastaus JSON-muotoon
        .then(data => {
            albumilista.innerHTML = ""; // tyhjennetään vanhat albumit

            // Otetaan vain 6 ensimmäistä albumia listasta
            const albumit = data.topalbums.album.slice(0, 6); 

            // Käydään albumit läpi ja lisätään ne sivulle
            albumit.forEach(albumi => {
                const div = document.createElement("div"); // luodaan uusi div
                div.className = "albumikortti"; // annetaan CSS-luokka
                div.textContent = albumi.name; // albumin nimi näkyviin
                albumilista.appendChild(div); // lisätään div albumilistaan
            });
        })
        .catch(virhe => {
            // Jos haku epäonnistuu, näytetään virheviesti
            console.error("Virhe tietojen haussa:", virhe);
            albumilista.textContent = "Tietojen hakeminen epäonnistui.";
        });
}

// Haetaan albumit heti sivun latautuessa valitulle artistille
haeAlbumit(artistiValinta.value);

