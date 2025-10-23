// Haetaan HTML-elementti, johon ostokset lisätään
const lista = document.querySelector("#lista-ostokset");

// Haetaan tekstikenttä, johon käyttäjä kirjoittaa uuden ostoksen
const kenttä = document.querySelector("#tavara");

// Kuunnellaan lomakkeen lähettämistä (Lisää-nappi)
document
  .getElementById("ostoslomake")
  .addEventListener("submit", function (event) {
    // Estetään lomakkeen oletustoiminto (sivun uudelleenlataus)
    event.preventDefault();
    // Kutsutaan funktiota, joka lisää uuden rivin listaan
    lisaaListaan();
  });

// Kuunnellaan Poista-napin painallusta
document
  .getElementById("poisto-nappi")
  .addEventListener("click", poistaViimeinen);

// Kuunnellaan Tyhjennä-napin painallusta
document
  .getElementById("tyhjennä-nappi")
  .addEventListener("click", function () {
    // Tyhjennetään koko lista
    lista.innerHTML = "";
  });

// Funktio, joka lisää uuden ostoksen listaan
function lisaaListaan() {
  // Haetaan kentän arvo ja poistetaan alusta/lopusta tyhjät välit
  const listateksti = kenttä.value.trim();

  // Tarkistetaan, että syöte ei ole tyhjä ja on vähintään 3 merkkiä
  if (listateksti === "" || listateksti.length < 3) {
    alert("Vähintään 3 merkkiä pitkä!");
    kenttä.className = "virhe"; // Lisätään virheluokka kenttään
    return;
  }

  kenttä.className = ""; // Poistetaan virheluokka, jos syöte on ok

  // Luodaan uusi listaelementti annetulla tekstillä
  const listarivi = luoListaRivi(listateksti);

  // Lisätään uusi rivi listaan
  lista.appendChild(listarivi);

  // Tyhjennetään tekstikenttä
  kenttä.value = "";
}

// Funktio, joka poistaa viimeisen ostoksen listasta
function poistaViimeinen() {
  const listanviimeinen = lista.lastElementChild;

  // Jos listassa on rivejä, poistetaan viimeinen
  if (listanviimeinen) {
    listanviimeinen.remove();
  }
}

// Funktio, joka luo uuden <li>-elementin ostokselle
function luoListaRivi(teksti) {
  // Luodaan uusi listaelementti
  const listarivi = document.createElement("li");

  // Luodaan <span>, joka sisältää ostoksen tekstin
  const tekstispan = document.createElement("span");
  tekstispan.textContent = teksti;

  // Luodaan checkbox, jolla voi merkitä ostoksen ostetuksi
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  // Kuunnellaan checkboxin tilan muutosta
  checkbox.addEventListener("change", function () {
    // Vaihdetaan ostetun luokkaa päälle/pois
    if (tekstispan.className === "ostettu") {
      tekstispan.className = "";
    } else {
      tekstispan.className = "ostettu";
    }
  });

  // Lisätään tekstispan ja checkbox listaelementtiin
  listarivi.appendChild(tekstispan);
  listarivi.appendChild(checkbox);

  // Palautetaan valmis listaelementti
  return listarivi;
}
