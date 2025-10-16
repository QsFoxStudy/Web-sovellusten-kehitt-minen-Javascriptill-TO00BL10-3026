// Harjoitus 1 ja 3: Yhteystietolomake
document.querySelector("form").onsubmit = function(e) {
    e.preventDefault();
    const name = document.querySelector("input[name='name']");
    const email = document.querySelector("input[name='email']");
    const comment = document.querySelector("textarea[name='comment']");

    let valid = true;
    document.getElementById("name").textContent = "";
    document.getElementById("email").textContent = "";
    document.getElementById("comment").textContent = "";

    if (name.value.trim() === "") {
        valid = false;
        name.style.border = "2px solid red";
        document.getElementById("name").textContent = "Nimi ei saa olla tyhjä.";
    } else {
        name.style.border = "";
    }

    if (email.value.length < 6 || email.value.length > 15 || !email.value.includes("@")) {
        valid = false;
        email.style.border = "2px solid red";
        document.getElementById("email").textContent = "Sähköpostin pitää olla 6–15 merkkiä ja sisältää @.";
    } else {
        email.style.border = "";
    }

    if (comment.value.trim() === "" || comment.value.length > 150) {
        valid = false;
        comment.style.border = "2px solid red";
        document.getElementById("comment").textContent = "Kommentti ei saa olla tyhjä ja max 150 merkkiä.";
    } else {
        comment.style.border = "";
    }

    if (valid) {
        localStorage.setItem("name", name.value);
        localStorage.setItem("email", email.value);
        localStorage.setItem("comment", comment.value);
        alert("Tiedot tallennettu localStorageen!");
    }
};

// Harjoitus 2: Jäsenyyslaskuri
document.getElementById("theForm").onsubmit = function(e) {
    e.preventDefault();
    const type = parseFloat(document.getElementById("type").value);
    const years = parseInt(document.getElementById("years").value);
    let cost = type * years;
    let discountMessage = "";

    if (years > 2) {
        cost *= 0.8;
        discountMessage = "Saat 20 % alennuksen!";
    }

    if (years >= 5) {
        cost -= 5;
        discountMessage += " + 5 € yllätysalennus!";
    }

    document.getElementById("cost").value = cost.toFixed(2) + " €";
    if (discountMessage) alert(discountMessage);
};

// Harjoitus 4: Datan lataaminen localStoragesta
function loadSessionData() {
    const name = localStorage.getItem("name") || "Ei nimeä";
    const email = localStorage.getItem("email") || "Ei sähköpostia";
    const comment = localStorage.getItem("comment") || "Ei kommenttia";

    document.getElementById("sessiondata").innerHTML = `
        <strong>Nimi:</strong> ${name}<br>
        <strong>Sähköposti:</strong> ${email}<br>
        <strong>Kommentti:</strong> ${comment}
    `;
}

window.onload = loadSessionData;
