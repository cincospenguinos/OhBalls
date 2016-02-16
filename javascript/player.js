function Player(xPos, yPos){
    this.vel = 0;
    this.direction = 0; // NESW ---> 0, 1, 2, 3
    this.xPos = xPos;
    this.yPos = yPos;
    
    /* Moves the player in the direction he/she is currently facing */
    this.move = function(xSize, ySize){
		switch(this.direction){
			case 0:
			  this.yPos -= this.vel;
			  //console.log("Moving up");
			  break;
			case 1:
			  this.xPos += this.vel;
			  //console.log("Moving right");
			  break;
			case 2:
			  this.yPos += this.vel;
			  //console.log("Moving down");
			  break;
			case 3:
			  this.xPos -= this.vel;
			  //console.log("Moving left");
			  break;
		}

		// Check the edges
		if(this.xPos + 30 > xSize){// TODO: sizes?
			this.xPos = 0;
		} else if (this.xPos < 0){
			this.xPos = xSize - 30;
		}

		if(this.yPos + 30 > ySize){// TODO: sizes?
			this.yPos = 0;
		} else if (this.yPos < 0){
			this.yPos = ySize - 30;
		}

		//console.log('( ' + this.xPos + ', ' + this.yPos + ')');
    };

    /* Changes the player's direction given the key code passed. */
    this.changeDirection = function(keyCode){
		if(keyCode >= 37 && keyCode <= 40){
			var providedDirection = (keyCode + 2) % 4;

			if(providedDirection == this.direction){
				this.vel += 0.75;
				//console.log("Same directions; added to velocity");
			} else if (providedDirection % 2 == this.direction % 2){
				this.vel -= 0.75;

				if(this.vel < 0){
					this.vel = -this.vel;
					this.direction += 2;
					this.direction %= 4;
				}
			} else {
				//console.log("Different directions; change directions");
				this.direction = providedDirection;
			}
		}
    }
}
