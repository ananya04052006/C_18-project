var bg, backG;
var banana, bananaImg;
var obstacle, obstacleImg;
var score, ground;
var monkey, monkey_running;
var bananaGroup, obstacleGroup;

function preload() {

  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  bg = loadImage("jungle.png");
  bananaImg = loadImage("banana.png");
  obstacleImg = loadImage("stone.png");
}

function setup() {
  createCanvas(950, 600);

  backG = createSprite(475, 300, 10, 10);
  backG.addImage("bGround", bg);
  //backG.x = backG.width/2;
  backG.scale = 2;
  ground = createSprite(200, 500, 1900, 10);
  ground.velocityX = -3;
  ground.x = ground.width/2;
  monkey = createSprite(150, 440, 50, 10);
  monkey.addAnimation("monk.ey", monkey_running);
  monkey.scale = 0.2;
  score = 0;
  bananaGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  background(0);

  text("Score: "+ score, 850, 100);

  if(ground.x < 0) {
    ground.x = ground.width/2;
  }

  if(keyDown("space") && monkey.y >= 270) {
    monkey.velocityY = -13;
  }

  monkey.collide(ground);

  monkey.velocityY = monkey.velocityY + 0.5;

  if(bananaGroup.isTouching(monkey)) {
    bananaGroup.destroyEach();
    score = score + 2;
    }

  if(obstacleGroup.isTouching(monkey)) {
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    monkey.destroy();
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
  }

  ground.visible = false;

  drawSprites();
  obstacles();
  Banana();
}

function Banana() {

  if(frameCount % 200 === 0) {
    banana = createSprite(1010, 280, 40, 40);
    banana.addImage("bananaa", bananaImg);
    banana.scale = 0.1;
    //banana.y = randomNumber(150, 210);
    //console.log(banana.y);
    banana.velocityX = -4;
    banana.lifetime = 9500;
    bananaGroup.add(banana);
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
  }
}

function obstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(1010, 480, 40, 20);
    obstacle.addImage("stone", obstacleImg);
    obstacle.scale = 0.25;
    obstacle.velocityX = -4;
    obstacle.lifetime = 9500;
    obstacleGroup.add(obstacle);
    
  }
}