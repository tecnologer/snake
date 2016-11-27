(function() {
    "use strict"
    
    var body = document.getElementsByTagName("body");
    body.onKeyDown = setDirecction;
    //position of snake
    var snake = {
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

    /**
     * @author [rey]
     * @date        [11/27/2016]
     * @description [Initialize elements ]
     * @return      {[type]}     [description]
     */
    function constructor() {
        canvas = document.getElementById('snake');

        if (canvas && canvas.getContext) {
            ctx = canvas.getContext('2d');
            //draw snake
            ctx.fillRect(snake.posX, snake.posY, snake.size * snake.length, snake.size);
            //draw first square
            drawSquare();

            _t_ = setInterval(function() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                switch (snake.goingTo) {
                    //North
                    case "N":
                        snake.posY -= snake.size;
                        break;
                        //South
                    case "S":
                        snake.posY += snake.size;
                        break;
                        //East
                    case "E":
                        snake.posX += snake.size;
                        break;
                        //West
                    case "W":
                        snake.posX -= snake.size;
                        break;

                }
                if ((snake.posY + snake.size) >= canvas.height || (snake.posY > 0 && (snake.posY - snake.size) < canvas.height) || (snake.posX + (snake.size * snake.length)) >= canvas.width || (snake.posX > 0 && (snake.posX - (snake.size * snake.length))) < canvas.width)
                    clearInterval(_t_);

                ctx.fillRect(snake.posX, snake.posY, snake.size * snake.length, snake.size);
                ctx.fillRect(square.cPosX, square.cPosY, snake.size, snake.size);
            }, 1000 / snake.speed);
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
        var isNotValid = nPosX % snake.size != 0 || nPosY % snake.size != 0;

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

        switch (keyCode) {
            case 38:
                snake.goingTo = "N";
                break;
            case 40:
                snake.goingTo = "S";
                break;
            case 37:
                snake.goingTo = "W";
                break;
            case 39:
                snake.goingTo = "E";
                break;
        }
    }

    constructor();
})();