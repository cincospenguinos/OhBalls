function Ball(xPos, yPos){
    this.xPos = xPos;
    this.yPos = yPos;
    this.xVel = Math.random() * 10 - 5;
    this.yVel = Math.random() * 10 - 5;

    this.move = function(xSize, ySize){
        this.xPos += this.xVel;
        this.yPos += this.yVel;

        // Check the edges
        if(this.xPos + 50 > xSize){ // TODO: sizes?
            this.xPos = 0;
        } else if (this.xPos < 0){
            this.xPos = xSize;
        }

        if(this.yPos + 50 > ySize){ // TODO: sizes?
            this.yPos = 0;
        } else if (this.yPos < 0) {
            this.yPos = ySize;
        }
    };
}
