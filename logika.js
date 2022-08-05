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
let semaforJedna1C = SemaforKC('11', '00') // - jednicka
let semaforJedna1Z = SemaforKZ('11', '00') 
let semaforJedna2C = SemaforKC('11', '04')
let semaforJedna2Z = SemaforKZ('11', '04') //-jednicka + (11,03) je odbočovací
let semaforDvaDolevaC = SemaforKC('03', '06') //-dva doleva
let semaforDvaDolevaZ = SemaforKZ('03', '06')
let semaforDvaRovne1C = SemaforKC('03', '00') //-dva rovne
let semaforDvaRovne2C = SemaforKC('03', '04')
let semaforDvaRovne1Z = SemaforKZ('03', '00') //-dva rovne
let semaforDvaRovne2C = SemaforKC('03', '04') //-dva rovne
let semaforTriRovne1C = SemaforKC('06', '00') // -tri rovne
let semaforTriRovne2C = SemaforKC('06', '04') // -tri rovne + (11,03)
let semaforCtyriDolevaC = SemaforKC('12', '06') // ctyri doleva
let semaforCtyriDole1C = SemaforKC('12', '04') // ctyri rovne
let semaforCtyriDole2C = SemaforKC('12', '00') // ctyri rovne
let semaforPrechodNahoreC = SemaforKC('07', '00') //prechod
let semaforPrechodDoleC = SemaforKC('13', '00')
let semaforDvaRovne2Z = SemaforKZ('03', '04') //-dva rovne
let semaforTriRovne1Z = SemaforKZ('06', '00') // -tri rovne
let semaforTriRovne2Z = SemaforKZ('06', '04') // -tri rovne + (11,03)
let semaforCtyriDolevaZ = SemaforKZ('12', '06') // ctyri doleva
let semaforCtyriDole1Z = SemaforKZ('12', '04') // ctyri rovne
let semaforCtyriDole2Z = SemaforKZ('12', '00') // ctyri rovne
let semaforPrechodNahoreZ = SemaforKZ('07', '00') //prechod
let semaforPrechodDoleZ = SemaforKZ('13', '00')


let start = document.querySelector('.start')
start = addEventListener('click', function() {
    puvodniStav()
    //this.setInterval(spustCyklus(), 4000)
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
    SemaforKC('11', '00') // - jednicka
    SemaforKC('11', '04') //-jednicka + (11,03) je odbočovací
    SemaforKC('03', '06') //-dva doleva
    SemaforKC('03', '00') //-dva rovne
    SemaforKC('03', '04') //-dva rovne
    SemaforKC('06', '00') // -tri rovne
    SemaforKZ('06', '04') // -tri rovne + (11,03)
    SemaforKZ('12', '06') // ctyri doleva
    SemaforKZ('12', '04') // ctyri rovne
    SemaforKZ('12', '00') // ctyri rovne
    SemaforKZ('07', '00') //prechod
    SemaforKZ('13', '00') //prechod

}
function fazePrvni() { // Sviti prechody, 4 a 2 - obe rovne. Zhasnou 4 doleva, 3 sipka
    semaforCtyriDoleva
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