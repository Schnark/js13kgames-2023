/*global Canvas, Player, Room, Thing*/
(function () {
"use strict";

var canvas = new Canvas(document.getElementById('canvas')),
	player = new Player(),
	room = new Room(750),
	rect = new Thing ('rect', 50, 50),
	block = new Thing('block', 20, 200);
block.blocksPath = true;
room.addThing(rect, 100, 110);
room.addThing(block, 350, 200);
canvas.setPlayer(player);
canvas.setRoom(room);
canvas.startDraw();

})();