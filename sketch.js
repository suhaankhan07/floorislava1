var ball,lava1,lava2,coin;
var gameState;
var obstacle;
var skyImg;

function preload() {
 skyImg = loadImage("skyBackground.jpg")
}
 
 function setup() {
  //createCanvas(400,400);

  //sets the variables
  ball = createSprite(40,200,40,40);
  lava1 = createSprite(400,858,3000,100);
  lava2 = createSprite(400,42,3000,100);
  coin  = createSprite(1670,400,20,20);
  obstacle = createSprite(900,250,130,200);
  

  //sets gamestate var
   gameState = "serve";

 }


function draw() {

  //makes background white
  background("white");
  image(skyImg,0,displayWidth-300,displayWidth - 40,displayHeight - 110);

  //makes display size canvas size
 canvas = createCanvas(displayWidth - 80, displayHeight - 110);
  
  //changes the color of sprites
  lava1.shapeColor = "orange";
  lava2.shapeColor = "orange";
  ball.shapeColor = "red";
  coin.shapeColor = "RGB(200,255,0)"; 
  obstacle.shapeColor = "green";
 
  //sets the beginning of the game
 if(gameState === "serve") {
  textSize(25);
  fill("blue");
  text("ARE YOU READY? LETS GO",40,150);
  text("UP ARROW KEY TO JUMP",45,300);
  text("CLICK SPACE TO START",65,200);
  
  if(keyDown("space")) {
    gameState = "action"
  }
  
 

}

 
  //sets rules for action gamestate
 if(gameState === "action") {
   textSize(45);
   fill("red");
   text("Every level will have a coin.",250,240);
   text("Get the coin to win.", 360,300);
   text("AVOID LAVA AT ALL COSTS",235,730);
   ball.velocityY = ball.velocityY +1.5;

   //Movement Controls
  if(keyWentDown("up")) {
    ball.velocityX = 0;
    ball.velocityY = -30;
  }

  if(keyWentDown("right")) {
    ball.velocityX = 6;
}

  
  if(keyWentDown(LEFT_ARROW)) {
    ball.velocityX = -6;
  }

  obstacle.velocityY = -10;
  obstacle.bounceOff(lava1 && lava2);

  

 }
  
  
    //sets how player loses and plays cool sound when player dies
 if(ball.isTouching(lava1) || ball.isTouching(lava2) || ball.isTouching(obstacle)) {
  ball.destroy();
  //playSound("sound://category_explosion/8bit_explosion.mp3");
  gameState = "GAMEOVER";
 }

  //what happens when you lose - text
 if(gameState === "GAMEOVER") {
  textSize(25);
  fill("blue");
  text("GAME OVER : YOU LOSE",50,130);
  ball.visible = false;
  obstacle.visible = false;
 }


  //sets rule for when gamestate is = win/cool sound effect
 if(ball.isTouching(coin)) {
   gameState = "WIN";
 }

   //text for what happens when gameState = win
  if(gameState === "WIN") {
    coin.destroy();
    fill(rgb(255, 0, 255));
    textSize(36);
    text("GREAT JOB : YOU WIN",5,200);
    ball.setVelocity(0,0);    
    ball.destroy();
    ball.visible = false;
    obstacle.visible = false;
  }

   //displays Sprites
   drawSprites();  
}
