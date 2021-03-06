var player; // The "model" player - holds game logic information
var balls = []; // The "model" balls - holds the game logic information

var playerElement; // The "view" player - the element that the player belongs to
var ballElements = []; // The "view" balls - the elements that represent each of the balls

var animationID; // The animation ID
var ticks = 0;
var seconds = 0;
var playerMoves = [];
var trials = 1;

var log;

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
/**
 * Returns true if there is a collision
 * @returns {boolean}
 */
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

// TODO: Death animation
function deathAnimation(){
	var count = 0;
	var animID = setInterval(function(){

		var color = '#FF00' + count.toString();
		$('.ball').css('background-color', color);

		if(count === 100)
			clearInterval(animID);
	}, 17);
}

/**
 * Returns the score
 */
function calculateScore(){
	/*
	x = number of seconds + ticks / 60, y = score, b = # of balls at death, and v = total velocity of all the balls:
	y = xbv - 15(b^2-b) / 2
	 */
	var totalVelocity = 0;
	var time = seconds + (ticks / 60);

	for(var i = 0; i < balls.length; i++){
		var b = balls[i];
		//console.log(b.toString());
		totalVelocity += Math.abs(b.xVel) + Math.abs(b.yVel);
	}

	var score = time * balls.length * totalVelocity;
	score -= 15 * (Math.pow(balls.length, 2) - balls.length) / 2;

	var avgVelocity = totalVelocity / balls.length;

	log.append("<tr><td>" + trials.toString() + "</td><td>" + balls.length.toString() + "</td><td>" + totalVelocity +
		"</td><td>" + avgVelocity + "</td><td>" + time + "</td><td>" + score.toString() + "</td></tr>");

	trials++;

	return score;
}

/**
 * Starts the game. Contains all of the game logic.
 */
function startGame(){
	console.log('Starting a game.');

	animationID = setInterval(function(){
		// First adjust the model as the player has input
		if(playerMoves.length > 0)
			player.changeDirection(playerMoves.shift());

		moveEverything();

		if(collision()){
			clearInterval(animationID);

			// Run an animation here
			deathAnimation();

			// Calculate score
			var score = calculateScore();

			// Shows the time and score
			$('#timePlayed').append("<strong>Time:</strong> " + seconds + "." + (ticks * 1000) + " s");
			$('#totalScore').append("<strong>Score:</strong> " + score.toString());

			// Add the restart button
			$('body').append('<div id="startGame">Restart</div>');

			// Restarting the game
			$('#startGame').unbind().click(function(){

				for(var i = 0; i < ballElements.length; i++)
					ballElements[i].remove();

				playerMoves = [];

				player.xPos = 0;
				player.yPos = 0;
				player.vel = 0;

				ticks = 0;
				seconds = 0;
				balls = [];
				ballElements = [];

				$('#timePlayed').text('');
				$('#totalScore').text('');

				startGame();
				$('#startGame').remove();
			});
		}

		if(++ticks === 60){
			ticks = 0;

			if(++seconds % 10 === 0){
				addBall();
			} else if (seconds % 10 > 7){
				$('#originBox').css('background-color', 'red');
			} else {
				$('#originBox').css('background-color', 'white');
			}
		}
	}, 17);

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

	log = $('#log')
});

// Manage each of the key pressed events here
$(document).on('keydown', function (e) {
	// Instead of letting the player have access to the model all willy nilly, we will put their actions in a queue and then
	// we will execute them one by one
	playerMoves.push(e.keyCode);
});

