var boardWidth = 1000;
var boardHeight = 750;
var board;
var context;
var MILOPNG;
var birdImg;
var xax = 0;
var lifes = 3;
var akgun;
var punch = new Audio();
    punch.src = "media/punch.mp3";
var gunshot = new Audio();
    gunshot.src = "media/gunshot.mp3";
    gunshot.load();
var laserhit = new Audio();
laserhit.src = "media/laser.mp3";
var laserload = new Audio();
laserload.src = "media/load.mp3";
var pain = new Audio();
pain.src = "media/pain.mp3";
var gameoversound = new Audio();
gameoversound.src = "media/gameover.mp3";

var fatality = new Audio();
fatality.src = "media/fatality.mp3";
var player = {
    x: 150,
    y: 250,
    width: 50,
    height: 50,
    velocityY: 0,
    velocityX: 0,
    gravity: 0.4,
}

var laser = {
    x: 8959,
    y: 250,
    width: 100,
    height: 600,
    velocityY: 0,
}

var gun = {
    x: 200,
    y: 250,
    width: 150,
    height: 50,
    velocityY: 0,
    velocityX: 0,
    gravity: 0.4,
}
var gun2 = {
    x: 200,
    y: 250,
    width: 150,
    height: 50,
    velocityY: 0,
    velocityX: 0,
    gravity: 0.4,
}

var bullet = {
    //gun.x + 150
    x: 5000,
    y: 235,
    width: 50,
    height: 50,
    velocityY: 0,
    velocityX: 0,
}

var bullet2 = {
    //gun.x + 150
    x: 5000,
    y: 235,
    width: 50,
    height: 50,
    velocityY: 0,
    velocityX: 0,
}

var platform1 = {
    x: 50,
    y: 700,
    width: 1900,
    height: 50,
}
var platform2 = {
    x: 460,
    y: 500,
    width: 350,
    height: 50,
}
var platform3 = {
    x: 260,
    y: 650,
    width: 650,
    height: 5,
}

var platform4 = {
    x: 50,
    y: 0,
    width: 1900,
    height: 50,
}

var platform5 = {
    x: 0,
    y: 0,
    width: 50,
    height: 1050,
}

var platform6 = {
    x: 950,
    y: 50,
    width: 50,
    height: 650,
}

var enemy1 = {
    x: 390,
    y: 150,
    width: 150,
    height: 150,
    velocityY: 0,
    velocityX: 0,
}

var detectionline = {
    x: 0,
    y: 150,
    width: 10,
    height: 1000
}


function DrawPlayer(){

    context.drawImage(birdImg, player.x, player.y, player.width, player.height);
    context.fillStyle = "white";

    gun.x = player.x + 50;
    gun.y = player.y;
    gun2.x = player.x - 150;
    gun2.y = player.y;
    context.drawImage(akgun, gun.x, gun.y, gun.width, gun.height);
    context.drawImage(akgun2, gun2.x, gun2.y, gun2.width, gun2.height);
    context.drawImage(bulletak2, bullet2.x, bullet2.y, bullet2.width, bullet2.height);
    context.drawImage(bulletak, bullet.x, bullet.y, bullet.width, bullet.height);
    context.drawImage(laserimg, laser.x, laser.y, laser.width, laser.height);
    player.y += player.velocityY;
    player.x += player.velocityX;
    bullet.x += bullet.velocityX;
    bullet2.x += bullet2.velocityX;
    player.velocityY += player.gravity;
}

