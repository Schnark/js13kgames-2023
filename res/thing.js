/*global Thing: true*/
Thing =
(function () {
"use strict";

function Thing (type, width, height) {
	this.type = type;
	this.width = width;
	this.height = height;
}

Thing.prototype.interact = function () {
	//TODO
	this.interacted = !this.interacted;
};

Thing.prototype.draw = function (ctx, x, y) {
	ctx.fillStyle = '#f00';
	if (this.type === 'rect' && this.interacted) {
		ctx.fillStyle = '#0f0';
	}
	ctx.fillRect(x, y, this.width, this.height);
};

return Thing;
})();