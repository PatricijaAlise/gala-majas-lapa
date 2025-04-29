const myCanvas = document.getElementById("myCanvas");
const ctx = myCanvas.getContext("2d"); 

var girl_x = 0;
var girl_y = 0;
var girlImg = new Image();
girlImg.src = "https://s2js.com/PatricijaAlise/Girl.png";

var camera_x = 0;
var camera_y = 0;
var cameraImg = new Image();
cameraImg.src = "https://s2js.com/PatricijaAlise/camera.png";

const girlWidth = 250;
const girlHeight = 250;
const cameraWidth = 100;
const cameraHeight = 100;

var score = 0;
var camera_speed = 5;
var FPS = 40;
var time_remaining = 60;
    //Funkcija, kura sāk spēli no sākuma, ja tiek uzspiests "S"  

function restart_game() {
    time_remaining = 60;
    score = 0;
    camera_speed = 5;
}
 //Funkcija, kura pamana, ja attēli saskaras
 function ImagesTouching(x1, y1, img1w, img1h, x2, y2, img2w, img2h) {
    if (x1 + img1w <= x2 || x1 >= x2 + img2w) return false;
    if (y1 + img1h <= y2 || y1 >= y2 + img2h) return false;
    return true;
}

function Do_a_Frame() {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height); //Notīra fonu

    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText("Rezultāts: " + score, 10, 60);//Parāda rezultātu

    girl_y = myCanvas.height - girlHeight; //Nodrošina, ka meitene ir fona apakšā
    ctx.drawImage(girlImg, girl_x, girl_y, girlWidth, girlHeight); //Uzzīmē meiteni

    ctx.fillText("Atlikušais laiks: " + Math.round(time_remaining), 10, 85); //Parāda atlikušo laiku

    if (time_remaining <= 0) {//Ja laiks ir beidzies
        ctx.fillStyle = "red";
        ctx.font = "bold 50px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Beigas", myCanvas.width / 2, myCanvas.height / 2); //Parāda tekstu
        ctx.textAlign = "left";
        return; //apstādina zīmējumu
    }

    time_remaining = time_remaining - 1 / FPS; //Citādāk laiks samazinās

    camera_y = camera_y + camera_speed; //Kustina kameru uz leju pa ekrānu
    if (camera_y > myCanvas.height) { //ja kamera ir nogājusi zem apakšas
        camera_y = 0;      //novieto to atpakaļ augšā
        camera_x = Math.random() * (myCanvas.width - cameraWidth); //izvēlas nejaušu x pozīcīju
    }

    ctx.drawImage(cameraImg, camera_x, camera_y, cameraWidth, cameraHeight);//Uzzīmē kameru

    if (ImagesTouching(girl_x, girl_y, girlWidth, girlHeight, camera_x, camera_y, cameraWidth, cameraHeight)){ //Pārbauda, vai bildes saskaras
        score = score + 1;  //pievieno rezultātam 1
        camera_x= -cameraWidth;
        camera_y = 0;
        camera_x = -cameraWidth; //pārvieto kameru prom
    }
}

function MyKeyDownHandler(MyEvent) {
    if (MyEvent.keyCode == 37 && girl_x > 0) { girl_x = girl_x - 10;} //pa kreisi
    if (MyEvent.keyCode == 39 && girl_x + girlWidth < myCanvas.width) {girl_x = girl_x + 10;} //pa labi
    if (MyEvent.keyCode == 83)restart_game(); //S, lai atsāktu spēli
    MyEvent.preventDefault();
}

addEventListener("keydown", MyKeyDownHandler);

myCanvas.width = window.innerWidth - 10;  // aizpilda visu mājaaslapas platumu
myCanvas.height = window.innerHeight - 10;  // aizpilda visu mājaslapas augstumu

//sāk spēli
setInterval(Do_a_Frame, 1000 / FPS);