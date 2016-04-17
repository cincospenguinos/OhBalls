function Ball(xPos, yPos){
    this.xPos = xPos;
    this.yPos = yPos;
    this.xVel = Math.random() * 10 - 5;
    this.yVel = Math.random() * 10 - 5;

    this.move = function(xSize, ySize){
        this.xPos += this.xVel;
        this.yPos += this.yVel;

        // Check the edges
        if(this.xPos + 50 > xSize){
            //this.xPos = 0;
            this.xVel = -this.xVel;
        } else if (this.xPos < 0){
            //this.xPos = xSize - 50;
            this.xVel = -this.xVel;
        }

        if(this.yPos + 50 > ySize){
            //this.yPos = 0;
            this.yVel = -this.yVel;
        } else if (this.yPos < 0){
            //this.yPos = ySize - 50;
            this.yVel = -this.yVel;
        }
    }
}