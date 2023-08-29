/*global Thing: true*/
Thing =
(function () {
"use strict";

function Thing (width, height, interactionMode, data) {
	this.width = width;
	this.height = height;
	this.interactionMode = interactionMode;
	data = data || {};
	Object.keys(data).forEach(function (key) {
		this[key] = data[key];
	}.bind(this));
}

Thing.prototype.interact = function (room, player) {
	switch (this.interactionMode) {
	case 'text':
		return this.text;
	case 'take':
		room.removeThing(this);
		player.addThing(this);
		return 'Taken: ' + this.text;
	default:
		return this.interactionMode(room, player);
	}
};

Thing.prototype.draw = function (ctx, x, y, t, sprites) {
	var sprite;
	if (this.sprite) {
		sprite = this.animate ? this.sprite + (Math.floor(t / 500) % this.animate) : this.sprite;
		ctx.drawImage(sprites[sprite], x, y + this.height - sprites[sprite].height);
		if (!this.pattern) {
			return;
		}
	}
	ctx.translate(x, y);
	ctx.fillStyle = sprites[this.pattern];
	ctx.fillRect(0, 0, this.width, this.sprite ? this.height - sprites[sprite].height : this.height);
	ctx.translate(-x, -y);
};

Thing.prototype.drawInventory = function (ctx, sprites) {
	ctx.drawImage(sprites[this.sprite + 'Inv'], 3, 3);
};

Thing.prototype.drawPlayer = function (ctx, x, y, dir, sprites) {
	switch (this.sprite) {
	case 'helmet':
		ctx.drawImage(sprites.helmetPlayer, x + 9, y);
		break;
	case 'sword':
		if (!dir) {
			ctx.drawImage(sprites.swordPlayer, x + 5, y + 49);
		}
	}
};

return Thing;
})();