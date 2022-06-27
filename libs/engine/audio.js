
/**
 * Класс для управления звуками в игре
 */
class AudioApi
{

	constructor(musicVolume = 0.5, soundVolume = 0.5) {  

		this.music = document.createElement('audio');
		this.music.setAttribute('allow', 'autoplay')
		this.music.volume = musicVolume;
		this.music.loop = true;

		this.music.onloadstart = function() {
			console.log("this.music.onloadstart");
			//Audio.music.volume = 0;
		};


		this.music.onplaying = function() {
			console.log("onplaying");
			//Audio.music.volume = 0;

		};


		this.sound  = document.createElement('audio');
		this.sound.setAttribute('allow', 'autoplay')
		this.sound.volume = soundVolume;

	}

	/**
	 *
	 * @param {string} name 
	 */
	playMusic(name) {
		
		let blob = Preload.get(name);

		if (blob !== null) {
			this.music.setAttribute('src', blob);
			this.music.play();
		}
	}

	pauseMusic() {

		if (this.music.paused) {
			this.music.play()
		} else {

			// дописать плавное звтухание и стоп музыки
			this.music.pause()
		}
	}


	playSound(name) {

		if (name === false || name === null) {
			return;
		}

		let blob = Preload.get(name);

		if (blob !== null) {
			this.sound.setAttribute('src', blob);
			this.sound.play();
		}
	}

}


