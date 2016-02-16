var player; // The "model" player - holds game logic information
var balls = []; // The "model" balls - holds the game logic information

var playerElement; // The "view" player - the element that the player belongs to
var ballElements = []; // The "view" balls - the elements that represent each of the balls

var animationID; // The animation ID
var ticks = 0;
var seconds = 0;

/**
 * Returns true if the two balls collide.
 *
 * @param ball1
 * @param ball2
 * @param diameter1
 * @param diameter2
 * @returns {boolean}
 */
function ballsCollide(ball1, ball2, diameter1, diameter2){
	var xM1 = ball1.xPos + diameter1 / 2;
	var yM1 = ball1.yPos + diameter1 / 2;
	var xM2 = ball2.xPos + diameter2 / 2;
	var yM2 = ball2.yPos + diameter2 / 2;

	var deltaX = Math.abs(xM2 - xM1);
	var deltaY = Math.abs(yM2 - yM1);

	var distance = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY));

	return distance < (diameter1 / 2 + diameter2 / 2);
}

/**
 * Moves everything in the game.
 */
function moveEverything(){
	player.move(600, 500); // TODO: Adjustable sizes?

	for(var i = 0; i < balls.length; i++){
		var ball = balls[i];
		var ballElement = ballElements[i];

		ball.move(600, 500); // TODO: Adjustable sizes?
		ballElement.css('left', ball.xPos);
		ballElement.css('top', ball.yPos);
	}

	playerElement.css('left', player.xPos);
	playerElement.css('top', player.yPos);
}

function collision(){
	var collision = false;

	for(var i = 0; i < balls.length; i++){
		var ball = balls[i];

		if(ballsCollide(ball, player, 50, 30)){
			collision = true;
			break;
		}
	}

	return collision;
}

/**
 * Starts the game. Contains all of the game logic.
 */
function startGame(){
	animationID = setInterval(function(){
		moveEverything();

		if(collision()){
			clearInterval(animationID);

			// TODO: Show game over stuff
			$('#timePlayed').append("<strong>Time:</strong> " + seconds + "." + (ticks * 1000) + " s");
			$('#totalScore').append("<strong>Score:</strong> " + (balls.length * seconds + ticks).toString());
		}

		if(++ticks === 60){
			ticks = 0;

			if(++seconds % 10 === 0){
				addBall();
			} else if (seconds % 10 >= 7){
				$('#originBox').css('background-color', 'red');
			} else {
				$('#originBox').css('background-color', 'white');
			}
		}
	}, 17); // 60 fps

	addBall();
}

/* Adds a ball to the game/DOM */
function addBall(){
	var ball = new Ball(300, 250);
	var ballElement = $('<div class="ball"></div>');

	balls.push(ball);
	ballElements.push(ballElement);

	$('#space').append(ballElement);
}

// All this runs when the document is ready.
$(document).ready(function(){
    player = new Player(0, 0);
	playerElement = $('#player');

    $('#startGame').unbind().click(function(){
		startGame();
		$('#startGame').remove();
    });
});

// Manage each of the key pressed events here
$(document).on('keydown', function (e) {
    player.changeDirection(e.keyCode);
});
