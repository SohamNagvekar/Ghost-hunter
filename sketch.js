var tower, towerImage
var door, doorImage, doorsGroup
var climber, climberImage, climbersGroup
var ghost, ghostImage
var invisibleBlock, invisibleBlockGroup
var gameState = "play"

function preload() {
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300, 300);
  tower.addImage(towerImage);
  tower.velocityY = 1;

  ghost = createSprite(300, 300);
  ghost.addImage(ghostImage);
  ghost.scale = 0.4;
  doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleBlocksGroup=new Group();
}

function draw() {
  background(0);
  
  if (gameState==="play"){
    
  
  
  if(tower.y>400){
    tower.y=300;
  }
  
  if(keyDown("space")){
    ghost.velocityY=-10
  }
  
   if(keyDown("right_arrow")){
    ghost.x+=3;}
  
  if(keyDown("left_arrow")){
    ghost.x-=3;}
  
  ghost.velocityY+=0.8;
  if(invisibleBlocksGroup.isTouching(ghost)|| ghost.y>600){
    ghost.destroy();
    gameState="end";
  }
    
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0;
    }
    
  spawnDoors();    
  drawSprites();
  }
  else if(gameState==="end"){
    stroke("yellow");
    fill("white");
    textSize(30);
    text("Game Over",230,250);
  }
}

function spawnDoors(){
  if(frameCount%240===0){
    door=createSprite(200,-50);
    climber=createSprite(200,10);
    invisibleBlock=createSprite(200,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2
    door.x=Math.round(random(120,400));
    climber.x=door.x;
    invisibleBlock.x=door.x;
    climber.addImage(climberImage);
    door.addImage(doorImage);
    door.velocityY=1;
    climber.velocityY=1;
    invisibleBlock.velocityY=1;
    ghost.depth=door.depth;
    ghost.depth+=1
    door.lifetime=800;
    climber.lifetime=800;
    invisibleBlock.lifetime=800;
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlocksGroup.add(invisibleBlock);
  }
  
  
}

