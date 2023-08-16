/*global Room: true*/
Room =
(function () {
"use strict";

function Room (width) {
	this.width = width;
	this.things = [];
}

Room.prototype.addThing = function (t, x, y) {
	this.things.push({t: t, x: x, y: y});
};

Room.prototype.removeThing = function (t) {
	var i;
	for (i = 0; i < this.things.length; i++) {
		if (this.things[i].t === t) {
			this.things.splice(i, 1);
			return;
		}
	}
};

Room.prototype.findThing = function (x, y) {
	var i, data;
	for (i = this.things.length - 1; i >= 0; i--) {
		data = this.things[i];
		if (
			data.t.interactionMode &&
			data.x <= x && x <= data.x + data.t.width &&
			y <= data.y && data.y - data.t.height <= y
		) {
			return data;
		}
	}
	return null;
};

Room.prototype.getLimit = function (from, to, playerHalfWidth) {
	var i;
	if (to < playerHalfWidth) {
		to = playerHalfWidth;
	} else if (to > this.width - playerHalfWidth) {
		to = this.width - playerHalfWidth;
	}
	for (i = 0; i < this.things.length; i++) {
		if (this.things[i].t.blocksPath) {
			if (from < this.things[i].x) {
				to = Math.min(to, this.things[i].x - playerHalfWidth);
			} else {
				to = Math.max(to, this.things[i].x + this.things[i].t.width + playerHalfWidth);
			}
		}
	}
	return to;
};

//the caller is responsible for setting transform and clip
Room.prototype.draw = function (ctx, player, height) {
	var i;
	ctx.fillStyle = '#aaa';
	ctx.fillRect(0, 0, this.width, height);
	for (i = 0; i < this.things.length; i++) {
		this.things[i].t.draw(ctx, this.things[i].x, height - this.things[i].y);
	}
	player.draw(ctx, height);
};

return Room;
})();