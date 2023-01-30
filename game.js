const canvas = document.querySelector('#game');
const botonUp= document.querySelector('#up');
const botonDown= document.querySelector('#down');
const botonLeft= document.querySelector('#left');
const botonRight= document.querySelector('#right');
const labelvidas = document.querySelector('#vidas');
const spantime = document.querySelector('#tiempo');
const spanrecord = document.querySelector('#record');
const spanscore = document.querySelector('#score');
const game = canvas.getContext('2d');
let canvasSize;
let elementsSize;
let hubocolision=false
let level = 0;
let lives=3;

let playerPosition={
x:undefined,
y:undefined,
};
let giftposition={
    x:undefined,
    y:undefined
}
let positionStart={
    x:undefined,
    y:undefined
}
let bombas=[]
let vallas=[]
let bombasVacio=[]
let SoloPrimeraVez=1
let map=[];
let mapRows = [];
let mapRowsCols =[];
let timeplayed=0;
let id;
let recordTime;


window.addEventListener('load',setResice);//se ejecuta al inicar
window.addEventListener('resize',setResice); //ejecuta la funcion cada que se cambia la pantalla

document.addEventListener('keydown',movewithboard)
botonUp.addEventListener('click',moveUp)
botonDown.addEventListener('click',moveDown)
botonLeft.addEventListener('click',moveLeft)
botonRight.addEventListener('click',moveRight)

function movewithboard(event)
{
    if(event.code=="ArrowUp")
         moveUp()
    if(event.code=="ArrowDown")
        moveDown()
    if(event.code=="ArrowLeft")
        moveLeft()
    if(event.code=="ArrowRight")
        moveRight()
}

function moveUp(){
    
    if(playerPosition.y>elementsSize || playerPosition.y==undefined)
    {
        console.log(playerPosition.y+ "      UPSSSSSS      "+elementsSize)
        playerPosition.y -= elementsSize;
        SoloPrimeraVez=0;
        startGame();
    }
}
function moveDown(){
    if(playerPosition.y<(canvasSize-elementsSize) || playerPosition.y==undefined)
    {
        console.log(playerPosition.y+ "      UPSSSSSS      "+elementsSize)
        playerPosition.y += elementsSize;
        SoloPrimeraVez=0;
        startGame();
    }
}
function moveLeft(){
       if(playerPosition.x >  + (elementsSize/3 + elementsSize) || playerPosition.x==undefined)
    {
        console.log(playerPosition.y+ "      UPSSSSSS      "+elementsSize)
        playerPosition.x -= elementsSize;
        SoloPrimeraVez=0;
        startGame();
    }
}
function moveRight(){

    if((playerPosition.x < (canvasSize - elementsSize/3)) || playerPosition.x==undefined)
    {
        console.log(playerPosition.y+ "      UPSSSSSS      "+elementsSize)
        playerPosition.x += elementsSize;
        SoloPrimeraVez=0;
        startGame();
    }
}

function IniciarYLimpiarVariables()
{

    game.clearRect(0,0,canvasSize,canvasSize)
    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end'

    if(!localStorage.getItem('RecordActual'))
    {
        localStorage.setItem('RecordActual',0)
    }

    //limpiar variables
    while(bombas.length) {
        bombas.pop();
    }
    giftposition.x = 0;
    giftposition.y=0;  

     map = maps[level];
   if(!map)
     {
          WinGame();
     }
    mapRows = map.trim().split('\n');
    mapRowsCols = mapRows.map(row => row.trim().split(''))

}

