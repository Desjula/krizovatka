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
let semaforJedna1C = function() {SemaforKC('11', '00')} // - jednicka
let semaforJedna1Z = function() { SemaforKZ('11', '00')} 
let semaforJedna2C = function() { SemaforKC('11', '04')}
let semaforJedna2Z = function() { SemaforKZ('11', '04')} //-jednicka + (11,03) je odbočovací
let semaforDvaDolevaC = function() { SemaforKC('3', '06')} //-dva doleva
let semaforDvaDolevaZ = function() { SemaforKZ('3', '06')}
let semaforDvaRovne1C = function() { SemaforKC('3', '00')} //-dva rovne
let semaforDvaRovne2Z = function() { SemaforKZ('3', '04')}
let semaforDvaRovne1Z = function() { SemaforKZ('3', '00')} //-dva rovne
let semaforDvaRovne2C = function() { SemaforKC('3', '04')} //-dva rovne
let semaforTriRovne1C = function() { SemaforKC('6', '00')} // -tri rovne
let semaforTriRovne2C = function() { SemaforKC('6', '04')} // -tri rovne + (11,03)
let semaforCtyriDolevaC = function() { SemaforKC('12', '06')} // ctyri doleva
let semaforCtyriDole1C = function() { SemaforKC('12', '04')} // ctyri rovne
let semaforCtyriDole2C = function() { SemaforKC('12', '00')} // ctyri rovne
let semaforPrechodNahoreC = function() { SemaforKC('7', '00')} //prechod
let semaforPrechodDoleC = function() { SemaforKC('13', '00')}
let semaforTriRovne1Z = function() { SemaforKZ('6', '00')} // -tri rovne
let semaforTriRovne2Z = function() { SemaforKZ('6', '04')} // -tri rovne + (11,03)
let semaforCtyriDolevaZ = function() { SemaforKZ('12', '06')} // ctyri doleva
let semaforCtyriDole1Z = function() { SemaforKZ('12', '04')} // ctyri rovne
let semaforCtyriDole2Z = function() { SemaforKZ('12', '00')} // ctyri rovne
// let semaforPrechodNahore1Z = function() { SemaforKZ('7', '00')} //prechod
// let semaforPrechodNahore2Z = function() { SemaforKZ('8', '00')}
// let semaforPrechodNahore2C = function() { SemaforKC('8', '00')}
// let semaforPrechodDole1Z = function() { SemaforKZ('13', '00')}
// let semaforPrechodDole1C = function() { SemaforKC('13', '00')}
// let semaforPrechodDole2C = function() { SemaforKC('2', '00')}
// let semaforPrechodDole2Z = function() { SemaforKZ('2', '00')}


let start = document.querySelector('.start')
start = addEventListener('click', function() {
    puvodniStav()
    casovac = setInterval(spustCyklus, 4000)
})

let pocitadlo = 0
function spustCyklus()  {

    if (pocitadlo == 0) {
        fazePrvni()
        nastavFaziCykluNaWebu(1)
        pocitadlo ++
    }
    else if (pocitadlo == 1){
        fazeDruha()
        nastavFaziCykluNaWebu(2)
        pocitadlo ++
    }
    else if (pocitadlo == 2) {
        fazeTreti()
        nastavFaziCykluNaWebu(3)
        pocitadlo ++
    }
    else if (pocitadlo == 3) {
        fazeCtvrta()
        nastavFaziCykluNaWebu(4)
        pocitadlo ++
    }
    else if (pocitadlo == 4) {
        fazePata()
        nastavFaziCykluNaWebu(5)
        pocitadlo = 0
    }
}
function puvodniStav() {
    //nastav vsechny semafory na vychozi stav aby to neblblo pri prvni fazo
    SemaforKC('11', '00') // - jednicka
    SemaforKC('11', '04') //-jednicka + (11,03) je odbočovací
    SemaforKC('3', '06') //-dva doleva
    SemaforKC('3', '00') //-dva rovne
    SemaforKC('3', '03') //-dva rovne
    SemaforKC('6', '00') // -tri rovne
    SemaforKZ('6', '04') // -tri rovne + (11,03)
    SemaforKZ('12', '06') // ctyri doleva
    semaforChodciZelena('13', '00')
    semaforChodciZelena('7', '00')
    semaforChodciZelena('8', '00')
    semaforChodciZelena('2', '00')
    

}
function fazePrvni() { // Sviti prechody, 4 a 2 - obe rovne. Zhasnou 4 doleva, 3 sipka
    SemaforKZ('12', '06')
    semaforChodciZelena('13', '00')
    semaforChodciZelena('7', '00')
    semaforChodciZelena('8', '00')
    semaforChodciZelena('2', '00')
    SemaforKZ('3', '00')
    SemaforKZ('3', '03')

}
function fazeDruha() { // Zhasnou prechody, 4 rovne. Rozsviti 2 doleva, 1 sipka
    semaforChodciCervena('13', '00')
    semaforChodciCervena('7', '00')
    semaforChodciCervena('8', '00')
    semaforChodciCervena('2', '00')
    SemaforKC('12', '00')
    SemaforKC('12', '03')

    SemaforKZ('3', '06')
   

}
function fazeTreti() { //Zhasne cela 2, rozsviti se cela 3
    SemaforKC('3', '06')
    SemaforKC('3', '00')
    SemaforKC('3', '03')

    SemaforKZ('6', '00')
    SemaforKZ('6', '4')

}
function fazeCtvrta() { //Zhasne Tri rovne, rozsviti se 1 rovne
    SemaforKC('6', '00')
    SemaforKC('6', '4')

    SemaforKZ('11', '00')
    SemaforKZ('11', '04')
}
function fazePata() { //Zhasne cela 1, rozsviti se cela 4
    SemaforKC('11', '00')
    SemaforKC('11', '04')

    SemaforKZ('12', '03')
    SemaforKZ('12', '00')
    SemaforKZ('12', '06')
}