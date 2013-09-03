function Key(pos, w, h, name, octave, type) {
    this.pos = pos;
    this.width = w;
    this.height = h;
    this.name = name;
    this.octave = octave;
    this.rect = paper.rect(pos.x, pos.y, w, h).attr({fill: 'white'});
    this.rect.node.id = name + '' + octave;
    this.type = type;
    this.animating = false;

    var _this = this;
    this.rect.mousedown(function () {
        _this.animateKey();
    });

    this.rect.keyType = this;
}

Key.prototype.animateKey = function () {
    if (this.animating) return;

    var color = (this.type == 'b') ? 'black' : 'white';
    var speed = 200;
    this.animating = true;

    var _this = this;
    this.rect.animate({height: _this.height - (_this.height * 0.05), fill: 'green'}, speed, 'ease-in-out', function () {
        this.animate({height: _this.height, fill: color}, speed, 'ease-in-out', function () {
            _this.animating = false;
        });
    });
}


function PianoOctave(pos, w, h, id, ar) {
    this.id = id;
    this.pos = pos;
    this.width = w;
    this.height = (ar) ? (w / 7) * 6 : h;  // ar == aspect ratio
    this.blackKeys = new Array(5);
    this.whiteKeys = new Array(7);
}

PianoOctave.prototype.init = function () {
    var keyW = this.width / 7;
    this.whiteKeys[0] = new Key(new Position(this.pos.x + (0 * keyW), this.pos.y), keyW, this.height, getNoteName(0, true), this.id, 'w');
    this.whiteKeys[1] = new Key(new Position(this.pos.x + (1 * keyW), this.pos.y), keyW, this.height, getNoteName(2, true), this.id, 'w');
    this.whiteKeys[2] = new Key(new Position(this.pos.x + (2 * keyW), this.pos.y), keyW, this.height, getNoteName(4, true), this.id, 'w');
    this.whiteKeys[3] = new Key(new Position(this.pos.x + (3 * keyW), this.pos.y), keyW, this.height, getNoteName(5, true), this.id, 'w');
    this.whiteKeys[4] = new Key(new Position(this.pos.x + (4 * keyW), this.pos.y), keyW, this.height, getNoteName(7, true), this.id, 'w');
    this.whiteKeys[5] = new Key(new Position(this.pos.x + (5 * keyW), this.pos.y), keyW, this.height, getNoteName(9, true), this.id, 'w');
    this.whiteKeys[6] = new Key(new Position(this.pos.x + (6 * keyW), this.pos.y), keyW, this.height, getNoteName(11, true), this.id, 'w');

    var keyW2 = keyW * 0.5;
    var bKeyH = this.height * 0.7;
    this.blackKeys[0] = new Key(new Position(this.pos.x + ((1) * keyW) - keyW2 / 2, this.pos.y), keyW2, bKeyH, getNoteName(1, true), this.id, 'b');
    this.blackKeys[1] = new Key(new Position(this.pos.x + ((2) * keyW) - keyW2 / 2, this.pos.y), keyW2, bKeyH, getNoteName(3, true), this.id, 'b');
    this.blackKeys[2] = new Key(new Position(this.pos.x + ((4) * keyW) - keyW2 / 2, this.pos.y), keyW2, bKeyH, getNoteName(6, true), this.id, 'b');
    this.blackKeys[3] = new Key(new Position(this.pos.x + ((5) * keyW) - keyW2 / 2, this.pos.y), keyW2, bKeyH, getNoteName(8, true), this.id, 'b');
    this.blackKeys[4] = new Key(new Position(this.pos.x + ((6) * keyW) - keyW2 / 2, this.pos.y), keyW2, bKeyH, getNoteName(10, true), this.id, 'b');

    for (var i = 0; i < this.blackKeys.length; i++) {
        this.blackKeys[i].rect.attr({fill: 'black'});
    }
}

function Piano(pos, w, h) {
    this.pos = pos;
    this.width = w;
    this.height = h;
    this.pianoMap = new Array(7);
    this.leftPiano = null;
    this.rightPiano = null;
}

Piano.prototype.init = function () {
    var w = (this.width / 7) * 0.8;
    var h = this.height * 0.2;
    for (var i = 0; i < this.pianoMap.length; i++) {
        this.pianoMap[i] = new PianoOctave(new Position(this.pos.x + (i * w) + (this.width - w * 7) / 2, this.pos.y), w, this.height * 0.2, i, false);
        this.pianoMap[i].init();
    }

    var y = this.pos.y + this.height * 0.2;

    this.leftPiano = new PianoOctave(new Position(this.pos.x, y), this.width / 2, this.height - h, 0, false);
    this.rightPiano = new PianoOctave(new Position(this.pos.x + this.leftPiano.width + 2, y), this.width / 2, this.height - h, 0, false);

    this.leftPiano.init();
    this.rightPiano.init();
}

