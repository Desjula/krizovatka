let client = new Paho.MQTT.Client(
    'd57a0d1c39d54550b147b58411d86743.s2.eu.hivemq.cloud',
    8884,
    'letni-skola' + Math.random()
)

let svetlo = document.querySelector(".svetlo");

let barvy = ["red", "orange", "green"]
let pocetTiku = 0
let semaforAuta

let stop = document.querySelector(".stop");
stop.addEventListener("click", function(){
    clearInterval(semaforAuta);
})


let start = document.querySelector(".start");
start.addEventListener("click", function(){
    semaforAuta = setInterval(function(){
    svetlo.style.backgroundColor = barvy[pocetTiku]

if (pocetTiku > barvy.length){
    pocetTiku = 0}
},2000);
})