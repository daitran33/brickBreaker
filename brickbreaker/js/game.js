var canvas=document.getElementById("myCanvas");
var ctx=canvas.getContext("2d");
 
var x=canvas.width/2;
var y=canvas.height-80;
var paddleHeight=10;
var paddleWidth=75;
var paddleX=(canvas.width-paddleWidth)/2;
var rightPressed=false;  // Whether right control button is pressed
var leftPressed=false;  // Whether left control button is pressed
var ballRadius=10;
var brickRowCount=7;
var brickColumnCount=5;
 
var count=brickRowCount*brickColumnCount;
var rem=count;
 
var score = 0;
var lives =3;  // How many lives player has to complete the game
 
var brickWidth=80;
var brickHeight=20;
var brickPadding=7;
var brickOffsetTop=30;
var brickOffsetLeft=40;
var speedup1=0;
var speedup2=0;
var speedup3=0;
var speedup4=0;
var speedup5=0;
var speedup6=0;
var speedup7=0;
 
var bricks=[];
for(c=0;c<brickColumnCount;++c){
  bricks[c]=[];
  for(r=0;r<brickRowCount;++r){
    bricks[c][r]={x:0,y:0,status:1};
  }
 
}
 
var dx=3.5;
var dy=-3.5;
 
function drawBall(){
 
  ctx.beginPath();
  ctx.arc(x,y,ballRadius,0,Math.PI*2);
  ctx.fillStyle="#fff";
  ctx.fillStroke="#fff";
  ctx.stroke="10";
  ctx.fill();
  ctx.closePath();
}
 
function drawPaddle(){
 
  ctx.beginPath();
  ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
  ctx.fillStyle="#00ffff";
  ctx.fill();
  ctx.closePath();
 
}
 
function drawBricks(){
 
  for(c=0;c<brickColumnCount;++c){
    for(r=0;r<brickRowCount;++r){
       if(bricks[c][r].status==1){
 
         var brickX=(c*(brickWidth+brickPadding))+brickOffsetLeft;
         var brickY=(r*(brickHeight+brickPadding))+brickOffsetTop;
         bricks[c][r].x=brickX;
         bricks[c][r].y=brickY;
         ctx.beginPath();
         ctx.rect(brickX,brickY,brickWidth,brickHeight);
         if(c%2!=0)
           ctx.fillStyle="#fff";
         else
           ctx.fillStyle="#C2AA83";
         ctx.fill();
         ctx.closePath();
 
      }
    }
  }
 
}
function collisionDetection(){
 
  for(c=0;c<brickColumnCount;++c){
 
    for(r=0;r<brickRowCount;++r){
 
       var b=bricks[c][r];
 
       if(b.status==1){
 
          if(x>b.x && x<b.x+brickWidth && y>b.y && y<b.y+brickHeight){
             var snd=new Audio("./music/paddleBall.wav");
             snd.play();
             dy=-dy;
             b.status=0;
             score++;
             count--;
             /*** Change color of ball when it hits a brick ****/
             ctx.beginPath();
             ctx.arc(x,y,ballRadius,0,Math.PI*2);
             ctx.fillStyle="#00ffff";
             ctx.fillStroke="#00ffff";
             ctx.stroke="10";
             ctx.fill();
             ctx.closePath();
             /**************************************************/
             /*** If count of total bricks decreases to 30
                  Increase the speed of ball ***/
                  if(count<=(rem-rem/7) && speedup1==0){
                     if(dy<0)
                       dy-=0.5;
                     else
                       dy+=0.5;
                     if(dx<0)
                      dx-=0.5;
                     else
                       dx+=0.5;
                     paddleWidth+=2;
                     speedup1=1;
                  }
             /*** If count of total bricks decreases to 20
                  Increase the speed of ball and increase paddleWidth***/
                  if(count<=(rem-2*rem/7) && speedup2==0){
                     if(dy<0)
                       dy-=1;
                     else
                       dy+=1;
                     if(dx<0)
                       dx-=1;
                     else
                       dx+=1;
 
 
                     paddleWidth+=3;
                     speedup2=1;
                  }
             /*** If count of total bricks decreases to 10
                  Increase the speed of ball ******/
                  if(count<=(rem-3*rem/7) && speedup3==0){
                     if(dy<0)
                       dy-=1;
                     else
                       dy+=1;
                     if(dx<0)
                       dx-=1;
                     else
                       dx+=1;
 
                     paddleWidth+=4;
                     speedup3=1;
                  }
 
                  if(count<=(rem-4*rem/7) && speedup4==0){
 
                    if(dy<0)
                      dy-=1;
                    else
                      dy+=1;
                    if(dx<0)
                      dx-=1;
                    else
                      dx+=1;
                     paddleWidth+=5;
                     speedup4=1;
 
                  }
 
                  if(count<=(rem-5*rem/7) && speedup5==0){
 
                     if(dy<0)
                       dy-=1;
                     else
                      dy+=1;
                     if(dx<0)
                       dx-=1;
                     else
                      dx+=1;
                     paddleWidth+=6;
                     speedup5=1;
 
                  }
 
                  if(count<=(rem-6*rem/7) && speedup6==0){
 
                    if(dy<0)
                      dy-=1;
                    else
                      dy+=1;
                    if(dx<0)
                      dx-=1;
                    else
                      dx+=1;
                     paddleWidth+=7;
                     speedup6=1;
 
                  }
 
 
 
                  if(count<=20){
 
                     alert("You WON!!! Good job champ!");
                       saveGame();
                     document.location.reload();
                  }
          }
 
      }
 
    }
 
  }
 
}
 
