var WIDTH = 1200, HEIGHT = 600;

var paper;

var piano;

var PADDING = WIDTH * 0.01

function onMessageReceived(event) {
    try {
        var data = JSON.parse(event.message);
        handleReceivedMessage(data);
    } catch (e) {
        console.log('error: ' + e);
    }
}

function init() {
    $('#container_canvas').css({'width': WIDTH});

    // init raphael canvas
    paper = Raphael('canvas', WIDTH, HEIGHT);

    piano = new Piano(new Position(PADDING, HEIGHT - 250 - PADDING), WIDTH - PADDING * 2, 250);
    piano.init();
}