

class SoundApi
{

	constructor() {

		this.music 			= new Audio();
		this.ambient		= new Audio();
		this.music.loop		= true;
		this.ambient.loop	= true;
		this.volumeSound	= 1;
		this.volumeFadeSec	= 1;
		this.audioCache		= [];
		this.blockMusic		= false;
		this.blockAmbient	= false;
	}

	set volumeMusic(value) {
		this.music.volume = value;
		this.ambient.volume = value;
	}

	get volumeMusic() {
		return this.music.volume;
	}

	getAudio(unicalName, volume, loop) {

		for (let i=0; i<this.audioCache.length; i++) {
			if (this.audioCache[i].unicalName === unicalName) {
				this.audioCache[i].volume = volume;
				return this.audioCache[i];
			}
		}

		let audio = new Audio(Preload.get(unicalName))
		audio.unicalName = unicalName;
		audio.volume = volume;
		audio.loop = loop;
		this.audioCache.push(audio);

		return audio;
	}

	fadeIn(audio) {

		let parts = 30;
		let ms = Math.ceil((this.volumeFadeSec * 1000) / parts);
		let volume = audio.volume;
		let vol = volume / 30;

		return new Promise(async (resolve, reject) => {

			audio.volume = 0;
			audio.play();

			for (let i=0; i<parts; i++) {
				audio.volume = (vol * i);
				await sleep(ms);
			}

			audio.volume = volume;
			resolve(1);
		});
	}

	fadeOut(audio) {

		let parts = 30;
		let ms = Math.ceil((this.volumeFadeSec * 1000) / parts);
		let volume = audio.volume;
		let vol = volume / 30;

		return new Promise(async (resolve, reject) => {

			for(let i=parts; i>0; i--) {
				audio.volume = (vol * i);
				await sleep(ms);
			}

			audio.pause();
			audio.currentTime=0;
			audio.volume = volume;
			resolve(1);
		});
	}

	async playMusic(name) {

		let unicalName = Preload.getUnicalName(name);

		while (this.blockMusic) {
			await sleep(50)
		}

		this.blockMusic = true;

		if (this.music.unicalName === unicalName) {

			if (this.music.paused) {
				await this.fadeIn(this.music);
			}

			this.blockMusic = false;
			return;
		}

		if (!this.music.paused) {
			await this.fadeOut(this.music);
		}

		this.music = this.getAudio(unicalName, this.volumeMusic, true)
		this.music.currentTime = 0;
		await this.fadeIn(this.music);
		this.blockMusic = false;
		console.debug('[done] playMusic')
	}

	async playAmbient(name) {

		let unicalName = Preload.getUnicalName(name);

		while (this.blockAmbient) {
			await sleep(50)
		}

		this.blockAmbient = true;

		if (this.ambient.unicalName === unicalName) {

			if (this.ambient.paused) {
				await this.fadeIn(this.ambient);
			}

			this.blockAmbient = false;
			return;
		}

		if(!this.ambient.paused) {
			await this.fadeOut(this.ambient);
		}

		this.ambient = this.getAudio(unicalName, this.volumeMusic, true)
		this.ambient.currentTime = 0;
		await this.fadeIn(this.ambient);
		this.blockAmbient = false;
		console.debug('[done] playAmbient')
	}

	playSound(name) {

		if (name === null || name === false) {
			return;
		}

		let unicalName = Preload.getUnicalName(name);
		let audio = this.getAudio(unicalName, this.volumeSound, false);

		audio.pause();
		audio.currentTime = 0;
		audio.play();
	}

	async stopMusic() {

		while (this.blockMusic) {
			await sleep(50)
		}

		this.blockMusic = true;
		await this.fadeOut(this.music);
		this.blockMusic = false;

		console.debug('[done] stopMusic')
	}

	async stopAmbient() {

		while (this.blockAmbient) {
			await sleep(50)
		}

		this.blockAmbient = true;
		await this.fadeOut(this.ambient);
		this.blockAmbient = false;

		console.debug('[done] stopAmbient')
	}





}