function drawScore(){
 
   ctx.font="18px Arial";
   ctx.fillStyle="#fff";
   ctx.fillText("score: "+score,40,20);
//   console.log(parseInt(brickRowCount)*parseInt(brickColumnCount)-parseInt(count));
 
}
 
function drawLives() {
    ctx.font = "18px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText("ARIMA'S GAME                lives: "+lives, canvas.width-310, 20);
}
 
function draw(){
 
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
 
    collisionDetection();
 
 
    if(y+dy<ballRadius)
      dy=-dy;
    else if(y+dy>canvas.height-ballRadius){
 
       if(x>=paddleX && x<=paddleX+paddleWidth){
 
          var snd=new Audio("./music/paddleBall2.wav");
          snd.play();
          dy=-dy;
 
       }
       else{
          lives--;
          if(!lives) {
            alert("Sorry, you've lost...\nTry again! :-)");
               saveGame();
           document.location.reload();
 
          }
          else{
            x=canvas.width/2;
            y = canvas.height-30;
            paddleWidth=80;
            rem=count;
            paddleX=(canvas.width-paddleWidth)/2;
           }
      }
 
 
    }
    else
      y+=dy;
 
    if(x+dx<ballRadius || x+dx>canvas.width-ballRadius)
       dx=-dx;
    else
       x+=dx;
 
    if(rightPressed && paddleX<canvas.width-paddleWidth)
       paddleX+=7;
    else if(leftPressed && paddleX>0)
       paddleX-=7;
 
 
 
}
 
function keyDownHandler(e){
 
  if(e.keyCode==39)
    rightPressed=true;
  else if(e.keyCode==37)
    leftPressed=true;
 
 
}
 
function keyUpHandler(e){
 
   if(e.keyCode==39)
    rightPressed=false;
   if(e.keyCode==37)
     leftPressed=false;
 
}
 
function mouseMoveHandler(e){
 
  var relativeX=e.clientX-canvas.offsetLeft;
 
  if(relativeX>0 && relativeX<canvas.width){
 
     if((relativeX-paddleWidth/2>=0) && (relativeX-paddleWidth/2<=(canvas.width-paddleWidth)))
        paddleX=relativeX-paddleWidth/2;
 
  }
 
 
}
 //Saves current gamestate in local storage
		function saveGame()
		{
			var date = new Date();
			date = date.toUTCString();
			var userInfo = {
				Name:userName,
				userScore:score,
				Date:date
			}
		  //declare variables for JSON object 
			var myJSON;
		  // checks to see if browser supports localStorage
			if (typeof(Storage) !== "undefined") {
			// convert myUserObj to JSON and store it as key/value pair
			myJSON = JSON.stringify(userInfo);
			//use the property UserName of myUserObj as key for storage so that a user can be queried
			localStorage.setItem(userInfo.Name, myJSON);
			
		  }
		  else {
			  alert("Sorry! This browser does not support web storage");
			}
		}
	//Searches local storage for a username.  restores the gameboard if the username exists
  function loadGame()
  {
    userName = prompt("Enter your user name: ");
    var gameInfo = localStorage.getItem(userName);
    myUserObj =JSON.parse(gameInfo);
    
    if(gameInfo!= null ){
     document.getElementById('User').innerHTML= myUserObj.Name;
      //ystart = myUserObj.ycoordinate;
    //  xstart = myUserObj.xcoordinate;
      document.getElementById('Score').innerHTML= myUserObj.userScore;
     document.getElementById('Date').innerHTML = myUserObj.Date;
      main();
        createFood();
    }else{
      alert("Sorry the User Name entered was not found");
    }
  }