function DrawPlatforms(){
    context.drawImage(block, platform1.x, platform1.y, platform1.width, platform1.height)
    context.fillStyle = "black";
    context.fillRect(platform1.x, platform1.y, platform1.width, platform1.height);

    context.drawImage(block, platform2.x, platform2.y, platform2.width, platform2.height);
    
    context.fillStyle = "black";
    context.fillRect(platform3.x, platform3.y, platform3.width, platform3.height);


    context.fillStyle = "black";
    context.fillRect(platform4.x, platform4.y, platform4.width, platform4.height);

    context.fillStyle = "black";
    context.fillRect(platform5.x, platform5.y, platform5.width, platform5.height);
    
    context.fillStyle = "black";
    context.fillRect(platform6.x, platform6.y, platform6.width, platform6.height);
}
var xd = 0;
var xar = 0;
var fastest = 4;
function EnemyCollisions(){



    detectionline.x = enemy1.x + 70;
    enemy1.y += enemy1.velocityY;
    enemy1.x += enemy1.velocityX;


    enemy1.x += fastest;
    if (detectCollision(enemy1, platform6)){
        fastest = -6;
    }
    if (detectCollision(enemy1, platform5)){
        fastest = 6;
    }

    if (detectCollision(laser, player)){
        if (lifes != 0){
            player.x = 150;
        }
        pain.play();
        lifes--;
    }
    var haha = 1;
    if (lifes == 0){
        if (haha == 1){
        gameoversound.play();
        player.x = 9000;
        platform4.x = 5000;
        platform3.x = 5000;
        platform2.x = 5000;
        platform1.x = 5000;
        haha = 0;
        }

        
    }
    if (detectCollision(detectionline, player)){
        laserload.play();
        xd = 1;
        enemy1.x = Math.floor(Math.random() * board.width - 100);
        setInterval(zap, 1000);
    }

    if (detectCollision(bullet, enemy1) && bosshp > 1){
        bullet.x = 9000;
        punch.play();
        bosshp -= Math.floor(Math.random() * 20) * 20;
    }

    if (detectCollision(bullet2, enemy1) && bosshp > 1){
        bullet.x = 9000;
        punch.play();
        bosshp -= Math.floor(Math.random() * 20);
    }


    if (detectCollision(player, enemy1)){
        if (lifes != 0){
            player.x = 150;
        }
        pain.play();
        lifes--;
    }
    context.drawImage(DawidImg, enemy1.x, enemy1.y, enemy1.width, enemy1.height);

}
function zap(){
    if (xd == 1){
    laserhit.play();
    laser.x = enemy1.x;
    setInterval(zap2, 600);
    }
}


function zap2(){
    laser.x = 9000;
    xd = 0;
}
function PlayerCollisions(){

    //1
    if (detectCollision(player, platform1) && player.y < platform1.y-10 && lifes != 0){
        xax = 0;
        player.y = platform1.y-platform1.height+3.2;
        player.velocityY = 0;
    }
    if (detectCollision(player, platform1) && player.y > platform1.y-10 && lifes != 0){
        player.y = platform1.y+platform1.height;
        player.velocityY = 2;
    }

    //2
    if (detectCollision(player, platform2) && player.y < platform2.y-10 && lifes != 0){
        xax = 0;
        player.y = platform2.y-platform2.height+3.2;
        player.velocityY = 0;
    }
    if (detectCollision(player, platform2) && player.y > platform2.y-10 && lifes != 0){
        player.y = platform2.y+platform2.height;
        player.velocityY = 2;
    }

    //3
    if (detectCollision(player, platform3) && player.y < platform3.y-10 && lifes != 0){
        xax = 0;
        player.y = platform3.y-platform3.height*platform1.height/platform3.height+3.2;
        player.velocityY = 0;
    }
    if (detectCollision(player, platform3) && player.y > platform3.y-10 && lifes != 0){
        player.y = platform3.y+platform3.height;
        player.velocityY = 2;
    }

    //4
    if (detectCollision(player, platform4) && player.y < platform4.y-10 && lifes != 0){
        xax = 0;
        player.y = platform4.y-platform4.height*platform1.height/platform4.height+3.2;
        player.velocityY = 0;
    }
    if (detectCollision(player, platform4) && player.y > platform4.y-10 && lifes != 0){
        player.y = platform4.y+platform4.height;
        player.velocityY = 2;
    }

    //5
    if (detectCollision(player, platform5) && lifes != 0){;
        player.velocityX = 0;
        player.x = 98;
    }

    //6
    if (detectCollision(player, platform6) && lifes != 0){;
        player.velocityX = 0;
        player.x = 850;
    }

}

