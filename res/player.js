/*global Player: true*/
/*global INVENTORY_SIZE, PLAYER_HEIGHT, PLAYER_WIDTH*/
Player =
(function () {
"use strict";

var PLAYER_SPEED = 0.1;

function Player () {
	//this.x = PLAYER_WIDTH / 2;
	//this.dest = this.x;
	//this.dir = false; //false: to right, true: to left
	this.inventory = [];
}

Player.prototype.addThing = function (thing) {
	this.inventory.push(thing);
};

Player.prototype.hasThing = function (thing) {
	return this.inventory.indexOf(thing) > -1;
};

Player.prototype.moveTo = function (x, interactThing, immediately, dir) {
	this.dest = x;
	this.interactThing = interactThing;
	if (x < this.x) {
		this.dir = true;
	} else if (x > this.x) {
		this.dir = false;
	}
	if (immediately) {
		this.x = x;
		this.dir = dir;
	}
};

Player.prototype.walk = function (t, room) {
	var d = t * PLAYER_SPEED, text;
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

Player.prototype.draw = function (ctx, height, t, sprites) {
	if (this.dir) {
		ctx.translate(this.x, 0);
		ctx.scale(-1, 1);
		ctx.translate(-this.x, 0);
	}
	ctx.drawImage(sprites.person, Math.round(this.x - PLAYER_WIDTH / 2), height - PLAYER_HEIGHT - 2);
};

Player.prototype.drawInventory = function (ctx, count, sprites) {
	var i, start = this.inventory.length - count, descs = [];
	if (start < 0) {
		start = 0;
	}
	for (i = start; i < this.inventory.length; i++) {
		ctx.save();
		ctx.translate((i - start) * INVENTORY_SIZE, 0);
		this.inventory[i].drawInventory(ctx, sprites);
		descs.push(this.inventory[i].getText());
		ctx.restore();
	}
	return descs;
};

return Player;
})();