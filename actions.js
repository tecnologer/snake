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
        speed: 1
    };
    //position for the square
    var square = {
        cPosX: 0,
        cPosY: 0
    };

    var ctx = undefined;
    var canvas = undefined;
    var _t_ = undefined;
    var width = 450;
    var height = 250;
    var _tTurnSouth_ = undefined;
    var _counterSouth_ = 0;
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
            canvas.width = width;
            canvas.height = height;
            canvas.style.width = canvas.width + "px";
            canvas.style.height = canvas.height + "px";
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
        clearInterval(_t_);

        switch (keyCode) {
            case 38:
                snake.goingTo = "N";
                break;
            case 40:
                snake.goingTo = "S";
                turnSouth();
                break;
            case 37:
                snake.goingTo = "W";
                break;
            case 39:
                snake.goingTo = "E";
                break;
        }
    }

    function buildSnake() {
        for (var i = 1; i <= snake.length; i++) {
            snake.body.push({
                x: snake.size * i,
                y: 0
            });
        }

        drawSnake();
    }

    function drawSnake() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < snake.body.length; i++) {
            switch (snake.goingTo) {
                //North
                case "N":
                    snake.body[i].y -= snake.size;
                    break;
                    //South
                case "S":
                    snake.body[i].y += snake.size;
                    break;
                    //East
                case "E":
                    snake.body[i].x += snake.size;
                    break;
                    //West
                case "W":
                    snake.body[i].x -= snake.size;
                    break;

            }

            // snake.body[i].x += snake.posX;
            // snake.body[i].y += snake.posY;

            ctx.fillRect(snake.body[i].x, snake.body[i].y, snake.size, snake.size);
        }
    }

    function moveSnake() {
        _t_ = setInterval(function() {
            drawSnake();
            ctx.fillRect(square.cPosX, square.cPosY, snake.size, snake.size);
        }, 1000 / snake.speed);
    }

    function turnSouth() {
        _counterSouth_ = snake.body.length-1;
        var firstMove = true;
        _tTurnSouth_ = setInterval(function() {
            snake.body[_counterSouth_].y += snake.size;
            console.log(snake.body[_counterSouth_]);
            for(var a=snake.body.length-2;a>=0;a--){
                snake.body[a].x += snake.size;
            }

            drawSnake();
            _counterSouth_--;
            if (_counterSouth_ < 0) {
                clearInterval(_tTurnSouth_);
                moveSnake();
            }
        }, 1000 / snake.speed);
    };

    constructor();
    document.addEventListener("keydown", setDirecction);
})();