var bulletak;
var bulletak2;
var akgun2;
var block;
var laserimg;

function DrawImages(){
    birdImg = new Image();
    birdImg.src = "media/pietrzus.png";
    birdImg.onload = function(){
        context.drawImage(birdImg, 123, 123, 123, 123);
    }
    DawidImg = new Image();
    DawidImg.src = "media/dawid.jpg";
    DawidImg.onload = function(){
        context.drawImage(DawidImg, 123, 123, 123, 123);
    }
    akgun = new Image();
    akgun.src = "media/ak47.png";
    akgun.onload = function(){
        context.drawImage(akgun, gun.x, gun.y, gun.width, gun.height);
    }


    akgun2 = new Image();
    akgun2.src = "media/ak472.png";
    akgun2.onload = function(){
        context.drawImage(akgun2, gun2.x, gun2.y, gun2.width, gun2.height);
    }
    bulletak2 = new Image();
    bulletak2.src = "media/bullet2.png";
    bulletak2.onload = function(){
        context.drawImage(bulletak2, bullet2.x, bullet2.y, bullet2.width, bullet2.height);
    }

    bulletak = new Image();
    bulletak.src = "media/bullet.png";
    bulletak.onload = function(){
        context.drawImage(bulletak, bullet.x, bullet.y, bullet.width, bullet.height);
    }

    block = new Image();
    block.src = "media/question.gif";
    block.onload = function(){
        context.drawImage(block, 231, 231, 231, 231);
    }
    laserimg = new Image();
    laserimg.src = "media/pro100.png";
    laserimg.onload = function(){
        context.drawImage(laserimg, 131, 231, 231, 231);
    }

}
//
var lolo = 0;
var bosshp = 5000;

function BossHpCheck(){
    if (bosshp <= 0 && lolo == 0){
        bullet.x = 9000;
        enemy1.x = 9000;
        fatality.play();
        lolo = 1;
    }
}

function DrawText(){
    document.getElementById("bosshp").innerHTML = "BOSS: " + bosshp + "HP";
    document.getElementById("playerhp").innerHTML = "YOU: " + lifes * 1000 + "HP";
}
function KeyEventListener(){
    document.addEventListener("keyup", keyup);
    document.addEventListener("keydown", keydown);
}

function ClearRect(){
    context.clearRect(0, 0, board.width, board.height);
}
function Board(){
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");
}
function musicPlay() {
    document.getElementById('audio').play();
    document.removeEventListener('click', musicPlay);
    }






window.onload = function(){
    Board();
    DrawImages();
    requestAnimationFrame(update);
}
function update(){
    document.addEventListener('click', musicPlay);
    document.addEventListener('keydown', musicPlay);
    requestAnimationFrame(update);
    KeyEventListener();
    ClearRect();
    DrawText();
    BossHpCheck();
    DrawPlayer();
    DrawPlatforms();
    PlayerCollisions();
    EnemyCollisions();

}








function keyup(e){

    if (e.code == "ArrowUp"){
        player.velocityY = 0;
    }
    
    if (e.code == "ArrowLeft" && player.velocityX != 2){
        player.velocityX = 0;
    }
    
    if (e.code == "ArrowRight" && player.velocityX != -2){
        player.velocityX = 0;
    }

}

function keydown(e){
    if (e.code == "ArrowUp" && xax == 0){
        player.velocityY = -12;
        xax = 1;
    }
    
    if (e.code == "ArrowLeft"){
        player.velocityX = -2;
    }
    
    if (e.code == "ArrowRight"){
        player.velocityX = 2;
    }
    if (e.code == "ArrowDown"){
        gunshot.play();
        bullet.x = gun.x + 150;
        bullet.y = gun.y - 20;
        bullet.velocityX = 10;
        bullet2.x = gun.x - 220;
        bullet2.y = gun.y - 20;
        bullet2.velocityX = -10;
    }

}

function detectCollision(a, b){
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}