/*global audio: true*/
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
