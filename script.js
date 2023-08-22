//board
var block_size =10;
var rows=30;
var cols=30;
var board;
var context;
var score=0;

//snake head
var snakeX=block_size*0;
var snakeY=block_size*0;

var velocityX=0;
var velocityY=0;

var snakebody = [];
//snake food
var foodX;
var foodY;

var gameOver=false;




window.onload= loading;

function loading(){
    board=document.getElementById('board');
    board.height = rows*block_size;
    board.width = cols*block_size;
    context=board.getContext('2d');
    placeFood();
    document.addEventListener('keyup',changeDirection);
    //update();
    setInterval(update, 100);
}

function update(){

    if(gameOver){
        return;
    }

    context.fillStyle='black';
    context.fillRect(0,0,board.height,board.width);
   
    context.fillStyle='white';
    context.fillRect(foodX,foodY,block_size,block_size);

    if(snakeX == foodX && snakeY== foodY){
        snakebody.push([foodX,foodY]);
        score++;
        document.getElementById('score').innerHTML= "Current Score: "+score;
        placeFood();
    }

    for(let i = snakebody.length-1;i>0;i--){
        snakebody[i] = snakebody[i-1];
    }

    if(snakebody.length){
        snakebody[0] = [snakeX,snakeY];
    }
    
    context.fillStyle='rgb(0, 255, 0)';
    snakeX += velocityX*block_size;
    snakeY += velocityY*block_size;
    context.fillRect(snakeX,snakeY,block_size,block_size);
    let x=20;
    for(let i=0;i<snakebody.length;i++){
        context.fillStyle='rgb(0,210,0)';
        context.fillRect(snakebody[i][0],snakebody[i][1],block_size,block_size);
        context.style='border: solid 2px white';
    }

    if(snakeX < 0 || snakeX >= cols*block_size || snakeY < 0 || snakeY >= rows*block_size){
        gameOver=true;
        document.getElementById("final_score").innerHTML="your score: " +score;
        document.getElementById("game-analysis").style.visibility="visible";
        
    }
    
    for(let i=0;i<snakebody.length;i++){
        if(snakebody[i][0]==snakeX && snakebody[i][1]==snakeY){
            gameOver=true;
            document.getElementById("final_score").innerHTML="your score: " +score;
            document.getElementById("game-analysis").style.visibility="visible";
            
        }   
    }
}

function changeDirection(e){
    console.log(e);
    if((e.code == 'ArrowUp' && velocityY != 1) || (e == 38 && velocityY != 1)){
        velocityX = 0;
        velocityY = -1;
    }
    else if((e.code == 'ArrowDown' && velocityY != -1) || (e == 40 && velocityY != -1)){
        velocityX = 0;
        velocityY = 1;
    }

    else if((e.code == 'ArrowLeft' && velocityX != 1) || (e==39 && velocityX != 1)){
        velocityX = -1;
        velocityY = 0;
    }
    
    else if((e.code == 'ArrowRight' && velocityX != -1) || (e == 37 && velocityX != -1)){
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood(){
    foodX= Math.floor(Math.random()*cols)*block_size;
    foodY= Math.floor(Math.random()*rows)*block_size;
}

