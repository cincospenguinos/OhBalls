var player;

$(document).ready(function(){
    player = new Player(0, 0);
});

// Manage each of the key pressed events here
$(document).on('keydown', function (e) {
    player.changeDirection(e.keyCode);
});

