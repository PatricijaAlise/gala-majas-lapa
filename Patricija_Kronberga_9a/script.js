const myCanvas = document.getElementById("myCanvas");
var ctx = myCanvas.getContext("2d"); 

 var Girl_x = 0;
 var Girl_y = 0;
 var GirlImg = new Image();
 GirlImg.src = "https://s2js.com/PatricijaAlise/Girl.png";
 
 var Camera_x = 0;
 var Camera_y = 0;
 var CameraImg = new Image();
 CameraImg.src = "https://s2js.com/PatricijaAlise/camera.png";
 
const girlWidth = 150;
const girlHeight = 150;
const CameraWidth = 50;
const CameraHeight = 50

var score = 0;
var Camera_speed = 3;
var FPS = 40; 
var time_remaining = 60;
//funkcija, kura sāk spēli no sākuma, ja uzspiež "S"
function restart_game() {
time_remaining = 60;
score = 0;
Camera_speed = 3;
}
//funkcija, kas ierauga, ja bildes saskaras
 function ImagesTouching(x1, y1, img1w, img1h, x2, y2, img2w, img2h) {
 if (x1 > x2+img2w || x1+img1w < x2) return false;  // pārāk daudz pa kreisi/labi
 if (y1 > y2+img2h || y1+img1h < y2) return false; // pārāk daudz uz augšu/leju
return true;
 }
 
function Do_a_Frame () {
ctx.clearRect(0, 0, myCanvas.width, myCanvas.height); //notīra zīmēšanas laukumu
ctx.fillStyle = "black";
ctx.font = "50px Arial";
ctx.fillText("Rezultāts: " + score, 0, 20); //parāda rezultātu
 
Girl_x = myCanvas.height - girlHeight; }//parāda, ka meitene ir fona apakšā
ctx.drawImage(GirlImg, Girl_x, Girl_y, girlWidth, girlHeight); //uzzīmē meiteni

ctx.fillText("Atlikušais laiks: " + Math.round(time_remaining), 0, 50); //parāda atlikušo laiku
   if (time_remaining <= 0) { //ja laiks ir beidzies
ctx.fillStyle= "red";
ctx.font = "bold 50px Arial";
ctx.textAlign="center";
ctx.fillText("Beigas", myCanvas.width / 2, myCanvas.height / 2); //parāda tekstu
ctx.textAlign="left";
}
else {
time_remaining = time_remaining - 1/FPS; //citādāk laiks samazinās

Camera_y = Camera_y + Camera_speed; //kustina cameru uz leju
if (Camera_y > myCanvas.height) { //ja nots ir nogājusi zem apakšas
Camera_y= 0;  //novieto to atpakaļ augšā
Camera_x= Math.random() * (myCanvas.width - CameraWidth); }//izvēlas nejaušu x pozīcīju
}
ctx.drawImage(CameraImg, Camera_x, Camera_y, CameraWidth, CameraHeight); //uzzīmē cameru

if (ImagesTouching(girl_x, girl_y,girlWidth, girlHeight, Camera_x, Camera_y, CameraWidth, CameraHeight)) {  //Pārbauda, vai attēli saskaras
 score = score + 1; } //Pievieno rezultātam 1
Camera_x= -cameraWidth;

setInterval(Do_a_Frame, 1000/FPS);
//Funkcija, kura pārvieto attēlus, reaģējot uz taustiņu pieskārieniem
function MyKeyDownHandler (MyEvent) {
if (MyEvent.keyCode == 37 && girl_x > 0) {girl_x = girl_x - 10;} // pa kreisi
if (MyEvent.keyCode == 39 && girl_x + girlWidth < myCanvas.width) {girl_x = girl_x + 10;}  // pa labi
if (MyEvent.keyCode == 83) restart_game();                                             // S, lai atsāktu spēli
MyEvent.preventDefault();
}
addEventListener("keydown", MyKeyDownHandler);
  myCanvas.width = window.innerWidth - 10; // aizpilda visu mājaaslapas platumu
  myCanvas.height = window.innerHeight - 10; // aizpilda visu mājaslapas augstumu