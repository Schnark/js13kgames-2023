/*global Canvas, Room, Thing*/
(function () {
"use strict";

var canvas = new Canvas(document.getElementById('canvas'), document.getElementById('info')),
	room0 = new Room(750),
	room1 = new Room(750),
	key = new Thing(16, 12, 'take', 'A key'),
	win = new Thing(25, 50),
	torch = new Thing(12, 40),
	rect = new Thing(50, 50, 'toggle', ['Green', 'Red']),
	block = new Thing(20, 200, 'special'),
	stairUp = new Thing(20, 200, 'special', 'You go upstairs.'),
	stairDown = new Thing(20, 200, 'special', 'You go downstairs.'),
	exit = new Thing(20, 200, 'text', 'You reach the exit and win!');
key.sprite = 'key';
win.sprite = 'window';
torch.sprite = ['torch0', 'torch1'];
block.blocksPath = true;
block.interact = function (room, player) {
	if (this.state) {
		return 'The door is open.';
	}
	if (player.hasThing(key)) {
		this.state = true;
		this.blocksPath = false;
		return 'You unlock the door with the key.';
	}
	return 'The door is locked.';
};
stairUp.interact = function () {
	canvas.fadeOut(function () {
		canvas.setRoom(room1);
		canvas.fadeIn(function () {});
	});
	return this.getText();
};
stairDown.interact = function () {
	canvas.fadeOut(function () {
		canvas.setRoom(room0, 1);
		canvas.fadeIn(function () {});
	});
	return this.getText();
};
room0.addLocation(50);
room0.addLocation(730, true);
room0.addThing(key, 5, 15);
room0.addThing(rect, 100, 110);
room0.addThing(torch, 200, 110);
room0.addThing(block, 350, 200);
room0.addThing(torch, 500, 110);
room0.addThing(torch, 600, 110);
room0.addThing(torch, 700, 110);
room0.addThing(stairUp, 730, 200);
room1.addLocation(730, true);
room1.addThing(stairDown, 730, 200);
room1.addThing(win, 30, 125);
room1.addThing(win, 130, 125);
room1.addThing(win, 230, 125);
room1.addThing(win, 330, 125);
room1.addThing(win, 430, 125);
room1.addThing(win, 530, 125);
room1.addThing(win, 630, 125);
room1.addThing(exit, 0, 200);
canvas.setRoom(room0);
canvas.loadSprites({
	bg: [0, 0, 24, 24, 'repeat'],
	floor: [48, 12, 7, 3, 'repeat'],
	person: [0, 24, 30, 90],
	keyInv: [24, 0, 24, 24],
	key: [48, 0, 16, 12],
	window: [30, 24, 25, 50],
	torch0: [30, 74, 12, 40],
	torch1: [42, 74, 12, 40]
},
function () {
	canvas.startDraw();
});

})();