const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var engine, world;
var ground, ball;

var gameState=0

var bg;
var bgImage;
var play;
var playImage;
var logo;
var logoImage;
var player;
var playerImage;
var zombie;
var zombieImage;
var zombie2;
var zombie2Image;
var zombie3;
var zombie3Image;
var playerleft;
var plImage;
var bullet;
var bulletImage;
var score = 0;
var lives = 3;
var heart1;
var heart2;
var heart3;
var heart1Img;
var heart2Img;
var heart3Img;
var play;
var playImage;
var how;
var howImage;
var Bimage;

var zombieGroup1;
var zombieGroup2;
var zombieGroup3;
var bulletGroup;

var line;
var lineImage;

var theme;
var themeImage;

var home;
var homeImage;

var back;
var backImage;

var sound;
var boom;

var over;
var overImage

var gImage;

function preload(){
bgImage=loadImage("assets/damn.jpg")
playerImage=loadAnimation("assets/playerright.png","assets/playerright.png","assets/playerright.png","assets/playerright2.png","assets/playerright2.png")
zombieImage=loadAnimation("assets/zombie1.png","assets/zombie2.png","assets/zombie3.png")
zombie2Image=loadAnimation("assets/zb1.png","assets/zb2.png","assets/zb3.png","assets/zb4.png","assets/zb5.png","assets/zb6.png","assets/zb7.png")
zombie3Image=loadAnimation("assets/zom.png","assets/zom1.png","assets/zom2.png","assets/zom3.png","assets/zom4.png")
bulletImage=loadImage("assets/bullet.png")
logoImage=loadImage("assets/theme.png")
heart1Img=loadImage("assets/hearts.png")
heart2Img=loadImage("assets/hearts.png")
heart3Img=loadImage("assets/hearts.png")
lineImage=loadImage("assets/line.png")
themeImage=loadImage("assets/theme.png")
playImage=loadImage("assets/play.png")
howImage=loadImage("assets/how.png")
homeImage=loadImage("assets/home.png")
backImage=loadImage("assets/back.png")
Bimage=loadImage("assets/oof.jpg")
sound=loadSound("assets/epic.mp3")
boom=loadSound("assets/boom.mp3")
overImage=loadImage("assets/gameover.jpeg")
gImage=loadImage("assets/gg.jpg")
}

function setup(){
createCanvas(1400,700);
engine = Engine.create();
world = engine.world;
    
bg=createSprite(1800,300)
bg.addImage("bg",bgImage)
bg.visible=false
bg.scale=10

player=createSprite(width/2,height/2+240)
player.addAnimation("player",playerImage)
player.scale=1
player.frameDelay=15

line=createSprite(700,height/2+400)
line.addImage("line",lineImage)
line.scale=1.3
line.debug=false
line.setCollider("rectangle",-2,242)

heart1=createSprite(1300,100)
heart1.addImage("heart",heart1Img)
heart1.scale=0.2

theme=createSprite(width/2,200)
theme.addImage("logo",themeImage)
theme.scale=

play=createSprite(740,580)
play.addImage("play",playImage)
play.scale=0.04
play.visible=false

how=createSprite(820,480)
how.addImage("how",howImage)
how.scale=1
how.visible=false

back=createSprite(1220,640)
back.addImage("back",backImage)
back.scale=1
back.visible=false

how=createSprite(820,480)
how.addImage("how",howImage)
how.scale=1
how.visible=false


zombieGroup1=createGroup()
zombieGroup2=createGroup()
zombieGroup3=createGroup()
bulletGroup=createGroup()

sound.play()
sound.setVolume(0.1)


score=0
lives=3
}

