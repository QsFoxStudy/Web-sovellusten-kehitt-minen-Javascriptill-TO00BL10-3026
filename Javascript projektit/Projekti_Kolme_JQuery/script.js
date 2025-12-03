// jQueryn "document ready" -funktio korvaa puhtaan JS:n latauskuuntelijan
$(document).ready(function () {
  // Haetaan elementit jQuery-selektoreilla ($ on lyhenne jQuerylle)
  const $lista = $("#lista-ostokset");
  const $kentta = $("#tavara");

  // Ladataan ostokset localStoragesta sivun latautuessa
  lataaOstokset();

  // Kuunnellaan lomakkeen lähettämistä (Lisää-nappi)
  // Estetään oletustoiminto (event.preventDefault()) automaattisesti
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
    // Luodaan uusi listaelementti ja sen sisältö lennossa
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

  // Funktiot localStoragen käyttöön (tämä antaa "ajax-tyyppisen" pysyvyyden ilman backendiä)

  function tallennaOstokset() {
    const ostokset = [];
    // Käytetään jQueryn .each() iteroimaan läpi kaikki listan rivit
    $lista.find("li").each(function () {
      const teksti = $(this).find("span").text();
      const ostettu = $(this).find("input[type='checkbox']").is(":checked"); // Onko valittu?
      ostokset.push({ teksti: teksti, ostettu: ostettu });
    });
    // Muutetaan objekti merkkijonoksi ja tallennetaan
    localStorage.setItem("kauppalistaData", JSON.stringify(ostokset));
  }

  function lataaOstokset() {
    const storedData = localStorage.getItem("kauppalistaData");
    if (storedData) {
      const ostokset = JSON.parse(storedData);
      ostokset.forEach((item) => {
        const $rivi = luoListaRivi(item.teksti, item.ostettu);
        $lista.append($rivi);
      });
    }
  }
}); // Sulkee document.ready
