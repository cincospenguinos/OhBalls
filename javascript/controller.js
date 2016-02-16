var player; // The "model" player - holds game logic information
var balls = []; // The "model" balls - holds the game logic information

var playerElement; // The "view" player - the element that the player belongs to
var ballElements = []; // The "view" balls - the elements that represent each of the balls

var animationID; // The animation ID

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
			for(var i = 0; i < balls.length; i++){
				var ball = balls[i];
				var ballElement = ballElements[i];

				ball.move(600, 500); // TODO: Adjustable sizes?
				ballElement.css('left', ball.xPos);
				ballElement.css('top', ball.yPos);
			}

			player.move(600, 500); // TODO: Adjustable sizes?

			// Now show that on screen for the player
			playerElement.css('left', player.xPos);
			playerElement.css('top', player.yPos);
		}

		addBall();
		addBall();

		animationID = setInterval(animate, 17);
    });
});

// Manage each of the key pressed events here
$(document).on('keydown', function (e) {
    player.changeDirection(e.keyCode);
});
