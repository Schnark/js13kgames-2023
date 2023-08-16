/*global Canvas, Player, Room, Thing*/
(function () {
"use strict";

var canvas = new Canvas(document.getElementById('canvas'), document.getElementById('info')),
	player = new Player(),
	room = new Room(750),
	key = new Thing(20, 20, 'take', 'A key'),
	rect = new Thing(50, 50, 'toggle', ['Green', 'Red']),
	block = new Thing(20, 200, 'special'),
	exit = new Thing(20, 200, 'text', 'You reach the exit and win!');
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
room.addThing(key, 5, 20);
room.addThing(rect, 100, 110);
room.addThing(block, 350, 200);
room.addThing(exit, 730, 200);
canvas.setPlayer(player);
canvas.setRoom(room);
canvas.startDraw();

})();