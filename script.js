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
    if (message.destinationName == "/rail-crossing/motion-detection/A0"){
        console.log("vlak jede")
        vlak();
    }
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

// funkce pro zobrazeni Fáze cyklu na webu
// parametr = fáze cyklu (1-5)
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
            zeleneSemafory[i].style.opacity = 0
        }
        else {
            zeleneSemafory[i].style.opacity = 1
        }
    }

    if (cisloFazeCyklu === 1) {
        zeleneSemafory[8].style.opacity = 1
        zeleneSemafory[9].style.opacity = 1
    }
}

function nastavVlakNaWebu() {
    let semaforVlak1 = document.querySelector("#z7")
    let semaforVlak2 = document.querySelector("#z8")
    semaforVlak1.style.opacity = 0
    semaforVlak2.style.opacity = 0
}

function nastavKonecVlakuNaWebu() {
    let semaforVlak1 = document.querySelector("#z7")
    let semaforVlak2 = document.querySelector("#z8")
    semaforVlak1.style.opacity = 1
    semaforVlak2.style.opacity = 1
}

/////
///vlak, závory a blikání

//jedničky
//závory
function zavoryNahoru1(){
    message = new Paho.MQTT.Message("open");
    message.destinationName = "/rail-crossing/barrier/9";
    client.send(message);
}

function zavoryDolu1(){
    message = new Paho.MQTT.Message("close");
    message.destinationName = "/rail-crossing/barrier/9";
    client.send(message);
}

//pípání a blikání

function obeSvetlaOff1(){
    semaforPravaOff1();
    semaforLevaOff1();
}

function semaforLevaOn1(){
    message = new Paho.MQTT.Message("on");
    message.destinationName = "/rail-crossing/led/13";
    client.send(message);
    message = new Paho.MQTT.Message("beep");
    message.destinationName = "/rail-crossing/sirene";
    client.send(message);
}

function semaforLevaOff1(){
    message = new Paho.MQTT.Message("off");
    message.destinationName = "/rail-crossing/led/13";
    client.send(message);
    message = new Paho.MQTT.Message("beep");
    message.destinationName = "/rail-crossing/sirene";
    client.send(message);
}

function semaforPravaOn1(){
    message = new Paho.MQTT.Message("on");
    message.destinationName = "/rail-crossing/led/12";
    client.send(message);
}

function semaforPravaOff1(){
    message = new Paho.MQTT.Message("off");
    message.destinationName = "/rail-crossing/led/12";
    client.send(message);
}

let intervalBlikani1
let stavSemaforu1 = false;

function semaforBlika1(){
    if (stavSemaforu1 == false) {
        semaforLevaOn1();
        semaforPravaOff1();
        stavSemaforu1 = true;
    }else {
        semaforLevaOff1();
        semaforPravaOn1();
        stavSemaforu1 = false;
    }
}

const zacniIntervalBlikani1 = () => {
    intervalBlikani1 = setInterval(semaforBlika1, 500);
}

const zastavIntervalBlikani1 = () => {
    clearInterval(intervalBlikani1)
}


////////////////////dvojky
//závory dvojky
function zavoryNahoru2(){
    message = new Paho.MQTT.Message("open");
    message.destinationName = "/rail-crossing/barrier/10";
    client.send(message);
}

function zavoryDolu2(){
    message = new Paho.MQTT.Message("close");
    message.destinationName = "/rail-crossing/barrier/10";
    client.send(message);
}

//blikání dvojky
function obeSvetlaOff2(){
    semaforPravaOff2();
    semaforLevaOff2();
}

function semaforLevaOn2(){
    message = new Paho.MQTT.Message("on");
    message.destinationName = "/rail-crossing/led/8";
    client.send(message);
}

function semaforLevaOff2(){
    message = new Paho.MQTT.Message("off");
    message.destinationName = "/rail-crossing/led/8";
    client.send(message);
}

function semaforPravaOn2(){
    message = new Paho.MQTT.Message("on");
    message.destinationName = "/rail-crossing/led/7";
    client.send(message);
}

function semaforPravaOff2(){
    message = new Paho.MQTT.Message("off");
    message.destinationName = "/rail-crossing/led/7";
    client.send(message);
}

let intervalBlikani2
let stavSemaforu2 = false;

function semaforBlika2(){
    if (stavSemaforu2 == false) {1
        semaforLevaOn2();
        semaforPravaOff2();
        stavSemaforu2 = true;
    }else {
        semaforLevaOff2();
        semaforPravaOn2();
        stavSemaforu2 = false;
    }
}

const zacniIntervalBlikani2 = () => {
    intervalBlikani2 = setInterval(semaforBlika2, 500);
}

