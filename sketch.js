
var monkey , monkey_running,ground;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survivalTime;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,200);
   
  // creating monkey
  monkey = createSprite(50,160,20,40) ;
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.08;
  
  // creating infinite scrolling ground
  ground = createSprite(200,200,900,20);
  ground.velocityX = -6;
  ground.x = ground.width/2;
  
  //Groups
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  survivalTime = 0;
}


function draw() {
  background("lightBlue");
  
  if(ground.x<0){
     ground.x = ground.width/2
  }
  
  textSize(15);
  fill("black");
  stroke("black");
  text("SURVIVAL TIME:"+survivalTime,300,30);
  
  survivalTime = survivalTime + Math.round(getFrameRate()/60);
  
  
  
  // monkey should collide the ground
  monkey.collide(ground);
  
  // jump when the space key is pressed
  if(keyDown("space")&& monkey.y >= 100) {
    monkey.velocityY = -10;
  }
  // adding gravity
  monkey.velocityY = monkey.velocityY + 0.8
   
  food();
  Stone();
  
  //console.log(banana.y);
  drawSprites();
}

function food(){
  
  if(World.frameCount%80===0){
    
    banana = createSprite(600,100,10,10);
    banana.addImage(bananaImage);
    banana.velocityX = -3;
    banana.y = Math.round(random(25,100));
    banana.scale = 0.07;
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth+1;
    
    //adding lifetime
    banana.lifetime = 580;
    
    FoodGroup.add(banana);
  }  
}

function Stone(){
  
   if (World.frameCount% 300 === 0){
     
     obstacle = createSprite(400,175,10,40);
     obstacle.addImage(obstacleImage);
     obstacle.velocityX = -9;
     obstacle.scale =0.1;
     
     obstacle.depth = monkey.depth;
     monkey.depth = monkey.depth+1;
     
     //ading lifetime
     obstacle.lifethime = 590;
     
     obstacleGroup.add(obstacle);
   }  
}




