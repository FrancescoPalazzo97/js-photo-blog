const api = `https://lanciweb.github.io/demo/api/pictures/` // Definisco una variabile che mi contiente l'endpoint dell'api

const createCard = obj => { // Definisco una funzione a cui passo un oggetto
    let { title, date, url } = obj; // Destrutturazione
    let string = `<div class="photo-card p-relative">
                            <img src="./img/pin.svg" alt="" class="red-dot p-absolute">
                            <div class="photo-img">
                                <img src="${url}" alt="" class="img-fluid">
                            </div>
                            <div class="card-text">
                                <span>${date}</span>
                                <h3>${title}</h3>
                            </div>
                        </div>`;

    return string; // Ritorno la stringa appena generata
}

const displayCards = array => { // Funzione a cui passo l'array
    let photoCards = ``;

    for (let i = 0; i < array.length; i++) { // Ciclo l'array
        let photoCard = createCard(array[i]); // Richiamo la funzione createCard e assegno la stringa generata alla variabile photoCard creata per comodità
        photoCards += photoCard; // Inserisco tutte le stringhe in photoCards
    }

    return photoCards; // Ritorno la stringa completa
}

const focusCard = (arr) => {

    arr.forEach(item => {

        item.addEventListener(`click`, () => {
            let img = item.querySelector(`.photo-img>img`);
            let overlayImg = overlay.querySelector(`img`);
            overlay.classList.remove(`d-none`);
            overlayImg.src = img.src;
            console.log(overlay);
        })

    });
}

const closeFocus = () => {

    closeBtn.addEventListener(`click`, () => {
        overlay.classList.add(`d-none`);
    })

}

let photoSection = document.getElementById(`photo-section`); // Prendo l'elemento dalla pagina HTML
let overlay = document.getElementById(`overlay`);
let closeBtn = document.getElementById(`close`);

axios.get(api).then(resp => { // Effettuo la chiamata AJAX
    photoSection.innerHTML = displayCards(resp.data); // Passo l'array ricevuto dalla chiamata alla funzione displayCards e inserisco il tutto nella photo-section
    let cards = document.querySelectorAll(`.photo-card`);

    focusCard(cards);

    closeFocus();
})