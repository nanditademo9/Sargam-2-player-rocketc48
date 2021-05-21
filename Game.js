class Game {
    constructor(){
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
  
      rocket1 = createSprite(100,200);
      rocket1.addImage("rocket1" ,rocket1_img);
      rocket2 = createSprite(500,200);
      rocket2.addImage("rocket2" ,rocket2_img);
     /* rocket3 = createSprite(500,200);
     // rocket3.addImage("rocket3" ,rocket1_img);
      //rocket3.scale=0.5;
      rocket4 = createSprite(700,200);
     // rocket4.addImage("rocket4" ,rocket2_img);
     // rocket4.scale=0.5;*/
      rockets = [rocket1, rocket2];
    }
  
    play(){
      form.hide();
      
      Player.getPlayerInfo();  
      player.getRocketsAtEnd();  
  
      
      if(allPlayers !== undefined){
        background("grey");
        image(universe, 0,-displayHeight*4,displayWidth, displayHeight*5);
        
        
       
        
        //index of the array
        var index = 0;
    
        //x and y position of the cars
        var x = 150 ;
        var y;
  
        for(var plr in allPlayers){
          //add 1 to the index for every loop
          index = index + 1 ;
          console.log(allPlayers);;
          console.log("plr is " + plr);
          //position the cars a little away from each other in x direction
          x = x + 300;
          //use data form the database to display the cars in y direction
          
          y = displayHeight - allPlayers[plr].distance;
          rockets[index-1].x = x;
          rockets[index-1].y = y;
              
         
          if (index === player.index){
            stroke(10);
            fill("red");
            ellipse(x,y,60,160);
           
            rockets[index - 1].shapeColor = "red";
            camera.position.x = displayWidth/2;
            camera.position.y = rockets[index-1].y;
          }
        }
      }
  
      if(keyIsDown(UP_ARROW) && player.index !== null){
        console.log("im clicking arrow key");
        player.distance +=10
        player.update();
      }
  
      if(player.distance > 3860){
        gameState = 2;
        player.rank = player.rank +1;
        Player.updateRocketsAtEnd(player.rank);
      }
     
      drawSprites();
    }
  
    end(){
    console.log("Game Ended");
    console.log(player.rank);
  
    }
  }