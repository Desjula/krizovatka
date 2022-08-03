let client = new Paho.MQTT.Client(
    'd57a0d1c39d54550b147b58411d86743.s2.eu.hivemq.cloud',
    8884,
    'letni-skola' + Math.random()
)

function onConnect() {
    console.log("onConnect");
    client.onMessageArrived = onMessageArrived;
    client.subscribe("/crossing/#");
    client.subscribe("/rail-crossing/#");
}

function onMessageArrived(message) {

    console.log(message.destinationName);
    console.log(message.payloadString);
}

client.connect({
    onSuccess: onConnect,
    userName: "robot",
    password: "P@ssW0rd!",
    useSSL: true
});


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
    zmenSemafor("zelena",svetlo);
})

let KCervene = document.querySelector(".KCervene");
KCervene.addEventListener("click", function(){
    zmenSemafor("cervena",svetlo)
})

function zmenSemafor(kCemu,cisloSemaforu) {
    let barvy = [] 
    if (kCemu == "zelena"){
        barvy =  ["#FF0000", "#FFA500", "#00FF00"]
    }else {
        barvy = ["#00FF00", "#FFA500", "#FF0000"]
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