function displayHighscores(){
      //used for JSON object returned from local storage
      var myJSONhighscoreObject;
//highscores();
      //read in top scores values from local storage and parse them to ints
      myJSONhighscoreObject = localStorage.getItem('highScore3');
      highScore3 = JSON.parse(myJSONhighscoreObject);

  myJSONhighscoreObject = localStorage.getItem('highScore2');
      highScore2 = JSON.parse(myJSONhighscoreObject);

  myJSONhighscoreObject = localStorage.getItem('highScore1');
      highScore1 = JSON.parse(myJSONhighscoreObject);

     // var canvas = document.getElementById('gameCanvas');
     // var context = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = "15px serif";
ctx.fillStyle="white";
  ctx.fillText("User Name", 15, 65);
  ctx.fillText("Score", 160, 65);
  ctx.fillText("Date", 300, 65);

  ctx.fillText(highScore1.name,15,115);
      ctx.fillText(highScore2.name,15,165);
  ctx.fillText(highScore3.name,15,215);

      ctx.fillText(JSON.stringify(highScore1.score),160,115);
      ctx.fillText(JSON.stringify(highScore2.score),160,165);
  ctx.fillText(JSON.stringify(highScore3.score),160,215);

  ctx.fillText(highScore1.Date,300,115);
      ctx.fillText(highScore2.Date,300,165);
  ctx.fillText(highScore3.Date,300,215);

    }
  function highscores(){
    var date = new Date();
    date = date.toUTCString();
    saveGame();
    if(!localStorage.highScore1){
    var highScore1 = {
    name : userName,
    score : 0,
    Date : date
    };
    var highScore2 = {
    name :" ",
    score : 0,
    Date : " "
    };
    var highScore3 = {
    name :" ",
    score : 0,
    Date : " "
    };

    var newScore = score;
    highScore1.score = newScore;
     // convert myUserObj to JSON and store it as key/value pair
     myJSONhighscoreObject = JSON.stringify(highScore1);
     localStorage.setItem('highScore1', myJSONhighscoreObject);
     myJSONhighscoreObject = JSON.stringify(highScore2);
     localStorage.setItem('highScore2', myJSONhighscoreObject);
     myJSONhighscoreObject = JSON.stringify(highScore3);
     localStorage.setItem('highScore3', myJSONhighscoreObject);

    } else {
    var date = new Date();
    date = date.toUTCString();
    var newScore = score;
    //read in top scores values from local storage and parse them to ints
    myJSONhighscoreObject = localStorage.getItem('highScore1');
    highScore1= JSON.parse(myJSONhighscoreObject);

    myJSONhighscoreObject = localStorage.getItem('highScore2');
    highScore2= JSON.parse(myJSONhighscoreObject);

    myJSONhighscoreObject = localStorage.getItem('highScore3');
    highScore3= JSON.parse(myJSONhighscoreObject);

    if(newScore >highScore1.score){
      highScore3.score = highScore2.score;
      highScore3.name = highScore2.name;
      highScore3.Date = highScore2.Date;

      highScore2.score = highScore1.score;
      highScore2.name = highScore1.name;
      highScore2.Date = highScore1.Date;

      highScore1.score = newScore;
      highScore1.Date = date;
      highScore1.name = userName;

      myJSONhighscoreObject = JSON.stringify(highScore1);
      localStorage.setItem('highScore1', myJSONhighscoreObject);

      myJSONhighscoreObject = JSON.stringify(highScore2);
      localStorage.setItem('highScore2', myJSONhighscoreObject);

      myJSONhighscoreObject = JSON.stringify(highScore3);
      localStorage.setItem('highScore3', myJSONhighscoreObject);
      }
    else if (newScore > highScore2.score){
      highScore3.score = highScore2.score;
      highScore3.name = highScore2.name;
      highScore3.Date = highScore2.Date;

      highScore2.score = newScore;
      highScore2.Date = date;
      highScore2.name = userName;

      myJSONhighscoreObject = JSON.stringify(highScore3);
      localStorage.setItem('highScore3', myJSONhighscoreObject);

      myJSONhighscoreObject = JSON.stringify(highScore2);
      localStorage.setItem('highScore2', myJSONhighscoreObject);
    }
    else if (newScore > highScore3.score){
      highScore3.score = newScore;
      highScore3.Date = date;
      highScore3.name = userName;
      myJSONhighscoreObject = JSON.stringify(highScore3);
      localStorage.setItem('highScore3', myJSONhighscoreObject);
    }
    }
  }
 //Shows the game instructions to the user
		function showInst() {
		    userName = prompt("Enter your user name: ");
			
             ctx.clearRect(0,0,canvas.width,canvas.height);
			ctx.font = "50px serif";
			ctx.fillText("GamePlay",140,140);
			ctx.font = "20px serif";
			ctx.fillStyle = "white";
			ctx.fillText("The player must smash a wall of bricks by deflecting ",15,180);
            ctx.fillText( "a bouncing ball with a paddle.",15,210  );
			ctx.fillText("The paddle may move horizontally and is controlled",15,240);
            ctx.fillText(  "with  the computer's mouse.",15,270 )
		
		}


  window.onload = showInst();
//waitting for event
document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);
document.addEventListener("mousemove", mouseMoveHandler, false);
 
 //start game
//setInterval(draw,20);