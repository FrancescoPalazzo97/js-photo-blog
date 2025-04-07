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

const focusCard = (arr) => { // Funzione che mi apre l'immagine in overlay

    arr.forEach(item => { // Ciclo la nodelist

        item.addEventListener(`click`, () => { // Aggiungo l'evento all'elemento cliccato
            let img = item.querySelector(`.photo-img>img`); // Recupero il tag img dal elemento passato (cards)
            let overlayImg = overlay.querySelector(`img`); // Recupero il tag img da overlay
            overlay.classList.remove(`d-none`); // Tolgo la classe d-none da overlay
            overlayImg.src = img.src; // Passo il link dell'immagine
        })

    });
}

const closeFocus = () => {

    closeBtn.addEventListener(`click`, () => { // Aggiungo evento click al button close
        overlay.classList.add(`d-none`); // Vado ad aggiungere nuovamente la classe d-none
    })

}

// Prendo gli elementi necessari dalla pagina HTML
let photoSection = document.getElementById(`photo-section`);
let overlay = document.getElementById(`overlay`);
let closeBtn = document.getElementById(`close`);

axios.get(api).then(resp => { // Effettuo la chiamata AJAX
    photoSection.innerHTML = displayCards(resp.data); // Passo l'array ricevuto dalla chiamata alla funzione displayCards e inserisco il tutto nella photo-section
    let cards = document.querySelectorAll(`.photo-card`); // Mi recupero l'elemento con classe photo-card aggiunto prima

    focusCard(cards); // richiamo la funzione a cui passo cards

    closeFocus(); // Funzione per chiudere l'overlay
})