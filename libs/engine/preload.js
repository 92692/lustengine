
var preloadFiles = [];

class PreloadFile {

	constructor(url, blob, options = {}) {

		this.url 		= url;
		this.blob 		= blob;
		this.options 	= options;
		this.name 		= url.split('/').pop().split('.')[0];
		this.unicalName = url;
		this.rule 		= null;
		this.music 		= options.hasOwnProperty('music') ? options.music : null;
		this.ambient 	= options.hasOwnProperty('ambient') ? options.ambient : null;

		if (options.hasOwnProperty('rule')) {
			this.rule = new Function(options.rule);
		}
	}

	match(name) {

		if (this.name !== name) {
			return false;
		}

		if (this.rule === null) {
			return true;
		}

		let result = this.rule();

		if (typeof result !== "boolean") {
			throw new Error('Fail test rule in preloaded file');
		}

		return result;
	}
}


/*
    Предзагрузка файлов: 
     
		Preload.loadFiles([
			'img/img_8245.jpg',
			'audio/click.mp3',
		]).then(function(){

			Предзагрузка успешно завершена
			
		}, function(){
			Ошибка прездагрузки
		});



    Получить blob:

    	let blob = Preload.get("img_8245.jpg"); 

*/
class PreloadApi
{

	constructor() {	 }

	get elProgress()
	{
		return id('progress-bar');
	}

    setProgress(value, max = 100) {

		if (max !== 100) {
			value = percentage(value, max)
		}

		this.elProgress.style.width = value + '%';
	}

	setProgressText(str){
		document.querySelector('#loading-text span').innerText = str;
	}


	getRaw(name) {

		for (let i=0; i<preloadFiles.length; i++) {
			if (preloadFiles[i].unicalName === name) {
				return preloadFiles[i];
			}
		}

		for (let i=0; i<preloadFiles.length; i++) {
			if (preloadFiles[i].match(name)) {
				return preloadFiles[i];
			}
		}

		throw new Error('Preload.get : file '+name+' not found!');
	}

    get(name) {
		return this.getRaw(name).blob;
    }

	getUnicalName(name) {
		return this.getRaw(name).unicalName;
	}

	async loadFiles(array, cache = false)
    {
		this.setProgress(0);

		for (let i=0; i < array.length; i++) {

			let item 	= Array.isArray(array[i]) ? array[i] : [array[i]];
			let url 	= item[0];
			let options = item.length === 1 ? {} :  item[1];
			let result	= await this.loadFile(url, options);

			if (result === 'ok') {
				this.setProgress(i, array.length);
			} else {
				this.setProgress(0);
				this.setProgressText(result);
			}
		}

	}

	async loadFile(url, options, cache=false) {

		console.log("load file: " + url);

		return new Promise((resolve, reject) => {

			let result = false;
			let oReq = new XMLHttpRequest();
			oReq.responseType = "arraybuffer";

			if (cache) {
				url += '?' + (new Date()).getTime();
			}

			oReq.open("GET", url, true);

			oReq.onload = function (oEvent) {

				let response = oReq.response;

				if (this.readyState === 4 && this.status === 200 && response) {

					let byteArray = new Uint8Array(response);

					for (let i = 0; i < byteArray.byteLength; i++) {
						// может потом поксорим
					}

					if (byteArray.length === 0) {
						reject("File : " + url + " returned 0 bytes!")
					}

					let blob = new Blob([byteArray]);//, { type: "image/jpeg" } );
					let urlCreator = window.URL || window.webkitURL;
					let urlBlob = urlCreator.createObjectURL(blob);

					preloadFiles.push(new PreloadFile(url, urlBlob, options));

					resolve('ok')

				} else if (this.status === 404) {
					reject("File : " + value + " not found!")
				} else {
					reject("Server error. Please try later.")
				}
			};

			oReq.send(null);

		});

	}



	getShortName(name) {

		let shortName = name.split('.');

		if (shortName < 2) {
			return name;
		} else {
			shortName.pop()
			return shortName.join('.');
		}

	}





}