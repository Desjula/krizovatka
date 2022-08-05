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
    SemaforKC(semaforJedna)
    SemaforKC(semaforJednaSipka)
    SemaforKC(semaforDvaDoleva)
    SemaforKC(semaforDvaRovne)
    SemaforKC(semaforTri)
    SemaforKZ(semaforTriSipka) //
    SemaforKZ(semaforCtyriDoleva) //
    SemaforKZ(semaforCtyriRovne) //
    SemaforKC(prechodLevyDole)
    SemaforKC(prechodLevyNahore)
    SemaforKC(prechodPravyDole)
    SemaforKC(prechodPravyNahore)

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