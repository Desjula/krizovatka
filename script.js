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
//jako argument: "id"

const nastavZelenySemaforNaWebu = (zelenySemaforId) => {
    let semaforNaPrebarveni = document.getElementById(zelenySemaforId)
    semaforNaPrebarveni.style.display = "block"
}

const nastavCervenySemaforNaWebu = (zelenySemaforId) => {
    let semaforNaPrebarveni = document.getElementById(zelenySemaforId)
    semaforNaPrebarveni.style.display = "none"
}

const zobrazCyklus1NaWebu = () => {
    nastavZelenySemaforNaWebu("z3")
    nastavZelenySemaforNaWebu("z6") 
    let semaforyNaPrebarveni = ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8", "z1-1", "z4-1", "chodci-z1", "chodci-z2"]
    for (let i = 0; i < semaforyNaPrebarveni; i++) {
        nastavCervenySemaforNaWebu(semaforyNaPrebarveni[i])
    }
}


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

function semaforAutaCervena () {
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

let oranzovoCervenaAuta = document.querySelector(".oranzovoCervenaAuta");
oranzovoCervenaAuta.addEventListener("click", function(){
    semaforAutaOranzovoCervena();
})

let oranzovaAuta = document.querySelector(".oranzovaAuta");
oranzovaAuta.addEventListener("click", function(){
    semaforAutaOranzova();
})

let cervenaAuta = document.querySelector(".cervenaAuta");
cervenaAuta.addEventListener("click", function(){
    semaforAutaCervena();
})


// let cislaSvetelSemaforu = [
//     semaforJednaSipka,
//     semaforJednaG,
//     semaforJednaO,
//     semaforJednaR,
//     semaforDvaRovneG,
//     semaforDvaRovneO,
//     semaforDvaRovneR,
//     semaforDvaDolevaG,
//     semaforDvaDolevaO,
//     semaforDvaDolevaR,
//     semaforTriSipka,
//     semaforTriG,
//     semaforTriO,
//     semaforTriR,
//     semaforCtyriRovneG,
//     semaforCtyriRovneO,
//     semaforCtyriRovneR,
//     semaforCtyriDolevaG,
//     semaforCtyriDolevaO,
//     semaforCtyriDolevaR,
//     prechodLevyNahoreG,
//     prechodLevyDoleG,
//     prechodLevyNahoreR,
//     prechodLevyDoleR,
//     prechodPravyNahoreG,
//     prechodPravyDoleG,
//     prechodPravyNahoreR,
//     prechodPravyDoleR,
//     zavoryLeva,
//     zavoryPrava
// ]

let stavSemaforuAuta = 0;

let funkceProCyklusSemaforu = [
    semaforAutaCervena,
    semaforAutaOranzovoCervena,
    semaforAutaZelena,
    semaforAutaOranzova,
    semaforAutaCervena
]

function cyklusZmenyBarvySemaforu(){
    funkceProCyklusSemaforu[stavSemaforuAuta]();

    stavSemaforuAuta++;

    if (stavSemaforuAuta >= funkceProCyklusSemaforu.length){
        stavSemaforuAuta = 0;
    }
}

let cyklusSemaforu = document.querySelector(".cyklusSemaforu");
cyklusSemaforu.addEventListener("click", function(){
    myInterval = setInterval(cyklusZmenyBarvySemaforu, 2000);
})



















