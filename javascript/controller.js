var player; // The "model" player - holds game logic information
var balls = []; // The "model" balls - holds the game logic information

var playerElement; // The "view" player - the element that the player belongs to
var ballElements = []; // The "view" balls - the elements that represent each of the balls

var animationID; // The animation ID

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
		function animate(){
			// Make everything move
			player.move(600, 500); // TODO: Adjustable sizes?

			for(var i = 0; i < balls.length; i++){
				var ball = balls[i];
				var ballElement = ballElements[i];

				ball.move(600, 500); // TODO: Adjustable sizes?
				ballElement.css('left', ball.xPos);
				ballElement.css('top', ball.yPos);
			}

			// Now show that on screen for the player
			playerElement.css('left', player.xPos);
			playerElement.css('top', player.yPos);

			// Now let's see what collides

			for(var i = 0; i < balls.length; i++){
				var ball = balls[i];

				if(ballsCollide(ball, player, 50, 30)){
					ballElements[i].css('background-color', 'red');
				} else {
					ballElements[i].css('background-color', 'darkgreen');
				}
			}
		}

		addBall();
		//addBall();

		animationID = setInterval(animate, 17);
    });
});

// Manage each of the key pressed events here
$(document).on('keydown', function (e) {
    player.changeDirection(e.keyCode);
});
