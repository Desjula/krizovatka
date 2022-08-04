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

//////////////

let svetlo = document.querySelector(".svetlo");
let pocetTiku = 0
let semafor
let kZelene
let kCervene



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

//funkce pro rozsvecení ledek

function semaforChodciZelena () {
    message = new Paho.MQTT.Message("W00");
    message.destinationName = "/crossing/semaphore/13";
    client.send(message);
}

function semaforChodciCervena () {
    message = new Paho.MQTT.Message("D00");
    message.destinationName = "/crossing/semaphore/13";
    client.send(message);
}

function semaforAutaCervena () {
    message = new Paho.MQTT.Message("R00");
    message.destinationName = "/crossing/semaphore/13";
    client.send(message);
}

function semaforAutaOranzova () {
    message = new Paho.MQTT.Message("P00");
    message.destinationName = "/crossing/semaphore/13";
    client.send(message);
}

function semaforAutaZelena () {
    message = new Paho.MQTT.Message("G00");
    message.destinationName = "/crossing/semaphore/13";
    client.send(message);
}

//připojení funkcí k tlačítkům

let zelenaChodci = document.querySelector(".zelenaChodci");
zelenaChodci.addEventListener("click", function(){
    semaforChodciZelena();
})

let cervenaChodci = document.querySelector(".cervenaChodci");
cervenaChodci.addEventListener("click", function(){
    semaforChodciCervena();
})

let zelenaAuta = document.querySelector(".zelenaAuta");
zelenaAuta.addEventListener("click", function(){
    semaforAutaZelena();
})

let oranzovaAuta = document.querySelector(".oranzovaAuta");
oranzovaAuta.addEventListener("click", function(){
    semaforAutaOranzova();
})

let cervenaAuta = document.querySelector(".cervenaAuta");
cervenaAuta.addEventListener("click", function(){
    semaforAutaCervena();
})

// pole s příkazy pro svícení

//let semaforChodci = [D00, W00]
//udělat cykly semaforů pomocí pole a cyklů


//let semaforAuta = [R00, P00, G00]  //O00?

//prebarveni semaforu na webovkach

const nastavZelenySemaforNaWebu = (zelenySemaforId) => {
    let semaforNaPrebarveni = document.getElementById(zelenySemaforId)
    semaforNaPrebarveni.style.display = "block"
}

const nastavCervenySemaforNaWebu = (zelenySemaforId) => {
    let semaforNaPrebarveni = document.getElementById(zelenySemaforId)
    semaforNaPrebarveni.style.display = "none"
}
