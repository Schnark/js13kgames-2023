/*global Room: true*/
/*global PLAYER_HEIGHT*/
Room =
(function () {
"use strict";

function Room (width, melody) {
	this.width = width;
	this.melody = melody;
	this.things = [];
	this.locations = [];
}

Room.prototype.addLocation = function (pos, dir) {
	this.locations.push([pos, dir]);
};

Room.prototype.getLocation = function (i) {
	return this.locations[i];
};

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
Room.prototype.draw = function (ctx, player, height, t, sprites) {
	var i, hDiff, light;
	if (!this.isOutside) {
		ctx.fillStyle = sprites.bg;
		hDiff = (height - 10) % 24;
		if (hDiff !== 0) {
			hDiff = 24 - hDiff;
		}
		ctx.translate(0, -hDiff);
		ctx.fillRect(0, 0, this.width, height - 10 + hDiff);
		ctx.translate(0, hDiff);
		ctx.fillStyle = sprites.floor;
		ctx.fillRect(0, height - 10, this.width, 10);
	} else {
		ctx.fillStyle = '#aaf';
		ctx.fillRect(0, 0, this.width, height - 50);
		ctx.fillStyle = '#afa';
		ctx.fillRect(0, height - 50, this.width, 50);
	}
	for (i = 0; i < this.things.length; i++) {
		this.things[i].t.draw(ctx, this.things[i].x, height - this.things[i].y, t, sprites);
	}
	player.draw(ctx, height, t, sprites);
	if (this.light) {
		light = player.hasLight() ? [player.x, Math.round(PLAYER_HEIGHT * 0.8)] : this.light;
		ctx.translate(light[0], height - light[1]);
		ctx.fillStyle = sprites.shadow;
		ctx.fillRect(-light[0], light[1] - height, this.width, height);
	}
};

return Room;
})();