//sem se vloží čísla pinů na kterých jsou semafory, možná rozkazy
//posunuti rozkazu musi ybt string s dvema cislicemi!!!! napr "03"
//asi bude lepsi to narvat rovnou do jednotlivych prikazu
// let semaforJednaSipka -pin 11
// let semaforJedna - pin 11
// let semaforDvaDoleva - pin 3
// let semaforDvaRovne - pin 3
// let semaforTri - pin 6
// let semaforTriSipka - pin 6
// let semaforCtyriRovne - pin 12
// let semaforCtyriDoleva - pin 12
// let prechodLevy -pin 13
// let prechodPravy - pin 7

let start = document.querySelector('.start')
start = addEventListener('click', function() {
    puvodniStav()
    this.setInterval(spustCyklus(), 4000)
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
    //nastav vsechny semafory na vychozi stav aby to neblblo pri prvni fazo
    SemaforKC(11, 00) // - jednicka
    SemaforKC(11, 04) //-jednicka + (11,03) je odbočovací
    SemaforKC(03, 06) //-dva doleva
    SemaforKC(03, 00) //-dva rovne
    SemaforKC(03, 04) //-dva rovne
    SemaforKC(06, 00) // -tri rovne
    SemaforKZ(06, 04) // -tri rovne + (11,03)
    SemaforKZ(12, 06) // ctyri doleva
    SemaforKZ(12, 04) // ctyri rovne
    SemaforKZ(12, 00) // ctyri rovne
    SemaforKC(07, 00) //prechod
    SemaforKC(13, 00) //prechod

}
function fazePrvni() { // Sviti prechody, 4 a 2 - obe rovne. Zhasnou 4 doleva, 3 sipka
    SemaforKC(semaforCtyriDoleva)
    SemaforKC(semaforTriSipka)

    SemaforKZ(prechodLevyDole)
    SemaforKZ(prechodLevyNahore)
    SemaforKZ(prechodPravyDole)
    SemaforKZ(prechodPravyNahore)
    SemaforKZ(semaforDvaRovne)

}
function fazeDruha() { // Zhasnou prechody, 4 rovne. Rozsviti 2 doleva, 1 sipka
    SemaforKC(prechodLevyDole)
    SemaforKC(prechodLevyNahore)
    SemaforKC(prechodPravyDole)
    SemaforKC(prechodPravyNahore)
    SemaforKC(semaforCtyriRovne)

    SemaforKZ(semaforDvaDoleva)
    SemaforKZ(semaforJednaSipka)

}
function fazeTreti() { //Zhasne cela 2, rozsviti se cela 3
    SemaforKC(semaforDvaDoleva)
    SemaforKC(semaforDvaRovne)

    SemaforKZ(semaforTri)
    SemaforKZ(semaforTriSipka)

}
function fazeCtvrta() { //Zhasne Tri rovne, rozsviti se 1 rovne
    SemaforKC(semaforTri)

    SemaforKZ(semaforJedna)
}
function fazePata() { //Zhasne cela 1, rozsviti se cela 4
    SemaforKC(semaforJedna)
    SemaforKC(semaforJednaSipka)

    SemaforKZ(semaforCtyriDoleva)
    SemaforKZ(semaforCtyriRovne)
}