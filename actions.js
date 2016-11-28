(function() {
    "use strict"

    var body = document.getElementsByTagName("body");

    //position of snake
    var snake = {
        body: [],
        posX: 0,
        posY: 0,
        goingTo: "E",
        length: 3,
        size: 10,
        speed: 4
    };
    //position for the square
    var square = {
        cPosX: 0,
        cPosY: 0
    };

    var score = 0;
    var ctx = undefined;
    var canvas = undefined;
    var _t_ = undefined;
    var width = 450;
    var height = 250;
    var _tTurnSouth_ = undefined;
    var _counterSouth_ = 0;
    var _counterEast_ = 0;
    var _counterWest_ = 0;

    /**
     * @author [rey]
     * @date        [11/27/2016]
     * @description [Initialize elements ]
     * @return      {[type]}     [description]
     */
    function constructor() {
        canvas = document.getElementById('snake');

        if (canvas && canvas.getContext) {
            //set size canvas
            if(isMobile()){
                canvas.width = document.body.clientWidth;
                canvas.height = document.body.clientHeight;
                snake.size = 30;
            }
            else{
                canvas.width;
                canvas.height = height;
            }

            canvas.style.width = canvas.width + "px";
            canvas.style.height = canvas.height + "px";

            console.log(document.body.clientWidth);
            //get context
            ctx = canvas.getContext('2d');
            //draw snake
            //ctx.fillRect(snake.posX, snake.posY, snake.size * snake.length, snake.size);
            buildSnake();
            //draw first square
            drawSquare();
            //move snake
            moveSnake();
        }
    }
    /**
     * @author [rey]
     * @date        [11/27/2016]
     * @description [drawSquare  description]
     * @return      {[type]}     [description]
     */
    function drawSquare() {
        square.cPosX = Math.round(Math.random() * ((canvas.width - snake.size) - 0 + 1) + 0);
        square.cPosY = Math.round(Math.random() * ((canvas.height - snake.size) - 0 + 1) + 0);

        while (isNotValidPosition(square.cPosX, square.cPosY)) {
            square.cPosX = Math.round(Math.random() * ((canvas.width - snake.size) - 0 + 1) + 0);
            square.cPosY = Math.round(Math.random() * ((canvas.height - snake.size) - 0 + 1) + 0);
        }

        ctx.fillRect(square.cPosX, square.cPosY, snake.size, snake.size);
    }
    /**
     * @author [rey]
     * @date        [11/27/2016]
     * @description [isNotValidPosition description]
     * @param       {[type]}            nPosX        [description]
     * @param       {[type]}            nPosY        [description]
     * @return      {Boolean}                        [description]
     */
    function isNotValidPosition(nPosX, nPosY) {
        var isNotValid = nPosX % snake.size != 0 || nPosY % snake.size != 0 || nPosX == nPosY;

        if (nPosX % snake.size == 0 && nPosY % snake.size == 0 && nPosX !== nPosY) {
            switch (snake.goingTo) {
                //North
                case "N":
                    isNotValid = (nPosY > snake.posX && nPosY < (snake.size * snake.length)) || (nPosY > snake.posX && nPosY < (snake.size * snake.length))
                    break;
                    //South
                case "S":
                    isNotValid = (nPosY > snake.posX && nPosY < (snake.size * snake.length)) || (nPosY > snake.posX && nPosY < (snake.size * snake.length))
                    break;
                    //East
                case "E":
                    isNotValid = (nPosX > snake.posX && nPosX < (snake.size * snake.length)) || (nPosX > snake.posX && nPosX < (snake.size * snake.length))
                    break;
                    //West
                case "W":
                    isNotValid = (nPosX < snake.posX && nPosX > (snake.size * snake.length)) || (nPosX < snake.posX && nPosX > (snake.size * snake.length))
                    break;

            }
        }

        return isNotValid;
    }
    /**
     * @author [rey]
     * @date        [11/27/2016]
     * @description [setDirecction description]
     * @param       {[type]}       e            [description]
     */
    function setDirecction(e) {
        var keyCode = e.keyCode || e.which;

        if((keyCode === 38 || this.id == "btnUp") && snake.goingTo!=="S")
            snake.goingTo = "N";
        else if((keyCode === 40 || this.id == "btnDown") && snake.goingTo!=="N")
            snake.goingTo = "S";
        else if((keyCode === 37 || this.id == "btnLeft") && snake.goingTo!=="E")
            snake.goingTo = "W";
        else if((keyCode === 39 || this.id == "btnRight") && snake.goingTo!=="W")
            snake.goingTo = "E";
    }

    function buildSnake() {
        for (var i = 1; i <= snake.length; i++) {
            snake.body.push({
                x: snake.size * i,
                y: 0
            });

            ctx.fillRect(snake.size * i, 0, snake.size, snake.size);
        }
    }

    function drawSnake(pIsDefined) {
        var nextMove = {x: snake.body[snake.body.length-1].x, y: snake.body[snake.body.length-1].y};

        switch (snake.goingTo) {
            //North
            case "N":
                nextMove.y -= snake.size;
                break;
                //South
            case "S":
                nextMove.y += snake.size;
                break;
                //East
            case "E":
                nextMove.x += snake.size;
                break;
                //West
            case "W":
                nextMove.x -= snake.size;
                break;
        }

        if(isDead(nextMove)){
            clearInterval(_t_);
        }
        else{
            ctx.clearRect(snake.body[0].x, snake.body[0].y, snake.size, snake.size);
            snake.body.splice(0,1);
            snake.body.push(nextMove);
            ctx.fillRect(nextMove.x, nextMove.y, snake.size, snake.size);
            foundSquare(nextMove);
        }
    }
    function moveSnake() {
        _t_ = setInterval(drawSnake, 1000 / snake.speed);
    }
    /**
     * @author [carlos]
     * @date        [11/28/2016]
     * @description [foundSquare description]
     * @param       {[type]}     snake_head   [description]
     * @return      {[type]}                  [description]
     */
    function foundSquare(snake_head){
       if(snake_head.x == square.cPosX && snake_head.y == square.cPosY){
            snake.body.push({x: square.cPosX, y: square.cPosY});
            drawSquare();
            score++;

            document.getElementById("lblScore").innerHTML = score;
       }
    }

    function isDead(snake_head){
        if(snake_head.x < 0 || (snake_head.x + snake.size)>canvas.width || snake_head.y<0 || (snake_head.y + snake.size)> canvas.height){
            return true;
        }
        else{
            for(var i=0;i<snake.body.length-2;i++)
                if(snake.body[i].x === snake_head.x && snake.body[i].y===snake_head.y)
                    return true;
        }

        return false;
    }

    function newGame(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snake.goingTo = "E";
        snake.body=[];
        clearInterval(_t_);
        buildSnake();
        drawSquare();
        moveSnake();
        
        score = 0;

        document.getElementById("lblScore").innerHTML = score;
    }

    function isMobile(){
        return navigator.userAgent.match(/Android/i)
         || navigator.userAgent.match(/webOS/i)
         || navigator.userAgent.match(/iPhone/i)
         || navigator.userAgent.match(/iPad/i)
         || navigator.userAgent.match(/iPod/i)
         || navigator.userAgent.match(/BlackBerry/i)
         || navigator.userAgent.match(/Windows Phone/i);
    }

    constructor();
    document.addEventListener("keydown", setDirecction);
    document.getElementById("btnNewGame").addEventListener("click",newGame);
    document.getElementById("btnUp").addEventListener("click",setDirecction);
    document.getElementById("btnDown").addEventListener("click",setDirecction);
    document.getElementById("btnLeft").addEventListener("click",setDirecction);
    document.getElementById("btnRight").addEventListener("click",setDirecction);
})();