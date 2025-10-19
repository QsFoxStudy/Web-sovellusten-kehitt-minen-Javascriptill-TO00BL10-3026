const lista = document.querySelector("#lista-ostokset");
const kenttä = document.querySelector("#tavara");


document.getElementById("nappi").addEventListener("click", lisaalistaan);
document.getElementById("poisto-nappi").addEventListener("click", listapoisto);

document.getElementById("tyhjennä-nappi").addEventListener("click", function() {
  lista.innerHTML = '';
});


function lisaalistaan() {

  const listateksti = kenttä.value.trim();

  if (listateksti === '' || listateksti.length < 3) {
        alert('Vähintään 3 merkkiä pitkä!');
        kenttä.classList.add('virhe');
        return;
  }

  kenttä.classList.remove('virhe');

  const listarivi = luodaanlistarivi(listateksti);

  lista.appendChild(listarivi);

  kenttä.value = '' ;
}

function listapoisto() {

    const listanviimeinen = lista.lastElementChild;

    if (listanviimeinen) {

        listanviimeinen.remove();
    }

}

function luodaanlistarivi(teksti) {
    const listarivi = document.createElement("li");

    listarivi.innerHTML = `${teksti} <input type="checkbox">`;
    
    const checkbox = listarivi.querySelector('input');

    checkbox.addEventListener('change', function() {
        this.parentNode.classList.toggle('ostettu');
    });
    
    return listarivi;
}


