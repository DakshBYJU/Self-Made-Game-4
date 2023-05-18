
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var PLAY = 1
var END = 0

var gameState = PLAY
var bg, bgImg
var invisibleGround
var invisibleCelling
var obstacle1, obstacle2, obstacle, obstacleGroup
var playerImg,player
var gameOver, gameOverImg
var restart, restartImg
function preload()
{
	bgImg = loadImage("Forest.jpg")
playerImg = loadImage("flying-superman.png")
	obstacle1 = loadImage("rock-clipart-4.png")

obstacle2 = loadImage("animal.png")
gameOverImg = loadImage("Game-Over-PNG-Image.png")
restartImg = loadImage("restartImg.png")
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	bg = createSprite(200,10,1,1);
	bg.addImage(bgImg);
	bg.scale = 1.3
	invisibleGround = createSprite(600,600,1000,20)
	invisibleGround.visible = false;
	
	invisibleCelling = createSprite(600,10,1000,20)
	invisibleCelling.visible = false;

	engine = Engine.create();
	world = engine.world;
	
	player = createSprite(100,200,20,50);
	player.addImage("player", playerImg);
	player.scale = 0.8;
	gameOver = createSprite(width/2,height/2- 100);
  gameOver.addImage(gameOverImg);

  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  gameOver.visible = false
          restart.visible = false
		  gameOver.scale = 0.2
		  restart.scale = 0.1
	
	
	obstacleGroup = new Group()

	//Create the Bodies Here.


	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(0);
  
 
  if(gameState === PLAY){ 
         
	if(keyDown("space")) {
		player.velocityY = -10 ;
		
	  }
   
	  
spawnObstacle();
  if ( player.y > 600 || obstacleGroup.isTouching(player)){

	gameState = END
  }
}
  if (gameState === END){
	player.velocityY = 0
	gameOver.visible=true
	restart.visible=true

	obstacleGroup.setVelocityXEach(0)

	obstacleGroup.setLifetimeEach(-1)

	if ( mousePressedOver(restart)){
	  reset()
	}
   }
  
   player.velocityY = player.velocityY + 2;

  player.collide(invisibleGround);
   player.collide(invisibleCelling);
  
  drawSprites();
 
}



function spawnObstacle() {
	if (frameCount % 60 === 0) {
	 obstacle = createSprite(width/2 + 500,510,100,100)
	obstacle.setCollider('circle',0,0,35)
	 obstacle.velocityX = -8
   
   var rand = Math.round(random(1,2))
	 switch(rand){
	 case 1: obstacle.addImage(obstacle1)
	   break;
	 case 2: obstacle.addImage(obstacle2)
	   break;
	 
   }
   obstacle.scale = 0.3
   obstacle.lifetime = 400
   obstacleGroup.add(obstacle)
   }
}
function reset(){
 
    gameState = PLAY
    player.y=200

    gameOver.visible= false
    restart.visible=false

    obstacleGroup.destroyEach()
   


}