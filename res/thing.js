/*global Thing: true*/
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

Thing.prototype.draw = function (ctx, x, y) {
	ctx.fillStyle = '#f00';
	if (this.state) {
		ctx.fillStyle = '#0f0';
	}
	ctx.fillRect(x, y, this.width, this.height);
};

return Thing;
})();