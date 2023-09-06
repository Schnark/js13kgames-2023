(function(){var INVENTORY_SIZE, PLAYER_HEIGHT, PLAYER_WIDTH, MIN_WIDTH, MIN_HEIGHT, MAX_HEIGHT, MAX_FACTOR, SPRITE_URL, fullscreen, audio, Thing, Player, Room, Canvas;
SPRITE_URL = 'data:image/png;base64,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';
/*global INVENTORY_SIZE: true*/
INVENTORY_SIZE = 30;
/*global PLAYER_HEIGHT: true, PLAYER_WIDTH: true*/
PLAYER_HEIGHT = 90;
PLAYER_WIDTH = 30;
/*global MIN_WIDTH: true, MIN_HEIGHT: true, MAX_HEIGHT: true, MAX_FACTOR: true*/
MIN_WIDTH = 400;
//HEIGHT includes 10px border top, INVENTORY_SIZE, 20px space between, and 10px border bottom
MIN_HEIGHT = 200;
MAX_HEIGHT = 270;
MAX_FACTOR = 5;/*global fullscreen: true*/
fullscreen =
(function () {
"use strict";

//var updateHandler;

function isFullscreen () {
	return document.fullscreenElement ||
		document.mozFullScreenElement ||
		document.webkitFullscreenElement ||
		document.msFullscreenElement ||
		document.webkitIsFullScreen;
}

function enterFullscreen () {
	var el;
	if (isFullscreen()) {
		return;
	}
	el = document.documentElement;
	if (el.requestFullscreen) {
		el.requestFullscreen();
	} else if (el.webkitRequestFullscreen) {
		el.webkitRequestFullscreen();
	} else if (el.mozRequestFullScreen) {
		el.mozRequestFullScreen();
	} else if (el.msRequestFullscreen) {
		el.msRequestFullscreen();
	}
}

function exitFullscreen () {
	if (!isFullscreen()) {
		return;
	}
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	} else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if (document.msExitFullscreen) {
		document.msExitFullscreen();
	}
}

/*
function onUpdate () {
	if (updateHandler) {
		updateHandler(isFullscreen());
	}
}

function setUpdateHandler (handler) {
	updateHandler = handler;
}

document.addEventListener('fullscreenchange', onUpdate);
document.addEventListener('webkitfullscreenchange', onUpdate);
document.addEventListener('mozfullscreenchange', onUpdate);
document.addEventListener('msfullscreenchange', onUpdate);
document.addEventListener('fullscreenerror', onUpdate);
document.addEventListener('webkitfullscreenerror', onUpdate);
document.addEventListener('mozfullscreenerror', onUpdate);
document.addEventListener('msfullscreenerror', onUpdate);
*/

return {
	is: isFullscreen,
	enter: enterFullscreen,
	exit: exitFullscreen//,
	//setUpdateHandler: setUpdateHandler
};
})();/*global audio: true*/
audio =
(function () {
"use strict";

var AC, audioContext, nodes = [], staffs;

function getFreq (note, key) {
	return key[note];
}

function getNode (time, type) {
	var i, osc, gain;
	type = type || 'sine';
	for (i = 0; i < nodes.length; i++) {
		if (nodes[i].osc.type === type && nodes[i].t < time) {
			return i;
		}
	}
	osc = audioContext.createOscillator();
	gain = audioContext.createGain();
	osc.type = type;
	gain.gain.value = 0;
	osc.connect(gain);
	gain.connect(audioContext.destination);
	osc.start();
	nodes.push({osc: osc, gain: gain});
	return nodes.length - 1;
}

function playNote (start, end, freq, volume) {
	var i = getNode(start);
	nodes[i].osc.frequency.setValueAtTime(freq, start);
	nodes[i].gain.gain.setValueAtTime(0.001, start);
	nodes[i].gain.gain.exponentialRampToValueAtTime(volume, start + 0.05);
	nodes[i].gain.gain.linearRampToValueAtTime(volume, end - 0.05);
	nodes[i].gain.gain.exponentialRampToValueAtTime(0.001, end);
	nodes[i].gain.gain.setValueAtTime(0, end + 0.01);
	nodes[i].t = end + 0.01;
}

function playNotes (notes, dur, start, key, volume) {
	var i, end = start + dur;
	for (i = 0; i < notes.length; i++) {
		playNote(start, end, getFreq(notes[i], key), volume);
	}
	return end;
}

function playStaff (staff) {
	var notes;
	while (staff.time - audioContext.currentTime < 1) {
		notes = staff.notes[staff.pos];
		if (notes[0][0] === 'z') {
			staff.time += notes[1] * staff.baseDur;
		} else {
			staff.time = playNotes(
				notes[0], notes[1] * staff.baseDur,
				staff.time,
				staff.key,
				staff.volume
			);
		}
		staff.pos = (staff.pos + 1) % staff.notes.length;
	}
}

function playStaffs () {
	var i, time;
	if (!audioContext) {
		audioContext = new AC();
	}
	for (i = 0; i < staffs.length; i++) {
		if (staffs[i].time === -1) {
			if (!time) {
				time = audioContext.currentTime + 0.1;
			}
			staffs[i].time = time;
		}
		playStaff(staffs[i]);
	}
}

function stop () {
	var i, time;
	if (!audioContext) {
		return;
	}
	time = audioContext.currentTime + 0.1;
	for (i = 0; i < nodes.length; i++) {
		nodes[i].osc.frequency.cancelScheduledValues(time);
		nodes[i].gain.gain.cancelScheduledValues(time);
		nodes[i].gain.gain.setValueAtTime(0, time);
		nodes[i].t = time;
	}
	for (i = 0; i < staffs.length; i++) {
		staffs[i].time = -1;
		staffs[i].pos = 0;
	}
}

function initStaff (notes, key, volume, baseDur) {
	staffs.push({
		time: -1,
		pos: 0,
		notes: notes,
		key: key,
		volume: volume,
		baseDur: baseDur
	});
}

function parseNotes (notes) {
	return notes.split(' ').map(function (n) {
		var l;
		n = n.split(/([\^_=]*[a-zA-Z][',]*)/);
		l = Number(n.pop() || 1);
		return [
			n.filter(function (a) {
				return a;
			}),
			l
		];
	});
}

function init (data, baseDur) {
	var i;
	staffs = [];
	for (i = 0; i < data.length; i++) {
		initStaff(parseNotes(data[i][0]), data[i][1], data[i][2], baseDur);
	}
}

function setMelody (id) {
	var cMajorOctaveLower = {
		'C,': Math.pow(2, -21 / 12) * 220,
		'D,': Math.pow(2, -19 / 12) * 220,
		'E,': Math.pow(2, -17 / 12) * 220,
		'F,': Math.pow(2, -16 / 12) * 220,
		'G,': Math.pow(2, -14 / 12) * 220,
		'A,': 0.5 * 220,
		'B,': Math.pow(2, -10 / 12) * 220,
		C: Math.pow(2, -9 / 12) * 220,
		D: Math.pow(2, -7 / 12) * 220,
		E: Math.pow(2, -5 / 12) * 220,
		F: Math.pow(2, -4 / 12) * 220,
		G: Math.pow(2, -2 / 12) * 220,
		A: 220,
		B: Math.pow(2, 2 / 12) * 220,
		c: Math.pow(2, 3 / 12) * 220,
		d: Math.pow(2, 5 / 12) * 220
	},
	bMajor2OctavesLower = {
		F: Math.pow(2, -4 / 12) * 110,
		G: Math.pow(2, -2 / 12) * 110,
		A: Math.pow(2, 1 / 12) * 110,
		B: Math.pow(2, 2 / 12) * 110,
		c: Math.pow(2, 4 / 12) * 110,
		d: Math.pow(2, 6 / 12) * 110,
		e: Math.pow(2, 7 / 12) * 110,
		f: Math.pow(2, 9 / 12) * 110,
		g: Math.pow(2, 11 / 12) * 110
	},
	dMajorOctaveLower = {
		C: Math.pow(2, -10 / 12) * 220,
		D: Math.pow(2, -8 / 12) * 220,
		E: Math.pow(2, -5 / 12) * 220,
		F: Math.pow(2, -3 / 12) * 220,
		G: Math.pow(2, -1 / 12) * 220,
		A: 220,
		B: Math.pow(2, 2 / 12) * 220,
		c: Math.pow(2, 4 / 12) * 220,
		d: Math.pow(2, 5 / 12) * 220
	},
	eMinorOctaveLower = {
		'^^F': Math.pow(2, -2 / 12) * 220,
		G: Math.pow(2, -1 / 12) * 220,
		A: 220,
		'^A': Math.pow(2, 1 / 12) * 220,
		B: Math.pow(2, 2 / 12) * 220,
		'^B': Math.pow(2, 3 / 12) * 220,
		c: Math.pow(2, 4 / 12) * 220,
		d: Math.pow(2, 6 / 12) * 220,
		e: Math.pow(2, 7 / 12) * 220,
		'^e': Math.pow(2, 8 / 12) * 220,
		f: Math.pow(2, 9 / 12) * 220,
		g: Math.pow(2, 11 / 12) * 220,
		a: 2 * 220
	},
	gMajorOctaveLower = {
		'B,': Math.pow(2, -10 / 12) * 220,
		C: Math.pow(2, -9 / 12) * 220,
		D: Math.pow(2, -7 / 12) * 220,
		F: Math.pow(2, -3 / 12) * 220,
		G: Math.pow(2, -2 / 12) * 220,
		A: 220,
		'_B': Math.pow(2, 1 / 12) * 220,
		B: Math.pow(2, 2 / 12) * 220,
		c: Math.pow(2, 3 / 12) * 220,
		'^c': Math.pow(2, 4 / 12) * 220,
		d: Math.pow(2, 5 / 12) * 220
	},

	//jscs:disable maximumLineLength
	//j1 to j4 based on random melodies from the Jenaer Liederhandschrift
	j1 = 'C C0.5 E0.5 E E E D D0.5 C0.5 C C D D C z0.5 E0.5 E E0.5 E E E D D0.5 C0.5 C C A, C C0.5 A,0.5 B,0.5 G,0.5 A, A, C C C D D G,0.5 F,0.5 F, G, A, A, C A, F, A, B,0.5 A,0.5 G,0.5 G,0.5 F,0.5 F,',
	j2 = 'A c c c d0.5 B0.5 c c0.5 B0.5 A0.5 G0.5 G G A B A G G A0.5 G0.5 c0.5 G0.5 B0.5 G0.5 c c d0.5 c0.5 c c0.5 B0.5 A0.5 G0.5 G c G F E0.5 D0.5 C0.5 E0.5 A,',
	j3 = 'A, B, C D C0.5 B,0.5 C0.5 D0.5 C G,0.5 B,0.5 C C A, A, F,0.5 G,0.5 A, G, C,0.5 E,0.5 C, D, F, F, F,0.5 G,0.5 A, G, A, B, C D C0.5 B,0.5 C0.5 D0.5 C G,0.5 B,0.5 C C A, A, F,0.5 G,0.5 G,',
	j4 = 'A, C D E E0.5 D0.5 E E0.5 A,0.5 C C D C B,0.5 A,0.5 A, C D E E B, C D C0.5 B,0.5 C B,0.5 A,0.5 B, C A, G,0.5 A,0.5 C A,0.5 G,0.5 C D E E B, C A,',
	//w1 to w4 based on melodies from Tannhäuser by Richard Wagner
	w1 = 'f2 d1.75 B0.25 B c0.25 B0.25 A0.25 c0.25 f e d1.5 B0.5 d0.75 c0.25 B0.75 A0.25 B2 F z g2 e1.75 c0.25 c d0.25 c0.25 B0.25 c0.25 g f d1.5 B0.5 f0.5 e0.5 G0.75 c0.25 B2 A z d2 B1.5 F0.5 F3 F f2 d1.5 B0.5 B2 B2 g2 e1.5 c0.5 g f e d f e d c B2 z2',
	w2 = 'A d3 c B A G1.5 F0.5 A2 G z G2 F E B3 A D2 F2 A2 z A D3 C B A G1.5 F0.5 A2 G z2 E F G F3 B d2 c2 B2 z3',
	w3 = 'e2 ^^F0.5 G0.5 B0.5 e0.5 g2 f2 d B e e f1.5 d0.5 B0.5 z0.5 B0.5 B2 e0.5 d0.5 e0.5 ^e0.5 f3 f0.5 g0.5 a d0.5 e0.5 f A G2 z2 e2 ^^F0.5 G0.5 B0.5 e0.5 g2 f2 d B e e f1.5 d0.5 B0.5 z0.5 B B1.5 ^B0.5 c0.5 d0.5 e0.5 f0.5 g2 f d B c0.5 d0.5 e1.5 ^A0.5 B2 z2',
	w4 = 'G1.5 d ^c0.5 c1.75 B0.5 _B1.5 B A0.5 G3 G1.5 F G0.5 B1.5 B G0.5 D2.5 C0.5 B,3 z';
	//jscs:enable maximumLineLength

	stop();
	switch (id) {
	case 1:
		init([[j1, cMajorOctaveLower, 0.15]], 60 / 100); //cellar
		break;
	case 2:
		init([[j2, cMajorOctaveLower, 0.15]], 60 / 100); //small
		break;
	case 3:
		init([[j3, cMajorOctaveLower, 0.15]], 60 / 100); //dungeon
		break;
	case 4:
		init([[j4, cMajorOctaveLower, 0.15]], 60 / 100); //living
		break;
	case 5:
		init([[w1, bMajor2OctavesLower, 0.15]], 60 / 120); //kitchen
		break;
	case 6:
		init([[w2, dMajorOctaveLower, 0.15]], 60 / 120); //armory
		break;
	case 7:
		init([[w3, eMinorOctaveLower, 0.15]], 60 / 120); //outro
		break;
	case 8:
		init([[w4, gMajorOctaveLower, 0.15]], 60 / 80); //large
	}
}

AC = window.AudioContext || window.webkitAudioContext;

return {
	setMelody: setMelody,
	stop: stop,
	tick: AC ? playStaffs : function () {}
};

})();
/*//Test:
audio.setMelody(7);
window.setInterval(audio.tick, 50);
//*/
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
})();/*global Player: true*/
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
	y = height - PLAYER_HEIGHT - 4;
	if (this.x !== this.dest) {
		sprite = Math.floor(t * PLAYER_SPEED / PLAYER_WIDTH * 2) % 2 ? sprites.person0 : sprites.person1;
		if (Math.floor(t * PLAYER_SPEED / PLAYER_WIDTH * 2) % 2 === 0) {
			y -= 1;
		}
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
})();/*global Room: true*/
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
})();/*global Canvas: true*/
/*global INVENTORY_SIZE, PLAYER_WIDTH, MIN_WIDTH, MIN_HEIGHT, MAX_HEIGHT, MAX_FACTOR, SPRITE_URL, fullscreen, audio*/
Canvas =
(function () {
"use strict";

var rAF = window.requestAnimationFrame || window.mozRequestAnimationFrame;

function Canvas (canvas, info) {
	this.canvas = canvas;
	this.info = info;
	this.soundOn = true;
	this.hideInfo();
	this.ctx = canvas.getContext('2d', {alpha: false});
	this.calcSize();
	this.initEvents();
}

Canvas.prototype.setPlayer = function (player) {
	this.player = player;
};

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

	h = (this.roomY / 2 * f) - 20;
	h += 'px';
	this.info.style.paddingTop = h;
	this.info.style.paddingBottom = h;
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
	if (this.isOutro) {
		//only handle buttons during outro
		return null;
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
				if (!this.soundOn) {
					audio.stop();
				}
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
	if (room.melody) {
		audio.setMelody(room.melody);
	}
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
	rAF(function (t) {
		this.startTime = t;
		this.prevTime = t;
		this.onAnimationFrame(t);
	}.bind(this));
};

Canvas.prototype.onAnimationFrame = function (t) {
	var text;
	if (!this.isIntro && this.soundOn) {
		audio.tick();
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
	if (this.isIntro) {
		this.drawRoom(t);
		return;
	}
	this.drawButtons();
	if (!this.isOutro) {
		this.drawInventory();
	}
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
	if (this.room.width <= this.roomW) {
		//this might still be wrong while resizing, but we just don't care
		this.ctx.rect(this.roomX + Math.floor((this.roomW - this.room.width) / 2), this.roomY, this.room.width, this.roomH);
	} else {
		this.ctx.rect(this.roomX, this.roomY, this.roomW, this.roomH);
	}
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

	if (this.isFading) {
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
})();/*global Canvas, Room, Player, Thing*/
(function () {
"use strict";

var introCover = document.getElementById('intro'), start = document.getElementById('start'),
	canvas = new Canvas(document.getElementById('canvas'), document.getElementById('info')),
	//rooms
	dungeon, cellar, kitchen, armory, living, small, large,
	intro, outro,

	//items - take
	key0, key1, torch,
	helmet, sword, shield, scroll,
	herring, bone,
	//items - general
	shelf, window, doorKnob, torchHolder,
	//itmes - dungeon
	dungeonLadderUp,
	door,
	//items - cellar
	cellarStairsUp,
	//items - kitchen
	cellarStairsDown, doorToArmory, dungeonLadderDown, kitchenStairsUp,
	fixedTorch, wood, fire, chimney,
	//items - armory
	doorFromArmory,
	fixedSword, fixedHelmet,
	//itmes - living
	livingStairsUp, kitchenStairsDown,
	tapestry, fixedTapestry, panel, horizontal, vertical,
	//items - small
	smallLadderUp,
	//items - large
	smallLadderDown, livingStairsDown,
	dog, lady,
	//items - intro
	tower, wall, drawbridge, merlon;

function changeRoom (room, location) {
	canvas.fadeOut(function () {
		canvas.setRoom(room, location);
		canvas.fadeIn(function () {});
	});
}

key0 = new Thing(
	16, 12,
	'take',
	{
		text: 'A key',
		sprite: 'key'
	}
);
key1 = new Thing(
	16, 12,
	'take',
	{
		text: 'A second key',
		sprite: 'key'
	}
);
torch = new Thing(
	12, 40,
	'take',
	{
		text: 'A torch',
		sprite: 'torch',
		animate: 2,
		light: true
	}
);
helmet = new Thing(
	16, 16,
	'take',
	{
		text: 'Your helmet',
		sprite: 'helmet'
	}
);
sword = new Thing(
	24, 24,
	'take',
	{
		text: 'Your sword',
		sprite: 'sword'
	}
);
shield = new Thing(
	24, 24,
	'take',
	{
		text: 'Your shield',
		sprite: 'shield'
	}
);
scroll = new Thing(
	24, 7,
	'take',
	{
		text: 'The scroll with your Minnelied',
		sprite: 'scroll'
	}
);
herring = new Thing(
	16, 9,
	'take',
	{
		text: 'A herring',
		sprite: 'herring'
	}
);
bone = new Thing(
	16, 10,
	'take',
	{
		text: 'A bone with some meat',
		sprite: 'bone'
	}
);

shelf = new Thing(30, 5, '', {pattern: 'wood'});
window = new Thing(25, 50, '', {sprite: 'window'});
doorKnob = new Thing(4, 4, '', {sprite: 'doorKnob'});
torchHolder = new Thing(8, 17, '', {sprite: 'holder'});

//dungeon
//- dark, lit by torch or player
//- start on the left, ladder up to kitchen on right
//- key0 for door far left
//- locked door in middle
//- shield far right

dungeonLadderUp = new Thing(
	24, 195,
	function () {
		changeRoom(kitchen, 2);
		return 'You climb up the ladder.';
	}, {
		pattern: 'ladder'
	}
);
door = new Thing(
	22, 195,
	function (room, player) {
		if (this.state) {
			return 'The door is open.';
		}
		if (player.hasThing(key0)) {
			this.state = true;
			this.blocksPath = false;
			this.pattern = 'door1';
			this.width = 52;
			return 'You unlock the door with the key.';
		}
		return 'The door is locked.';
	}, {
		pattern: 'door0',
		alwaysWalk: true,
		blocksPath: true
	}
);

dungeon = new Room(680, 3);
dungeon.light = [200, 95];
dungeon.addLocation(150);
dungeon.addLocation(512, true);
dungeon.addThing(key0, 5, 20);
dungeon.addThing(torch, 200, 115);
dungeon.addThing(torchHolder, 202, 92);
dungeon.addThing(door, 300, 200);
dungeon.addThing(dungeonLadderUp, 500, 200);
dungeon.addThing(shield, 650, 34);

//cellar
//- dark, lit by player
//- stairs up to kitchen on left
//- herring, sword, bone on shelves

cellarStairsUp = new Thing(
	22, 204,
	function () {
		changeRoom(kitchen);
		return 'You go upstairs.';
	}, {
		sprite: 'stairsUpLeftBottom',
		pattern: 'stairsUpLeft'
	}
);

cellar = new Room(500, 1);
cellar.light = [9, 200];
cellar.addLocation(37);
cellar.addThing(cellarStairsUp, 0, 204);
cellar.addThing(shelf, 50, 75);
cellar.addThing(shelf, 150, 75);
cellar.addThing(shelf, 250, 75);
cellar.addThing(shelf, 350, 75);
cellar.addThing(shelf, 450, 75);
cellar.addThing(herring, 57, 84);
cellar.addThing(sword, 253, 97);
cellar.addThing(bone, 457, 85);

//kitchen
//- lit by fire in chimney and fixed torches
//- stairs down to cellar on left
//- locked door to armory in middle
//- ladder down to dungeon on right
//- stairs up to living on right

cellarStairsDown = new Thing(
	34, 200,
	function () {
		changeRoom(cellar);
		return 'You go downstairs.';
	}, {
		sprite: 'stairsDownLeftBottom',
		pattern: 'stairsDownLeft'
	}
);
doorToArmory = new Thing(
	48, 120,
	function (room, player) {
		if (player.hasThing(key1)) {
			changeRoom(armory);
			return 'You unlock the door with the second key and enter the room.';
		}
		//at this point we can be sure that the player has key0,
		//so there is no need for different messages
		return 'The door is locked and your key does not fit.';
	}, {
		pattern: 'wood',
		alwaysWalk: true
	}
);
dungeonLadderDown = new Thing(
	24, 21,
	function () {
		changeRoom(dungeon, 1);
		return 'You climb down the ladder.';
	}, {
		sprite: 'ladderTop'
	}
);
kitchenStairsUp = new Thing(
	22, 204,
	function () {
		changeRoom(living, 1);
		return 'You go upstairs.';
	}, {
		sprite: 'stairsUpRightBottom',
		pattern: 'stairsUpRight'
	}
);

fixedTorch = new Thing(12, 40, '', {sprite: 'torch', animate: 2});
wood = new Thing(80, 5, '', {pattern: 'wood'});
fire = new Thing(12, 14, '', {sprite: 'flame', animate: 2});
chimney = new Thing(100, 60, '', {pattern: 'stone'});

kitchen = new Room(680, 5);
kitchen.addLocation(45);
kitchen.addLocation(270);
kitchen.addLocation(512);
kitchen.addLocation(643, true);
kitchen.addThing(cellarStairsDown, -4, 200);
kitchen.addThing(fixedTorch, 50, 115);
kitchen.addThing(torchHolder, 52, 92);
kitchen.addThing(chimney, 90, 70);
kitchen.addThing(wood, 100, 19);
kitchen.addThing(fire, 100, 30);
kitchen.addThing(fire, 105, 35);
kitchen.addThing(fire, 110, 32);
kitchen.addThing(fire, 116, 38);
kitchen.addThing(fire, 121, 29);
kitchen.addThing(fire, 124, 45);
kitchen.addThing(fire, 127, 36);
kitchen.addThing(fire, 130, 31);
kitchen.addThing(fire, 135, 38);
kitchen.addThing(fire, 137, 44);
kitchen.addThing(fire, 140, 30);
kitchen.addThing(fire, 146, 36);
kitchen.addThing(fire, 149, 45);
kitchen.addThing(fire, 150, 32);
kitchen.addThing(fire, 155, 39);
kitchen.addThing(fire, 161, 29);
kitchen.addThing(fire, 167, 35);
kitchen.addThing(fire, 170, 31);
kitchen.addThing(doorToArmory, 246, 130);
kitchen.addThing(doorKnob, 285, 75);
kitchen.addThing(fixedTorch, 330, 115);
kitchen.addThing(torchHolder, 332, 92);
kitchen.addThing(fixedTorch, 400, 115);
kitchen.addThing(torchHolder, 402, 92);
kitchen.addThing(fixedTorch, 470, 115);
kitchen.addThing(torchHolder, 472, 92);
kitchen.addThing(dungeonLadderDown, 499, 21);
kitchen.addThing(fixedTorch, 540, 115);
kitchen.addThing(torchHolder, 542, 92);
kitchen.addThing(fixedTorch, 610, 115);
kitchen.addThing(torchHolder, 612, 92);
kitchen.addThing(kitchenStairsUp, 658, 204);

//armory
//- dark, lit by player
//- door to kitchen in middle
//- many fixed swords and helmets and the scroll on shelves
doorFromArmory = new Thing(
	48, 120,
	function () {
		changeRoom(kitchen, 1);
		return 'You leave the armory.';
	}, {
		pattern: 'wood'
	}
);

fixedHelmet = new Thing(16, 16, 'text', {text: 'This is not your helmet, so you leave it there.', sprite: 'helmet'});
fixedSword = new Thing(24, 24, 'text', {text: 'This is not your sword, so you leave it there.', sprite: 'sword'});

armory = new Room(440, 6);
armory.light = [220, 200];
armory.addLocation(220);

armory.addThing(shelf, 20, 65);
armory.addThing(fixedHelmet, 20, 81);
armory.addThing(scroll, 25, 72);
armory.addThing(shelf, 20, 100);
armory.addThing(fixedHelmet, 35, 116);
armory.addThing(fixedSword, 20, 122);
armory.addThing(shelf, 70, 65);
armory.addThing(fixedSword, 70, 87);
armory.addThing(fixedHelmet, 85, 81);
armory.addThing(shelf, 70, 100);
armory.addThing(fixedHelmet, 70, 116);
armory.addThing(fixedHelmet, 85, 116);
armory.addThing(shelf, 120, 65);
armory.addThing(fixedHelmet, 120, 81);
armory.addThing(fixedHelmet, 135, 81);
armory.addThing(shelf, 120, 100);
armory.addThing(fixedSword, 120, 122);
armory.addThing(fixedHelmet, 135, 116);
armory.addThing(doorFromArmory, 196, 130);
armory.addThing(doorKnob, 235, 75);
armory.addThing(shelf, 290, 65);
armory.addThing(fixedHelmet, 290, 81);
armory.addThing(fixedHelmet, 305, 81);
armory.addThing(shelf, 290, 100);
armory.addThing(fixedHelmet, 305, 116);
armory.addThing(fixedSword, 290, 122);
armory.addThing(shelf, 340, 65);
armory.addThing(fixedSword, 340, 87);
armory.addThing(fixedHelmet, 355, 81);
armory.addThing(shelf, 340, 100);
armory.addThing(fixedHelmet, 340, 116);
armory.addThing(fixedHelmet, 355, 116);
armory.addThing(shelf, 390, 65);
armory.addThing(fixedHelmet, 390, 81);
armory.addThing(fixedHelmet, 405, 81);
armory.addThing(shelf, 390, 100);
armory.addThing(fixedSword, 390, 122);
armory.addThing(fixedHelmet, 405, 116);

//living
//- lit by windows
//- stairs up to large on left, stairs down to kitchen on right
//- several tapestries, one with hiding place with helmet
livingStairsUp = new Thing(
	22, 204,
	function () {
		changeRoom(large, 1);
		return 'You go upstairs.';
	}, {
		sprite: 'stairsUpLeftBottom',
		pattern: 'stairsUpLeft'
	}
);
kitchenStairsDown = new Thing(
	34, 200,
	function () {
		changeRoom(kitchen, 3);
		return 'You go downstairs.';
	}, {
		sprite: 'stairsDownRightBottom',
		pattern: 'stairsDownRight'
	}
);

tapestry = new Thing(
	45, 45,
	function () {
		if (this.state) {
			this.state = false;
			this.width = 45;
			return 'You put the tapestry back.';
		}
		this.state = true;
		this.width = 5;
		return 'You find a hiding place behind the tapestry!';
	}, {
		pattern: 'tapestry'
	}
);
fixedTapestry = new Thing(45, 45, 'text', {
	pattern: 'tapestry',
	text: 'This is a nice tapestry, but there is nothing special about this one.',
	alwaysWalk: true
});
horizontal = new Thing(41, 4, '', {pattern: 'stone'});
vertical = new Thing(4, 41, '', {pattern: 'stone'});
panel = new Thing(33, 33, '', {pattern: 'wood'});

living = new Room(700, 4);
living.addLocation(37);
living.addLocation(655, true);
living.addThing(livingStairsUp, 0, 204);
living.addThing(window, 50, 130);
living.addThing(fixedTapestry, 118, 130);
living.addThing(window, 205, 130);
living.addThing(fixedTapestry, 273, 130);
living.addThing(window, 350, 130);
living.addThing(panel, 424, 124);
living.addThing(helmet, 428, 106);
living.addThing(horizontal, 420, 128);
living.addThing(horizontal, 420, 91);
living.addThing(vertical, 420, 128);
living.addThing(vertical, 457, 128);
living.addThing(tapestry, 418, 130);
living.addThing(window, 495, 130);
living.addThing(fixedTapestry, 563, 130);
living.addThing(window, 640, 130);
living.addThing(kitchenStairsDown, 670, 200);

//small
//- lit by window
//- ladder up to large on left
//- key for door to armory
smallLadderUp = new Thing(
	24, 195,
	function () {
		changeRoom(large);
		return 'You climb up the ladder.';
	}, {
		pattern: 'ladder'
	}
);

small = new Room(200, 2);
small.addLocation(32);
small.addThing(smallLadderUp, 20, 200);
small.addThing(window, 120, 130);
small.addThing(key1, 170, 20);

//large
//- lit by windows
//- ladder down to small on left, stairs down to living in middle
//- dog waiting for bone guarding ladder
//- lady on right
smallLadderDown = new Thing(
	24, 21,
	function () {
		changeRoom(small);
		return 'You climb down the ladder.';
	}, {
		sprite: 'ladderTop'
	}
);
livingStairsDown = new Thing(
	34, 200,
	function () {
		changeRoom(living);
		return 'You go downstairs.';
	}, {
		sprite: 'stairsDownRightBottom',
		pattern: 'stairsDownRight'
	}
);

dog = new Thing(
	30, 16,
	function (room, player) {
		var text = 'The dog looks small but vicious and won’t let you pass.';
		if (this.state) {
			return 'The dog is eating and ignores you.';
		}
		if (player.hasThing(bone)) {
			this.state = true;
			this.blocksPath = false;
			//the height is actually a bit smaller, but it doesn't really matter
			this.sprite = 'dog1';
			player.removeThing(bone);
			return 'You throw the bone to the dog, and it starts eating.';
		}
		if (player.hasThing(herring)) {
			text += ' (The dog doesn’t like fish.)';
		}
		return text;
	}, {
		sprite: 'dog0',
		blocksPath: true,
		alwaysWalk: true
	}
);
lady = new Thing(
	24, 90,
	function (room, player) {
		if (!player.hasThing(sword)) {
			return 'Lady Sylvie: “I don’t believe you are a knight if you don’t carry a sword!”';
		}
		if (!player.hasThing(shield)) {
			return 'Lady Sylvie: “I don’t believe you are a knight if you don’t carry a shield!”';
		}
		if (!player.hasThing(helmet)) {
			return 'Lady Sylvie: “I don’t believe you are a knight if you don’t wear a helmet!”';
		}
		if (!player.hasThing(scroll)) {
			//jscs:disable maximumLineLength
			return 'Lady Sylvie: “You look to nervous to sing your Minnelied without the scroll with your notes to remember it!”';
			//jscs:enable maximumLineLength
		}
		changeRoom(outro);
		canvas.isOutro = true;
		return 'You successfully helped Sir Bruno on his mission! Well done and thank you for playing!';
	}, {
		sprite: 'lady',
		blocksPath: true
	}
);

large = new Room(560, 8);
large.addLocation(32);
large.addLocation(335, true);

large.addThing(smallLadderDown, 19, 21);
large.addThing(window, 50, 130);
large.addThing(dog, 150, 21);
large.addThing(window, 170, 130);
large.addThing(livingStairsDown, 350, 200);
large.addThing(window, 290, 130);
large.addThing(lady, 510, 95);
large.addThing(window, 410, 130);
large.addThing(window, 530, 130);

//intro
tower = new Thing(45, 132, '', {pattern: 'bg'});
wall = new Thing(90, 84, '', {pattern: 'bg'});
drawbridge = new Thing(60, 75, '', {pattern: 'wood'});
merlon = new Thing(15, 8, '', {pattern: 'stone'});

intro = new Room(250);
intro.isOutside = true;
intro.addLocation(-30);
intro.addThing(tower, 35, 172);
intro.addThing(merlon, 35, 180);
intro.addThing(merlon, 65, 180);
intro.addThing(wall, 80, 124);
intro.addThing(drawbridge, 95, 115);
intro.addThing(doorKnob, 97, 113); //well, some thing to fix the drawbridge to a chain or something
intro.addThing(doorKnob, 149, 113);
intro.addThing(merlon, 80, 132);
intro.addThing(merlon, 117, 132);
intro.addThing(merlon, 155, 132);
intro.addThing(tower, 170, 172);
intro.addThing(merlon, 170, 180);
intro.addThing(merlon, 200, 180);

//outro
outro = new Room(90, 7);
outro.addLocation(25);
outro.addThing(lady, 53, 95);

canvas.loadSprites({
	bg: [0, 0, 24, 24, 'repeat'],
	floor: [71, 33, 7, 3, 'repeat'],
	wood: [48, 12, 7, 3, 'repeat'],
	stone: [55, 12, 7, 3, 'repeat'],
	person0: [0, 24, 30, 90],
	person1: [0, 114, 30, 90],
	keyInv: [24, 0, 24, 24],
	key: [48, 0, 16, 12],
	window: [30, 24, 25, 50],
	torch0: [30, 74, 12, 40],
	torch1: [42, 74, 12, 40],
	torchInv: [54, 142, 24, 24],
	flame0: [30, 74, 12, 14],
	flame1: [42, 74, 12, 14],
	helmetInv: [64, 0, 24, 24],
	helmetPlayer: [48, 15, 12, 9],
	helmet: [55, 24, 16, 16],
	swordInv: [64, 40, 24, 24],
	swordPlayer: [55, 40, 10, 22],
	sword: [64, 40, 24, 24],
	shieldInv: [64, 64, 24, 24],
	shield: [64, 64, 24, 24],
	tapestry: [71, 24, 9, 9, 'repeat'],
	ladder: [64, 88, 24, 16, 'repeat'],
	ladderTop: [63, 88, 26, 26],
	enterFullscreen: [88, 0, 16, 16],
	exitFullscreen: [88, 16, 16, 16],
	soundOn: [88, 32, 16, 16],
	soundOff: [88, 48, 16, 16],
	lady: [30, 114, 24, 90],
	dog0: [54, 114, 30, 16],
	dog1: [54, 130, 30, 12],
	scroll: [54, 190, 24, 7],
	scrollInv: [54, 166, 24, 24],
	herring: [88, 64, 16, 9],
	herringInv: [78, 142, 24, 24],
	bone: [88, 73, 16, 10],
	boneInv: [78, 161, 24, 24],
	stairsUpRightBottom: [90, 114, 22, 28],
	stairsUpRight: [90, 92, 22, 22, 'repeat'],
	stairsUpLeftBottom: [90, 114, 22, 28, '', true],
	stairsUpLeft: [90, 92, 22, 22, 'repeat', true],
	stairsDownRightBottom: [78, 194, 34, 10],
	stairsDownRight: [78, 185, 34, 9, 'repeat'],
	stairsDownLeftBottom: [78, 194, 34, 10, '', true],
	stairsDownLeft: [78, 185, 34, 9, 'repeat', true],
	door0: [54, 197, 10, 5, 'repeat'],
	door1: [64, 197, 10, 5, 'repeat'],
	doorKnob: [88, 83, 4, 4],
	holder: [104, 73, 8, 17]
},
function () {
	var introPlayer = new Player();
	introPlayer.addThing(sword);
	introPlayer.addThing(helmet);
	canvas.setPlayer(introPlayer);
	canvas.setRoom(intro);
	canvas.isIntro = true;
	canvas.startDraw();
	introPlayer.moveTo(125);
	start.addEventListener('click', function () {
		introCover.style.display = 'none';
		canvas.isIntro = false;
		canvas.setPlayer(new Player());
		canvas.setRoom(dungeon);
	});
});

})();})()
