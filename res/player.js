/*Player: true*/
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

Player.prototype.moveTo = function (x, interactThing, immediately) {
	this.dest = x;
	this.interactThing = interactThing;
	if (immediately) {
		this.x = x;
	}
};

Player.prototype.walk = function (t) {
	var d = t * Player.speed;
	if (Math.abs(this.x - this.dest) <= d) {
		this.x = this.dest;
		if (this.interactThing) {
			this.interactThing.interact();
			this.interactThing = null;
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