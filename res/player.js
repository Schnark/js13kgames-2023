/*global Player: true*/
/*global INVENTORY_SIZE, PLAYER_HEIGHT, PLAYER_WIDTH*/
Player =
(function () {
"use strict";

var PLAYER_SPEED = 0.08;

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

Player.prototype.removeThing = function (thing) {
	var i;
	for (i = 0; i < this.inventory.length; i++) {
		if (this.inventory[i] === thing) {
			this.inventory.splice(i, 1);
			return;
		}
	}
};

Player.prototype.hasLight = function () {
	var i;
	for (i = 0; i < this.inventory.length; i++) {
		if (this.inventory[i].light) {
			return true;
		}
	}
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
	var x, y, i, sprite;
	if (this.dir) {
		ctx.save();
		ctx.translate(Math.round(this.x), 0);
		ctx.scale(-1, 1);
		ctx.translate(-Math.round(this.x), 0);
	}
	x = Math.round(this.x - PLAYER_WIDTH / 2);
	y = height - PLAYER_HEIGHT - 2;
	if (this.x !== this.dest) {
		sprite = Math.floor(t * PLAYER_SPEED / PLAYER_WIDTH * 2) % 2 ? sprites.person0 : sprites.person1;
	} else {
		sprite = sprites.person0;
	}
	ctx.drawImage(sprite, x, y);
	for (i = 0; i < this.inventory.length; i++) {
		this.inventory[i].drawPlayer(ctx, x, y, this.dir, sprites);
	}
	if (this.dir) {
		ctx.restore();
	}
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
		descs.push(this.inventory[i].text);
		ctx.restore();
	}
	return descs;
};

return Player;
})();