/*global Thing: true*/
/*global INVENTORY_SIZE*/
Thing =
(function () {
"use strict";

function Thing (width, height, interactionMode, text) {
	this.width = width;
	this.height = height;
	this.interactionMode = interactionMode;
	this.text = text;
}

Thing.prototype.getText = function () {
	var text;
	if (!Array.isArray(this.text)) {
		return this.text;
	}
	text = this.text.shift();
	this.text.push(text);
	return text;
};

Thing.prototype.interact = function (room, player) {
	switch (this.interactionMode) {
	case 'text':
		return this.getText();
	case 'toggle':
		this.state = !this.state;
		return this.getText();
	case 'take':
		room.removeThing(this);
		player.addThing(this);
		return 'Taken: ' + this.getText();
	}
};

Thing.prototype.draw = function (ctx, x, y, t, sprites) {
	var sprite;
	if (this.sprite) {
		sprite = Array.isArray(this.sprite) ? this.sprite[Math.floor(t / 500) % this.sprite.length] : this.sprite;
		ctx.drawImage(sprites[sprite], x, y);
		return;
	}
	ctx.fillStyle = '#f00';
	if (this.state) {
		ctx.fillStyle = '#0f0';
	}
	ctx.fillRect(x, y, this.width, this.height);
};

Thing.prototype.drawInventory = function (ctx, sprites) {
	if (this.sprite) {
		ctx.drawImage(sprites[this.sprite + 'Inv'], 3, 3);
		return;
	}
	ctx.fillStyle = '#f00';
	ctx.fillRect(3, 3, INVENTORY_SIZE - 6, INVENTORY_SIZE - 6);
};

return Thing;
})();