function startGame()
{

    IniciarYLimpiarVariables();
    spanrecord.innerHTML=localStorage.getItem('RecordActual')
    
    mapRowsCols.forEach((row,rowIndex) => {
        row.forEach((col,colindex) =>{
            let PosicionX = elementsSize * (colindex+ 1) + (elementsSize/3.5);
            let PosicionY = elementsSize * (rowIndex+1);

            console.log(col+"  ----- "+playerPosition.x+"  -----   ")
            if(col == 'O' && !playerPosition.x) //&& !playerPosition.x//&& !playerPosition.x
            {
                console.log("entra en IIIIIIIIIIIII")
                playerPosition.x =PosicionX;
                playerPosition.y=PosicionY; 
            }
            if(col == 'I')
            {
                giftposition.x = PosicionX;
                giftposition.y=PosicionY;    
            }
            if(col == 'N' || col == 'V')
            {
                bombas.push(
                    {
                        x:PosicionX, 
                        y:PosicionY
                    }
                )
            }
            // if(col == 'V')
            // {
            //     vallas.push(
            //         {
            //             x:PosicionX, 
            //             y:PosicionY
            //         }
            //     )
            // }
    
            
            game.fillText(emojis[col],PosicionX,PosicionY);
        });
    });
   
    moveplayer();
    PaintHearts();
    


}

function levelWin()
{
    console.log("Has ganado");
    level++;
    giftposition.x = undefined;
    giftposition.y=undefined;  
    playerPosition.x =undefined;
    playerPosition.y=undefined; 
    startGame();
}
function WinGame()
{
    level=0
    let recordActual= localStorage.getItem('RecordActual');
    recordTime=timeplayed;
    if(recordActual>recordTime || recordActual==0)
    {
        localStorage.setItem('RecordActual',recordTime)
        console.log("tienes un nuevo recod")
    }


   timeplayed=0

   SoloPrimeraVez=1
   //IniciarYLimpiarVariables();
    startGame();
    console.log("HAS GANADO, SE REINCIO EL JUEGO")
}
function lostgame()
{
    lives--;
    if(lives<=0){
        lives=3;
        level=0;
        //for(let i=1;i<=id;i++)
        //clearInterval(i)
        recordTime=timeplayed;
        //console.log("Tu tiempo fue de "+recordTime+" SEGUNDOS")
        timeplayed=0;
        SoloPrimeraVez=1
        TiempoJugando()
    }
    playerPosition.x =positionStart.x;
    playerPosition.y=positionStart.y;
    startGame()
}
function PaintHearts()
{
    labelvidas.innerHTML = '';
    for(let i=0;i<lives;i++)
        labelvidas.innerHTML += emojis['HEART'] 
}
function TiempoJugando(){
    if(timeplayed==0 && SoloPrimeraVez==1)
    {
        for(let i=1;i<=id;i++)
        clearInterval(i)
        console.log("Tu tiempo fue de "+recordTime+" SEGUNDOS")
    }
    else
    timeplayed=timeplayed+100;


    spantime.innerHTML=timeplayed;
}
function moveplayer(){

    if( SoloPrimeraVez==0)
    id=setInterval(TiempoJugando, 100);
 


    let colisionY = playerPosition.y.toFixed(2) == giftposition.y.toFixed(2)
    let colisionX = playerPosition.x.toFixed(2) == giftposition.x.toFixed(2)
    let IsColitionWithGift = colisionY && colisionX

    if(IsColitionWithGift)
    {       
        levelWin();
        IsColitionWithGift=false;     
    }
    
    hubocolision= bombas.find(bomba =>{
        let ColisionenX = bomba.x.toFixed(0) == playerPosition.x.toFixed(0)
        let ColisionenY=bomba.y.toFixed(0) == playerPosition.y.toFixed(0)
        return ColisionenX && ColisionenY;
    })
    if(hubocolision){
        hubocolision=false;
        lostgame();
    }

        game.fillText(emojis['PLAYER'],playerPosition.x,playerPosition.y);
    
    
}

function setResice(){
    canvasSize= Math.round(window.innerWidth *0.6);
    canvas.setAttribute('width',canvasSize);
    canvas.setAttribute('height',canvasSize);
    elementsSize = Math.round(canvasSize / 10.3); 

    playerPosition.x =undefined;
    playerPosition.y=undefined; 
    startGame()
}