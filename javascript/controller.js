var player;

$(document).ready(function(){
    // All this runs when the document is ready.
    player = new Player(0, 0);
    var animationID;

    $('#startGame').unbind().click(function(){
	function animate(){
	    player.move();
	    $('#player').css('left', player.xPos);
	    $('#player').css('top', player.yPos);
	}

	animationID = setInterval(animate, 17);
    });
});

// Manage each of the key pressed events here
$(document).on('keydown', function (e) {
    player.changeDirection(e.keyCode);
});
