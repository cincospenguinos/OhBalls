function Player(xPos, yPos){
    this.vel = 0;
    this.direction = 0; // NESW ---> 0, 1, 2, 3
    this.xPos = xPos;
    this.yPos = yPos;
    
    /* Moves the player in the direction he/she is currently facing */
    this.move = function(){
	switch(this.direction){
	    case 0:
	      this.xPos -= this.vel;
	      break;
	    case 1:
	      this.yPos -= this.vel;
	      break;
	    case 2:
	      this.xPos += this.vel;
	      break;
	    case 3:
	      this.yPos += this.vel;
	      break;
	}
    };

    /* Changes the player's direction given the key code passed. */
    this.changeDirection = function(keyCode){
	switch(keyCode){
	    case 37:
	      this.direction = 3;
	      break;
	    case 38:
	      this.direction = 0;
	      break;
	    case 39:
	      this.direction = 1;
	      break;
	    case 40:
	      this.direction = 2;
	      break;
	}

	console.log("Player direction is " + this.direction.toString());
    };
};
