var head = $('head');

function optionSelected(){
    var value = $('select[name=styleSelector]').val();
    var gameplayStylesheet = $('#gameplayStylesheet');

    switch(value){
        case "1":
            gameplayStylesheet.remove();
            head.append('<link id="gameplayStylesheet" type="text/css" rel="stylesheet" href="style/other_gameplay_stylesheet.css"/>');
            break;
        case "2":
            gameplayStylesheet.remove();
            head.append('<link id="gameplayStylesheet" type="text/css" rel="stylesheet" href="style/default_gameplay_stylesheet.css"/>');
            break;
    }
}