function draw(){
    Engine.update(engine);
    if(gameState==0){
        background(Bimage);
        image(themeImage,480,-80,500,500)
        image(playImage,width/2-40,520,150,150)
        //image(howImage,800,400,150,150)
        player.visible=false
        line.visible=false
        heart1.visible=false
        play.visible=true
        back.visible=false

       
        push()
        textSize(20)
        fill("#white")
        text(" YOU ARE IN THE YEAR 2157 AND ZOMBIES"  ,20,150)
        text(" HAVE STARTED TO TAKE OVER THE HUMANS"  ,20,180)
        text("YOU AND YOUR FRIENDS HAVE DECIDED TO KILL"  ,20,250)
        text("THE ZOMBIES IN ORDER TO SAVE THE WORLD"  ,20,270)
        text("KILL 20 ZOMBIES IN ORDER TO WIN THIS GAME"  ,20,350)
        text("USE SPACE BAR TO SHOOT"  ,20,450)
        text("IF ZOMBIES REACH NEAR YOU, YOU LOST"  ,20,550)
        text("GOOD LUCK"  ,20,650)
        pop()  
      
     
        if(mousePressedOver(play)){
            gameState=2
        }

    
        
        

        //if(mousePressedOver(howI
        
    }
   
    if(gameState==2){
        background(bgImage)
        theme.visible=false
        player.visible=true
        line.visible=true
        heart1.visible=true
        play.visible=false
        spawnZombies()


        if(keyDown("RIGHT_ARROW") || keyDown("D")){
            player.x=player.x+10
            //bullet.x=bullet.x+10
           
        }
    
        if(keyDown("LEFT_ARROW") || keyDown("A")){
            player.x=player.x-10
            //bullet.x=bullet.x-10
        }
       
    
        if(player.x>width){
            player.x=width
        }
    
        if(player.x<0){
            player.x=0
        }

        if(zombieGroup1.isTouching(bulletGroup)){
            zombieGroup1.destroyEach()
            score=score+1
            bullet.visible=false
        }
        if(zombieGroup2.isTouching(bulletGroup)){
            zombieGroup2.destroyEach()
            score=score+1
            bullet.visible=false
        }
        if(zombieGroup3.isTouching(bulletGroup)){
            zombieGroup3.destroyEach()
            score=score+1
            bullet.visible=false
        }
       
     
         
        if( zombieGroup1.isTouching(line)){
            heart1.visible=false
            gameState=1
         }

         if( zombieGroup2.isTouching(line)){
            heart1.visible=false
            gameState=1
         }

         if( zombieGroup3.isTouching(line)){
            heart1.visible=false
            gameState=1
         }

         if(score>=20){
            gameState=3
         }


        if(gameState==1){
            background("white")
            player.visible=false
            heart1.visible=false
            zombieGroup1.destroyEach()
            zombieGroup2.destroyEach()
            zombieGroup3.destroyEach()
            image(overImage,width/2-300,height/2-200,600,400)
            push()
            fill("BLUE")
            textSize(40)
            text("WELL TRIED AND THANK YOU FOR PLAYING THIS GAME",100,100)
            pop()
        }
        
        if(gameState==3){
            background(gImage)
            player.visible=false
            zombieGroup1.destroyEach()
            zombieGroup2.destroyEach()
            zombieGroup3.destroyEach()
            push()
            fill("WHITE ")
            textSize(30)
            text("CONGRATS !",width/2-100,100)
            text("YOU KILLED THE ZOMBIES AND SAVED CITY FROM ZOMBIE INVASION",170,400)
            pop()
        }
            
           


       // if()
        
        

    /*if(zombieGroup.isTouching(bullet)){
        bullet.visible=false
        zombieGroup.destroyEach()
        score=score+1
    }*/


    

    
    drawSprites()
    
    push()
    textSize(50)
    fill("#WHITE")
    text("Score : " + score ,120,150)
    pop()  
     

    }

  
}



function spawnZombies(){
  if(frameCount%120===0){
    
    
    
    //zombie.velocityX=-1

    var rand = Math.round(random(1,3))
    switch(rand){
        case 1 :
        var zombie1=createSprite(width/2-200,height/2-100)    
        zombie1.addAnimation("zombie1",zombieImage)
         //zombie1
    zombie1.x=Math.round(random(500,width-300))
    zombie1.y=150
    zombie1.scale=0.4
    //right down
    zombie1.velocityX=-1.4
    //zombie1.velocityY=1
    zombie1.velocityY=5.3
    zombie1.frameDelay=9
    zombieGroup1.add(zombie1)  
    zombieGroup1.lifetime=100
  
    

                break;
        case 2 : 
        var zombie2=createSprite(width/2,height/2-100)
        zombie2.addAnimation("zombie2",zombie2Image)
        //zombie2
    zombie2.x=Math.round(random(500,width-300))
    zombie2.y=150
    zombie2.scale=0.4
    //left down
    zombie2.velocityX=-2.6
    zombie2.velocityY=5
    zombie2.frameDelay=10
    zombieGroup2.add(zombie2)  
    zombieGroup2.lifetime=10
  
   

                break;
        case 3 :
        var zombie3=createSprite(width/2+200,height/2-100)    
        zombie3.addAnimation("zombie3",zombie3Image)
         

    //zombie3
    zombie3.x=Math.round(random(500,width-300))
    zombie3.y=150
    zombie3.scale=0.4
    //right down
    zombie3.velocityX=-5
    zombie3.velocityY=6
    zombie3.frameDelay=10
    zombieGroup3.add(zombie3)  
    zombieGroup3.lifetime=10




        default:break;
    }
  

  }
}

/*function shoot(){
    bullet=createSprite(player.x+90,player.y-150)
    bullet.addImage("bullet",bulletImage)
    bullet.scale=0.07
    bullet.setVelocity(5,-3)
  }*/


function keyPressed(){

    if(keyCode===32){
        bullet=createSprite(player.x+52,player.y-150)
        bullet.addImage("bullet",bulletImage)
        bullet.scale=0.07
        bulletGroup.add(bullet)
    }


 
}

function keyReleased(){
   if(keyCode===32){
    bullet.setVelocity(20,-10)
    boom.play()
    boom.setVolume(0.3)
   }
}