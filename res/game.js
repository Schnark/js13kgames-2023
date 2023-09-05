/*global Canvas, Room, Player, Thing*/
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

})();