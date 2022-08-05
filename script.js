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

//prebarveni semaforu na webovkach

let zeleneSemafory = document.querySelectorAll(".zeleny-semafor")

// function nastavCyklus1NaWebu() {
//     for (let i = 0; i < zeleneSemafory.length; i++) {
//         if (i !== 2 && i != 5) {
//             zeleneSemafory[i].style.display = "none"
//         }
//         else {
//             zeleneSemafory[i].style.display = "block"
//         }
//     }
// }

function nastavFaziCykluNaWebu(cisloFazeCyklu) {
    let semafor1
    let semafor2
    let semafor3

    if (cisloFazeCyklu === 1) {
        semafor1 = 2
        semafor2 = 5
        semafor3 = zeleneSemafory.length
    }
    else if (cisloFazeCyklu === 2) {
        semafor1 = 1
        semafor2 = 2
        semafor3 = 6
    }
    else if (cisloFazeCyklu === 3) {
        semafor1 = 3
        semafor2 = 6
        semafor3 = zeleneSemafory.length
    }
    else if (cisloFazeCyklu === 4) {
        semafor1 = 0
        semafor2 = 7
        semafor3 = zeleneSemafory.length
    }
    else if (cisloFazeCyklu === 5) {
        semafor1 = 4
        semafor2 = 5
        semafor3 = 7
    }

    for (let i = 0; i < zeleneSemafory.length; i++) {
        if (i != semafor1 && i!= semafor2 && i != semafor3) {
            zeleneSemafory[i].style.display = "none"
        }
        else {
            zeleneSemafory[i].style.display = "block"
        }
    }

    if (cisloFazeCyklu === 1) {
        zeleneSemafory[8].style.display = "block"
        zeleneSemafory[9].style.display = "block"
    }
}

function nastavVlakNaWebu() {
    let semaforVlak1 = document.querySelector("#z7")
    let semaforVlak2 = document.querySelector("#z8")
    semaforVlak1.style.display = "none",
    semaforVlak2.style.display = "none"
}

function nastavKonecVlakuNaWebu() {
    let semaforVlak1 = document.querySelector("#z7")
    let semaforVlak2 = document.querySelector("#z8")
    semaforVlak1.style.display = "block",
    semaforVlak2.style.display = "block"
}

nastavFaziCykluNaWebu(3)

function semaforLevaOn(){
    message = new Paho.MQTT.Message("on");
    message.destinationName = "/rail-crossing/led/13";
    client.send(message);
    message = new Paho.MQTT.Message("beep");
    message.destinationName = "/rail-crossing/sirene";
    client.send(message);
}
function semaforPravaOn(){
    message = new Paho.MQTT.Message("on");
    message.destinationName = "/rail-crossing/led/12";
    client.send(message);
}
function semaforLevaOff(){
    message = new Paho.MQTT.Message("off");
    message.destinationName = "/rail-crossing/led/13";
    client.send(message);
    message = new Paho.MQTT.Message("beep");
    message.destinationName = "/rail-crossing/sirene";
    client.send(message);
}
function semaforPravaOff(){
    message = new Paho.MQTT.Message("off");
    message.destinationName = "/rail-crossing/led/12";
    client.send(message);
}

let intervalBlikani
let stavSemaforu = false;

function semaforBlika(){
    console.log("Vlak jede")
    if (stavSemaforu == false) {
        semaforLevaOn();
        semaforPravaOff();
        stavSemaforu = true;
    }else {
        semaforLevaOff();
        semaforPravaOn();
        stavSemaforu = false;
    }
}

const zacniIntervalBlikani = () => {
    intervalBlikani = setInterval(semaforBlika, 500);
}

const zastavIntervalBlikani = () => {
    clearInterval(intervalBlikani)
}

let tlacitkoBlikaniStart = document.querySelector("#jede-vlak")
tlacitkoBlikaniStart.addEventListener("click", zacniIntervalBlikani)
tlacitkoBlikaniStart.addEventListener("click", nastavVlakNaWebu)
let tlacitkoBlikaniStop = document.querySelector("#nejede-vlak")
tlacitkoBlikaniStop.addEventListener("click", zastavIntervalBlikani)




////////
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

function semaforAutaCervena (delkaCervene) {
    message = new Paho.MQTT.Message("R00");
    message.destinationName = "/crossing/semaphore/13";
    client.send(message);
}

function semaforAutaOranzovoCervena () {
    message = new Paho.MQTT.Message("P00");
    message.destinationName = "/crossing/semaphore/13";
    client.send(message);
}

function semaforAutaOranzova () {
    message = new Paho.MQTT.Message("O00");
    message.destinationName = "/crossing/semaphore/13";
    client.send(message);
}

function semaforAutaZelena () {
    message = new Paho.MQTT.Message("G00");
    message.destinationName = "/crossing/semaphore/13";
    client.send(message);
}

////// funkce pro změnu světel

let stavSemaforuAutaKZ = 0;

let funkceProSemaforKZ = [
    semaforAutaCervena,
    semaforAutaOranzovoCervena,
    semaforAutaZelena
]

function ZmenaBarvySemaforuKZ(cisloSemaforu){
    funkceProSemaforKZ[stavSemaforuAutaKZ]();

    stavSemaforuAutaKZ++;

    if (stavSemaforuAutaKZ >= funkceProSemaforKZ.length){
        stavSemaforuAutaKZ = 0;
    }
}

let SemaforKZ = document.querySelector(".SemaforKZ");
SemaforKZ.addEventListener("click", function(){
    ZmenaBarvySemaforuKZ();
    myTimeoutKZelene = setTimeout(ZmenaBarvySemaforuKZ, 2000);
    myTimeoutKZelene = setTimeout(ZmenaBarvySemaforuKZ, 4000);
})

let stavSemaforuAutaKC = 0;

let funkceProSemaforKC = [
    semaforAutaZelena,
    semaforAutaOranzova,
    semaforAutaCervena
]

function ZmenaBarvySemaforuKC(cisloSemaforu){
    funkceProSemaforKC[stavSemaforuAutaKC]();

    stavSemaforuAutaKC++;

    if (stavSemaforuAutaKC >= funkceProSemaforKC.length){
        stavSemaforuAutaKC = 0;
    }
}

let SemaforKC = document.querySelector(".SemaforKC");
SemaforKC.addEventListener("click", function(){
    ZmenaBarvySemaforuKC() ;
    myTimeoutKCervene = setTimeout(ZmenaBarvySemaforuKC, 2000);
    myTimeoutKCervene = setTimeout(ZmenaBarvySemaforuKC, 4000);
})
