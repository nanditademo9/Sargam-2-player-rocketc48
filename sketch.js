/*  resetPlayerInfo()
    {
          database.ref('/').update({
        players:null 
            
          });
       
    }
*/
// ive added this in player.js
// ive called it in form.js when im clicking resetbutton 
// also now u will see the red marker on the current spaceship 



var canvas;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var universe, rockets, rocket1, rocket2,rocket3,rocket4; 
 var rocket1_img, rocket2_img;

function preload(){
universe = loadImage("background.png");
rocket1_img = loadImage("rocket.png");
rocket2_img = loadImage("rocket.png");
}


function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}