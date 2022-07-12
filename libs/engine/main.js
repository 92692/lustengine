
/* 
	ENVIRONMENT 
*/
const Sound 	 = new SoundApi();
const SkillCheck = new SkillCheckApi();
const Preload	 = new PreloadApi();
const Menu	 	 = new MenuApi();
const Dialog	 = new DialogApi();
const Display	 = new DisplayApi();
const iconMain	 = new IconApi();
const iconMap	 = new IconApi();
var map			 = null;

var Stats = {
	'sex': 'female',
	'lust_cur': 0,
	'lust_max': 3,
	'skills': [],
	'cache' : 0,
};


/* 
		MACROS 
*/
async function getTexture (name) {
	return await PIXI.Texture.fromURL(Preload.get(name))
}

async function getSprite (name) {
	 return new PIXI.Sprite(await getTexture(name))
}

async function img(name) {

	let item = Preload.getRaw(name);

	if (item.music !== null) {
		Sound.playMusic(item.music)
	}

	if (item.ambient !== null) {
		Sound.playAmbient(item.ambient)
	}

	await Display.img(name)
}

async function music(name) { await Sound.playMusic(name) }
function sound(name) { Sound.playSound(name) }
async function say(name, text) { await Dialog.say(name, text) }



function click() {
	Sound.playSound('click.mp3');
}

function flick() {
	Sound.playSound('flick.wav');
}


$(function() {


	Display.load();
	Dialog.load();
	Menu.loadOptions();
	iconMain.load();
	iconMap.load();


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
 













 






 