// Tämä skripti hallinnoi ostoslistaa jQueryllä:
// Lisää uusia ostoksia listaan
// Mahdollistaa valittujen poistamisen ja koko listan tyhjentämisen
// Tallentaa listan localStorageen, jotta se säilyy sivun uudelleenlatauksessa
// jQueryn "document ready" -funktio korvaa puhtaan JS:n latauskuuntelijan
$(document).ready(function () {
  // Haetaan elementit jQuery-selektoreilla ($ on lyhenne jQuerylle)
  const $lista = $("#lista-ostokset");
  const $kentta = $("#tavara");

  // Ladataan ostokset localStoragesta sivun latautuessa
  lataaOstokset();

  // Kuunnellaan lomakkeen lähettämistä (Lisää-nappi)
  // Estetään oletustoiminto eli sivuston uudelleenlataus (event.preventDefault()) automaattisesti
  $("#ostoslomake").on("submit", function (event) {
    event.preventDefault();
    lisaaListaan();
  });

  // Kuunnellaan Poista-napin painallusta
  $("#poisto-nappi").on("click", poistaValitut);

  // Kuunnellaan Tyhjennä-napin painallusta
  $("#tyhjennä-nappi").on("click", function () {
    // jQueryn .empty() tyhjentää sisällön
    $lista.empty();
    tallennaOstokset(); // Tallennetaan tyhjä lista
  });

  // Funktio, joka luo uuden <li>-elementin ostokselle jQueryllä
  function luoListaRivi(teksti, ostettu = false) {
    // Luodaan uusi listaelementti ja sen sisältö 
    const $listarivi = $("<li>").addClass(
      "flex justify-between items-center py-2 border-b border-gray-200"
    );
    const $tekstispan = $("<span>").text(teksti).addClass("flex-grow mr-4"); // ANTAA VÄLIN
    const $checkbox = $("<input>").attr("type", "checkbox").addClass("h-4 w-4");

    // Jos tuote oli jo ostettu (ladattu localStoragesta), merkitään se
    if (ostettu) {
      $checkbox.prop("checked", true);
      $tekstispan.addClass("line-through text-gray-400");
    }

    // Kuunnellaan checkboxin tilan muutosta (tapahtumakuuntelija jQueryllä)
    $checkbox.on("change", function () {
      // jQueryn .toggleClass() vaihtaa luokkaa helposti
      $tekstispan.toggleClass("line-through text-gray-400");
      tallennaOstokset(); // Tallennetaan tila muutoksen jälkeen
    });

    // Lisätään osat riviin jQueryn .append() metodilla
    $listarivi.append($tekstispan).append($checkbox);

    // Palautetaan jQuery-olio
    return $listarivi;
  }

  // Funktio, joka lisää uuden ostoksen listaan
  function lisaaListaan() {
    const listateksti = $kentta.val().trim(); // jQueryn .val() hakee arvon

    // LisaaListaan funktiossa, jos syöte on lyhyt:
    if (listateksti === "" || listateksti.length < 3) {
      // Lisää punainen reunus ja placeholder-teksti
      $kentta.addClass("border-red-500 placeholder-red-400");
      alert("Vähintään 3 merkkiä pitkä!");
      return;
    }
    // Poista luokat, kun syöte on OK
    $kentta.removeClass("border-red-500 placeholder-red-400");

    const $listarivi = luoListaRivi(listateksti);

    $lista.append($listarivi); // Lisätään uusi rivi listaan
    $kentta.val(""); // Tyhjennetään kenttä
    tallennaOstokset(); // Tallennetaan uusi tila
  }

  // UUSI FUNKTIO: Poistaa valitut ostokset
  function poistaValitut() {
    // 1. Etsi kaikki listan rivit ($lista on ul-elementti)
    // 2. Etsi niiden sisältä input[type='checkbox']:checked -valintaruutu
    // 3. Etsi näiden valintaruutujen vanhempi (li), joka on koko rivi
    // 4. Poista nämä valitut rivit (.remove())

    $lista.find("input[type='checkbox']:checked").closest("li").remove();

    // Tallenna muuttunut tila heti
    tallennaOstokset();
  }

  // Funktio, joka tallentaa ostoslistan localStorageen
  function tallennaOstokset() {
    // Luodaan tyhjä taulukko, johon kerätään kaikki ostokset
    const ostokset = [];

    // Käydään läpi jokainen listan <li>-elementti jQueryn .each()-metodilla
    $lista.find("li").each(function () {
      // Haetaan rivin tekstisisältö (span-elementistä)
      const teksti = $(this).find("span").text();

      // Tarkistetaan, onko rivin checkbox valittuna (.is(":checked"))
      const ostettu = $(this).find("input[type='checkbox']").is(":checked");

      // Lisätään ostos taulukkoon objektina { teksti: ..., ostettu: ... }
      ostokset.push({ teksti: teksti, ostettu: ostettu });
    });

    // Muutetaan taulukko JSON-merkkijonoksi ja tallennetaan localStorageen
    // Avain "kauppalistaTieto" toimii tunnisteena, jolla data haetaan myöhemmin
    localStorage.setItem("kauppalistaTieto", JSON.stringify(ostokset));
  }

  // Funktio, joka lataa ostokset selaimen localStoragesta
  function lataaOstokset() {
    // Haetaan tallennettu data localStoragesta avaimella "kauppalistaTieto"
    const storedData = localStorage.getItem("kauppalistaTieto");

    // Jos dataa löytyy (eli lista on aiemmin tallennettu)
    if (storedData) {
      // Muutetaan JSON-merkkijono takaisin JavaScript-taulukoksi
      const ostokset = JSON.parse(storedData);

      // Käydään jokainen ostos läpi taulukosta
      ostokset.forEach((item) => {
        // Luodaan uusi listaelementti (li) ostoksen tiedoista
        // item.teksti = ostoksen nimi, item.ostettu = checkboxin tila
        const $rivi = luoListaRivi(item.teksti, item.ostettu);

        // Lisätään luotu rivi ostoslistan <ul>-elementtiin
        $lista.append($rivi);
      });
    }
  }
}); 