const zastavIntervalBlikani2 = () => {
    clearInterval(intervalBlikani2)
}


////funkce jede vlak

function vlak (){
    zacniIntervalBlikani1();
    nastavVlakNaWebu();
    setTimeout( function(){zavoryDolu1()}, 2000);
    setTimeout( function(){
        zastavIntervalBlikani1();
        nastavKonecVlakuNaWebu();
        setTimeout( function(){zavoryNahoru1()}, 2000);
        obeSvetlaOff1()
    }, 10000)

    zacniIntervalBlikani2();
    setTimeout( function(){zavoryDolu2()}, 2000);
    setTimeout( function(){
        zastavIntervalBlikani2();
        setTimeout( function(){zavoryNahoru2()}, 2000);
        obeSvetlaOff2()
    }, 10000)
}

//tlačítko jede vlak
let jedeVlak = document.querySelector(".vlak")
jedeVlak.addEventListener("click", function(){
    vlak();
})

////////
//funkce pro rozsvecení ledek

function semaforChodciZelena (cisloPinu) {
    message = new Paho.MQTT.Message("W" +  + posunutiRozkazu);
    message.destinationName = "/crossing/semaphore/"+ cisloPinu;
    client.send(message);
}

function semaforChodciCervena (cisloPinu) {
    message = new Paho.MQTT.Message("D" +  + posunutiRozkazu);
    message.destinationName = "/crossing/semaphore/"+ cisloPinu;
    client.send(message);
}

function semaforAutaCervena (cisloPinu, posunutiRozkazu) {
    message = new Paho.MQTT.Message("R" +  + posunutiRozkazu);
    message.destinationName = "/crossing/semaphore/"+ cisloPinu;
    client.send(message);
}

function semaforAutaOranzovoCervena (cisloPinu, posunutiRozkazu) {
    message = new Paho.MQTT.Message("P" +  + posunutiRozkazu);
    message.destinationName = "/crossing/semaphore/"+ cisloPinu;
    client.send(message);
}

function semaforAutaOranzova (cisloPinu, posunutiRozkazu) {
    message = new Paho.MQTT.Message("O"  + posunutiRozkazu);
    message.destinationName = "/crossing/semaphore/"+ cisloPinu;
    client.send(message);
}

function semaforAutaZelena (cisloPinu, posunutiRozkazu) {
    message = new Paho.MQTT.Message("G" + posunutiRozkazu);
    message.destinationName = "/crossing/semaphore/" + cisloPinu; //nevím jestli toto bude fungovatS
    client.send(message);
}


////// funkce pro změnu světel
// K zelene jsou tam narvaný parametry, jen nevím jestli to bude fungovat

//zelená
let stavSemaforuAutaKZ = 0;

let funkceProSemaforKZ = [
    semaforAutaCervena,
    semaforAutaOranzovoCervena,
    semaforAutaZelena
]

function ZmenaBarvySemaforuKZ(cisloPinu, posunutiRozkazu){ //proleze pole nad tim a nastavi barvu k zelene
    let zavolaniFunkceNadTim = funkceProSemaforKZ[stavSemaforuAutaKZ];
    zavolaniFunkceNadTim(cisloPinu, posunutiRozkazu);



    stavSemaforuAutaKZ++;

    if (stavSemaforuAutaKZ >= funkceProSemaforKZ.length){
        stavSemaforuAutaKZ = 0;
    }
}

function SemaforKZ() {
    ZmenaBarvySemaforuKZ(cisloPinu, posunutiRozkazu);
    myTimeoutKZelene = setTimeout(ZmenaBarvySemaforuKZ, 2000);
    myTimeoutKZelene = setTimeout(ZmenaBarvySemaforuKZ, 4000);
}

//červená
let stavSemaforuAutaKC = 0;

let funkceProSemaforKC = [
    semaforAutaZelena,
    semaforAutaOranzova,
    semaforAutaCervena
]

function ZmenaBarvySemaforuKC(cisloPinu, posunutiRozkazu){ //proleze pole nad tim a nastavi barvu k cervene
    let vyvolavaniPoleNadTim = funkceProSemaforKC[stavSemaforuAutaKC];
    vyvolavaniPoleNadTim(cisloPinu, posunutiRozkazu);

    stavSemaforuAutaKC++;

    if (stavSemaforuAutaKC >= funkceProSemaforKC.length){
        stavSemaforuAutaKC = 0;
    }
}
function SemaforKC(){
    ZmenaBarvySemaforuKC() ;
    myTimeoutKCervene = setTimeout(ZmenaBarvySemaforuKC, 2000);
    myTimeoutKCervene = setTimeout(ZmenaBarvySemaforuKC, 4000);
}
