//sem se vloží čísla pinů na kterých jsou semafory, možná rozkazy
let semaforJednaSipka
let semaforJedna
let semaforDvaDoleva
let semaforDvaRovne
let semaforTri
let semaforTriSipka
let semaforCtyriRovne
let semaforCtyriDoleva
let semafor
let prechodLevyDole
let prechodPravyDole
let prechodPravyNahore
let prechodLevyNahore

let start = document.querySelector('.start')
start = addEventListener('click', function() {
    puvodniStav()
    this.setInterval(spustCyklus(), 1000)
})

let pocitadlo = 0
function spustCyklus()  {

    if (pocitadlo == 0) {
        fazePrvni()
        pocitadlo ++
    }
    else if (pocitadlo == 1){
        fazeDruha()
        pocitadlo ++
    }
    else if (pocitadlo == 2) {
        fazeTreti()
        pocitadlo ++
    }
    else if (pocitadlo == 3) {
        fazeCtvrta()
        pocitadlo ++
    }
    else if (pocitadlo == 4) {
        fazePata()
        pocitadlo = 0
    }
}
function puvodniStav() {
    //nastav vsechny semafory na cervenou
}
function fazePrvni() {
    
}
function fazeDruha() {

}
function fazeTreti() {

}
function fazeCtvrta() {

}
function fazePata() {

}