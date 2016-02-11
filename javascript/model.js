function Player(xPos, yPos){
    this.vel = 0;
    this.direction = 0; // NESW ---> 0, 1, 2, 3
    this.xPos = xPos;
    this.yPos = yPos;
    
    /* Moves the player in the direction he/she is currently facing */
    this.move = function(){
	switch(this.direction){
	    case 0:
	      this.yPos -= this.vel;
	      console.log("Moving up");
	      break;
	    case 1:
	      this.xPos += this.vel;
	      console.log("Moving right");
	      break;
	    case 2:
	      this.yPos += this.vel;
	      console.log("Moving down");
	      break;
	    case 3:
	      this.xPos -= this.vel;
	      console.log("Moving left");
	      break;
	}
    };

    /* Changes the player's direction given the key code passed. */
    this.changeDirection = function(keyCode){
	if(keyCode >= 37 && keyCode <= 40){
	    var providedDirection = (keyCode + 2) % 4;

	    // TODO: Slowing down?
	    if(providedDirection == this.direction){
		this.vel += 0.5;
		console.log("Same directions; added to velocity");
	    } else {
		console.log("Different directions; change directions");
		this.direction = providedDirection;
	    }
	}
    };
};
