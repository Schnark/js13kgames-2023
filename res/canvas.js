/*global Canvas: true*/
/*global INVENTORY_SIZE, PLAYER_WIDTH, MIN_WIDTH, MIN_HEIGHT, MAX_HEIGHT, MAX_FACTOR, SPRITE_URL, fullscreen, Player*/
Canvas =
(function () {
"use strict";

var rAF = window.requestAnimationFrame || window.mozRequestAnimationFrame;

function Canvas (canvas, info) {
	this.canvas = canvas;
	this.info = info;
	this.hideInfo();
	this.ctx = canvas.getContext('2d', {alpha: false});
	this.player = new Player();
	this.calcSize();
	this.initEvents();
}

Canvas.prototype.loadSprites = function (defs, callback) {
	var img = new Image(), shadow;
	shadow = this.ctx.createRadialGradient(0, 0, 0, 0, 0, 4.5 * PLAYER_WIDTH);
	shadow.addColorStop(0, 'transparent');
	shadow.addColorStop(1, '#000');
	this.sprites = {
		shadow: shadow
	};
	img.onload = function () {
		Object.keys(defs).forEach(function (key) {
			var data = defs[key],
			canvas = document.createElement('canvas'),
			ctx = canvas.getContext('2d');
			canvas.width = data[2];
			canvas.height = data[3];
			if (data[5]) {
				ctx.scale(-1, 1);
				ctx.translate(-data[2], 0);
			}
			ctx.drawImage(img, data[0], data[1], data[2], data[3], 0, 0, data[2], data[3]);
			if (data[4]) {
				this.sprites[key] = this.ctx.createPattern(canvas, data[4]);
			} else {
				this.sprites[key] = canvas;
			}
		}.bind(this));
		callback();
	}.bind(this);
	img.src = SPRITE_URL;
};

Canvas.prototype.calcSize = function () {
	var f, w, h;
	f = Math.floor(Math.min(
		window.innerWidth / MIN_WIDTH,
		window.innerHeight / MIN_HEIGHT,
		MAX_FACTOR
	));
	if (f < 1) {
		f = 1;
	}
	w = Math.floor(window.innerWidth / f); //this means that w might be less than MIN_WIDTH, but we actually don't care
	h = Math.min(Math.max(Math.floor(window.innerHeight / f), MIN_HEIGHT), MAX_HEIGHT);
	this.canvas.width = w;
	this.canvas.height = h;
	this.canvas.style.width = (w * f) + 'px';
	this.canvas.style.height = (h * f) + 'px';
	this.factor = f;

	this.buttonsX = w - 2 * 26;
	this.buttonsY = 10;
	this.inventoryX = 10;
	this.inventoryY = 10;
	this.inventoryCount = Math.floor((w - 20 - 2 * 26) / INVENTORY_SIZE);
	this.inventoryDescs = [];
	this.roomX = 10;
	this.roomY = 30 + INVENTORY_SIZE;
	this.roomW = w - 20;
	this.roomH = h - 40 - INVENTORY_SIZE;
};

Canvas.prototype.getCoordinates = function (e) {
	var x = (e.clientX - this.canvas.offsetLeft) / this.factor,
		y = (e.clientY - this.canvas.offsetTop) / this.factor;
	return [x, y];
};

Canvas.prototype.getArea = function (x, y) {
	if (x >= this.buttonsX && y >= this.buttonsY && y <= this.buttonsY + 16) {
		return (x - this.buttonsX) % 26 <= 16 ? ['buttons', Math.floor((x - this.buttonsX) / 26)] : null;
	}
	if (
		x >= this.inventoryX && x <= this.inventoryX + INVENTORY_SIZE * this.inventoryCount &&
		y >= this.inventoryY && y <= this.inventoryY + INVENTORY_SIZE
	) {
		return ['inventory', Math.floor((x - this.inventoryX) / INVENTORY_SIZE)];
	}
	if (
		x >= this.roomX && x <= this.roomX + this.roomW &&
		y >= this.roomY && y <= this.roomY + this.roomH
	) {
		return ['room'];
	}
};

Canvas.prototype.initEvents = function () {
	this.canvas.addEventListener('mousemove', function (e) {
		var coords = this.getCoordinates(e),
			x = coords[0], y = coords[1],
			area = this.getArea(x, y),
			desc;
		switch (area && area[0]) {
		case 'buttons':
			if (area[1] === 0) {
				desc = this.soundOn ? 'Turn sound off' : 'Turn sound on';
			} else {
				desc = fullscreen.is() ? 'Exit fullscreen' : 'Enter fullscreen';
			}
			this.setCursorTitle('pointer', desc);
			break;
		case 'inventory':
			desc = this.inventoryDescs[area[1]];
			desc = desc ? 'You have: ' + desc : '';
			this.setCursorTitle('', desc);
			break;
		case 'room':
			this.setCursorTitle('crosshair', '');
			break;
		default:
			this.setCursorTitle('', '');
		}
	}.bind(this));
	this.canvas.addEventListener('click', function (e) {
		var coords = this.getCoordinates(e),
			x = coords[0], y = coords[1],
			area = this.getArea(x, y);
		this.hideInfo();
		switch (area[0]) {
		case 'buttons':
			if (area[1] === 0) {
				this.soundOn = !this.soundOn;
			} else {
				fullscreen[fullscreen.is() ? 'exit' : 'enter']();
			}
			break;
		case 'room':
			this.onRoomClick(x - this.roomX + this.roomStart, this.roomH + this.roomY - y);
		}
	}.bind(this));
	this.info.addEventListener('click', function () {
		this.hideInfo();
	}.bind(this));
	window.addEventListener('resize', function () {
		this.calcSize();
	}.bind(this));
};

Canvas.prototype.showInfo = function (text) {
	this.info.textContent = text;
	this.info.style.display = '';
};

Canvas.prototype.hideInfo = function () {
	this.info.style.display = 'none';
};

Canvas.prototype.setCursorTitle = function (cursor, title) {
	this.canvas.style.cursor = cursor;
	this.canvas.title = title;
};

Canvas.prototype.setRoom = function (room, location) {
	location = room.getLocation(location || 0);
	this.room = room;
	this.player.moveTo(location[0], null, true, location[1]);
	this.calcRoomStart(true);
};

Canvas.prototype.calcRoomStart = function (immed) {
	var roomStart;
	if (this.room.width <= this.roomW) {
		roomStart = -Math.floor((this.roomW - this.room.width) / 2);
	} else {
		roomStart = Math.floor(this.player.x / (this.roomW / 2)) * (this.roomW / 2) - this.roomW / 4;
		if (roomStart < 0) {
			roomStart = 0;
		} else if (roomStart + this.roomW > this.room.width) {
			roomStart = this.room.width - this.roomW;
		}
	}
	roomStart = Math.round(roomStart);
	if (immed || Math.abs(this.roomStart - roomStart) <= 10) {
		this.roomStart = roomStart;
	} else {
		this.roomStart = this.roomStart + (roomStart > this.roomStart ? 10 : -10);
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
	this.draw(t);
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

Canvas.prototype.fadeIn = function (callback) {
	this.isFading = true;
	this.fadeStart = -1;
	this.fadeDir = 1;
	this.fadeCallback = callback;
};

Canvas.prototype.fadeOut = function (callback) {
	this.isFading = true;
	this.fadeStart = -1;
	this.fadeDir = -1;
	this.fadeCallback = callback;
};

Canvas.prototype.draw = function (t) {
	var p;
	this.ctx.fillStyle = '#000';
	this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	this.drawButtons();
	this.drawInventory();
	this.drawRoom(t);
	if (this.isFading) {
		if (this.fadeStart === -1) {
			this.fadeStart = t;
		}
		if (t - this.fadeStart >= 200) {
			this.isFading = false;
			this.fadeCallback();
		} else {
			p = (t - this.fadeStart) / 200;
			if (this.fadeDir === 1) {
				p = 1 - p;
			}
			this.ctx.fillStyle = 'rgba(0,0,0,' + p + ')';
			this.ctx.fillRect(this.roomX, this.roomY, this.roomW, this.roomH);
		}
	}
};

Canvas.prototype.drawButtons = function () {
	this.ctx.drawImage(this.sprites[this.soundOn ? 'soundOn' : 'soundOff'], this.buttonsX, this.buttonsY);
	this.ctx.drawImage(
		this.sprites[fullscreen.is() ? 'exitFullscreen' : 'enterFullscreen'],
		this.buttonsX + 26, this.buttonsY
	);
};

Canvas.prototype.drawInventory = function () {
	this.ctx.save();
	this.ctx.translate(this.inventoryX, this.inventoryY);
	this.ctx.fillStyle = '#ddd';
	this.ctx.fillRect(0, 0, INVENTORY_SIZE * this.inventoryCount, INVENTORY_SIZE);
	this.inventoryDescs = this.player.drawInventory(this.ctx, this.inventoryCount, this.sprites);
	this.ctx.restore();
};

Canvas.prototype.drawRoom = function (t) {
	this.ctx.save();
	this.ctx.beginPath();
	this.ctx.rect(this.roomX, this.roomY, this.roomW, this.roomH);
	this.ctx.clip();
	this.ctx.translate(this.roomX - this.roomStart, this.roomY);
	this.room.draw(this.ctx, this.player, this.roomH, t, this.sprites);
	this.ctx.restore();
};

Canvas.prototype.onRoomClick = function (x, y) {
	var data, text;

	function isNear (x, data) {
		return x + PLAYER_WIDTH * 0.75 >= data.x && x - PLAYER_WIDTH * 0.75 <= data.x + data.t.width;
	}

	if (!this.isDrawing || this.isFading) {
		return;
	}
	data = this.room.findThing(x, y);
	if (data && isNear(this.player.x, data)) {
		text = data.t.interact(this.room, this.player);
		if (text) {
			this.showInfo(text);
		}
		if (data.t.alwaysWalk) {
			this.player.moveTo(this.room.getLimit(this.player.x, x, PLAYER_WIDTH / 2));
		}
	} else {
		x = this.room.getLimit(this.player.x, x, PLAYER_WIDTH / 2);
		this.player.moveTo(x, data && isNear(x, data) && data.t);
	}
};

return Canvas;
})();