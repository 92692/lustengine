
/* 
	ENVIRONMENT 
*/


var Audio    = null;
var Preload  = null;
var Menu	 = null;
var Dialog	 = null;
var Display  = null;
var iconMain = null;
var iconMap  = null;
var map  	 = null;
var Stats = {
	'sex': 'female',
	'lust_cur': 0,
	'lust_max': 3,
	'skills': [],
	'cache' : 0,
};
var SkillCheck = {
	'enabled': false,
	'pressed': false,
	'success': 0,
	'fails'	 : 0,
}

/* 
		MACROS 
*/
var img 	  = function(){};
var music	  = function(){};
var sound	  = function(){};
var say		  = function(){};
var getTexture= function(){};
var getSprite = function(){};

function сlick() {
	Audio.playSound('click.mp3');
}

function flick() {
	Audio.playSound('flick.wav');
}



$(document).ready(function () {
	
	Audio 	 = new AudioApi();
	Preload  = new PreloadApi();
	Menu	 = new MenuApi();
	Display  = new DisplayApi();
	Dialog	 = new DialogApi();
	iconMain = new IconApi();
	iconMap  = new IconApi();

	/* SHORT API SET */
	img 	  = async function (name) { await Display.img(name) }
	music	  = function (name) { Audio.playMusic(name) }
	sound	  = function (name) { Audio.playSound(name) }
	say		  = async function (name, text) { await Dialog.say(name, text) }
	getTexture= async function (name) { return await PIXI.Texture.fromURL(Preload.get(name)) }
	getSprite = async function (name) { return new PIXI.Sprite(await getTexture(name))}

	Display.load();
	Dialog.load();
	Menu.loadOptions();

	// HOTKEYS
	document.onkeydown = function(e) {


		console.log('KEY EVENT: ' + event.key + '/' + event.code);


		// Escape
		if(e.keyCode === 27){Menu.Esc();}

		// Enter
		if(e.keyCode === 13){Dialog.sayClick();}

		// Space
		if(e.key === " " || e.code === "Space") {

			if (SkillCheck.enabled) {
				SkillCheck.pressed = true;

			} else {
				Dialog.sayClick();
			}
		}

		// Press D
		if(e.keyCode === 68) {
			scriptDebug();
		}


	}

	initGame();
});
 













 






 