/*global Player: true*/
Player =
(function () {
"use strict";

function Player () {
	this.x = Player.width / 2;
	this.dest = this.x;
	this.inventory = [];
}

Player.width = 30;
Player.height = 100;
Player.speed = 0.1;

Player.prototype.addThing = function (thing) {
	this.inventory.push(thing);
};

Player.prototype.hasThing = function (thing) {
	return this.inventory.indexOf(thing) > -1;
};

Player.prototype.moveTo = function (x, interactThing, immediately) {
	this.dest = x;
	this.interactThing = interactThing;
	if (immediately) {
		this.x = x;
	}
};

Player.prototype.walk = function (t, room) {
	var d = t * Player.speed, text;
	if (Math.abs(this.x - this.dest) <= d) {
		this.x = this.dest;
		if (this.interactThing) {
			text = this.interactThing.interact(room, this);
			this.interactThing = null;
			return text;
		}
	} else if (this.x < this.dest) {
		this.x += d;
	} else {
		this.x -= d;
	}
};

Player.prototype.draw = function (ctx, height) {
	ctx.fillStyle = '#00f';
	ctx.fillRect(this.x - Player.width / 2, height - Player.height, Player.width, Player.height);
};

return Player;
})();