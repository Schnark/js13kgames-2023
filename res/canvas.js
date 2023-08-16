/*global Canvas: true*/
/*global Player*///needed for Player.width
Canvas =
(function () {
"use strict";

var rAF = window.requestAnimationFrame || window.mozRequestAnimationFrame;

function Canvas (canvas, info) {
	this.canvas = canvas;
	this.info = info;
	this.hideInfo();
	this.ctx = canvas.getContext('2d');
	/*this.player = null;
	this.room = null;
	this.roomStart = 0;*/
	this.roomX = 0;
	this.roomY = 0;
	this.roomW = canvas.width;
	this.roomH = canvas.height;
	this.initEvents();
}

Canvas.prototype.initEvents = function () {
	this.canvas.addEventListener('click', function (e) {
		var x = e.clientX - this.canvas.offsetLeft, y = e.clientY - this.canvas.offsetTop;
		this.hideInfo();
		if (
			x >= this.roomX && x <= this.roomX + this.roomW &&
			y >= this.roomY && y <= this.roomY + this.roomH
		) {
			this.onRoomClick(x - this.roomX + this.roomStart, this.roomH + this.roomY - y);
		}
	}.bind(this));
	this.info.addEventListener('click', function () {
		this.hideInfo();
	}.bind(this));
};

Canvas.prototype.showInfo = function (text) {
	this.info.textContent = text;
	this.info.style.display = '';
};

Canvas.prototype.hideInfo = function () {
	this.info.style.display = 'none';
};

Canvas.prototype.setPlayer = function (player) {
	this.player = player;
	player.moveTo(Player.width / 2, null, true);
};

Canvas.prototype.setRoom = function (room) {
	this.room = room;
	this.calcRoomStart();
};

Canvas.prototype.calcRoomStart = function () {
	if (this.room.width <= this.roomW) {
		this.roomStart = -Math.floor((this.roomW - this.room.width) / 2);
		return;
	}
	this.roomStart = Math.floor(this.player.x / (0.75 * this.roomW)) * (0.75 * this.roomW); //TODO
	if (this.roomStart + this.roomW > this.room.width) {
		this.roomStart = this.room.width - this.roomW;
	}
};

Canvas.prototype.startDraw = function () {
	this.isDrawing = true;
	rAF(function (t) {
		this.startTime = t;
		this.prevTime = t;
		this.onAnimationFrame(t);
	}.bind(this));
};

Canvas.prototype.onAnimationFrame = function (t) {
	var text;
	if (!this.isDrawing) {
		return;
	}
	this.draw();
	text = this.player.walk(t - this.prevTime, this.room);
	//text might come from delayed interaction
	if (text) {
		this.showInfo(text);
	}
	this.calcRoomStart();
	this.prevTime = t;
	rAF(this.onAnimationFrame.bind(this));
};

Canvas.prototype.stopDraw = function () {
	this.isDrawing = false;
};

Canvas.prototype.draw = function () {
	this.drawRoom();
};

Canvas.prototype.drawRoom = function () {
	this.ctx.save();
	this.ctx.beginPath();
	this.ctx.rect(this.roomX, this.roomY, this.roomW, this.roomH);
	this.ctx.clip();
	this.ctx.translate(this.roomX - this.roomStart, this.roomY);
	this.room.draw(this.ctx, this.player, this.roomH);
	this.ctx.restore();
};

Canvas.prototype.onRoomClick = function (x, y) {
	var data, text;
	if (!this.isDrawing) {
		return;
	}
	data = this.room.findThing(x, y);
	if (
		data &&
		this.player.x + Player.width * 0.75 >= data.x &&
		this.player.x - Player.width * 0.75 <= data.x + data.t.width
	) {
		text = data.t.interact(this.room, this.player);
		if (text) {
			this.showInfo(text);
		}
	} else {
		this.player.moveTo(this.room.getLimit(this.player.x, x, Player.width / 2), data && data.t);
	}
};

return Canvas;
})();