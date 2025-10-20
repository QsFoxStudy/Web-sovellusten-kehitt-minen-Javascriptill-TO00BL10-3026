const lista = document.querySelector("#lista-ostokset");
const kenttä = document.querySelector("#tavara");

document
  .getElementById("ostoslomake")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    lisaaListaan();
  });

document.getElementById("poisto-nappi").addEventListener("click", poistaViimeinen);
document
  .getElementById("tyhjennä-nappi")
  .addEventListener("click", function () {
    lista.innerHTML = "";
  });

function lisaaListaan() {
  const listateksti = kenttä.value.trim();

  if (listateksti === "" || listateksti.length < 3) {
    alert("Vähintään 3 merkkiä pitkä!");
    kenttä.className = "virhe";
    return;
  }

  kenttä.className = "";

  const listarivi = luoListaRivi(listateksti);

  lista.appendChild(listarivi);

  kenttä.value = "";
}

function poistaViimeinen() {
  const listanviimeinen = lista.lastElementChild;

  if (listanviimeinen) {
    listanviimeinen.remove();
  }
}

function luoListaRivi(teksti) {
  const listarivi = document.createElement("li");

  const tekstispan = document.createElement("span");
  tekstispan.textContent = teksti;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  checkbox.addEventListener("change", function () {
    if (tekstispan.className === "ostettu") {
      tekstispan.className = "";
    } else {
      tekstispan.className = "ostettu";
    }
  });

  listarivi.appendChild(tekstispan);
  listarivi.appendChild(checkbox);

  return listarivi;
}
