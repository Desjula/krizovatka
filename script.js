// let client = new Paho.MQTT.Client(
//     'd57a0d1c39d54550b147b58411d86743.s2.eu.hivemq.cloud',
//     8884,
//     'letni-skola' + Math.random()
// )

let svetlo = document.querySelector(".svetlo");
let pocetTiku = 0
let semafor
let kZelene
let kCervene

let stop = document.querySelector(".stop");
stop.addEventListener("click", function(){
    clearInterval(semafor);
})


let KZelene = document.querySelector(".KZelene");
KZelene.addEventListener("click", function(){
    zmenSemafor("zelena",svetlo)
})

let KCervene = document.querySelector(".KCervene");
KCervene.addEventListener("click", function(){
    zmenSemafor("cervena",svetlo)
})

function zmenSemafor(kCemu,cisloSemaforu) {
    let barvy = [] 
    if (kCemu == "zelena"){
        barvy =  ["red", "orange", "green"]
    }else {
        barvy = ["green", "orange", "red"]
    }
    semafor = setInterval(function(){
        urcitSemafor(cisloSemaforu)
    if (pocetTiku == barvy.length){
        clearInterval(semafor)
        pocetTiku = 0 
    }
    },1000)
    function urcitSemafor(cisloSemaforu){
        cisloSemaforu.style.backgroundColor = barvy[pocetTiku]
        pocetTiku += 1
    }

}
