function sendMessage(message) {
    gapi.hangout.data.sendMessage(JSON.stringify(message));
}

function getCurrentTime() {
    return new Date().getTime();
}

function square(n) {
    return n * n;
}

function round(n) {
    return Math.round(n);
}

function oddOrEven(n) {
    if (n == 0) return 'none';
    if (n % 2 == 0)return 'even';
    else return 'odd';
}

function getNoteName(noteNumber, sf) {
    switch (noteNumber) {
        case 0:
            return 'C';
        case 1:
            return (sf) ? 'C#' : 'Db';
        case 2:
            return 'D';
        case 3:
            return (sf) ? 'D#' : 'Eb';
        case 4:
            return 'E';
        case 5:
            return 'F';
        case 6:
            return (sf) ? 'F#' : 'Gb';
        case 7:
            return 'G';
        case 8:
            return (sf) ? 'G#' : 'Ab';
        case 9:
            return 'A';
        case 10:
            return (sf) ? 'A#' : 'Bb';
        case 11:
            return 'B';
        default:
            return null;
    }
}

/*
 data[0] = object
 data[1] = changes list
 */

function handleReceivedMessage(data) {
    var objName = data[0];
    var changes = data[1];
    switch (objName) {
        case 'metronome':

            break;
    }
}

function Position(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = (z != null) ? z : 0;
}