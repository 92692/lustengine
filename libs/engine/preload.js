
var preloadFiles = [];

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

    get(name) {

		for(let i=0; i<preloadFiles.length; i++) {
			if(preloadFiles[i].name === name || preloadFiles[i].short === name) {
				return preloadFiles[i].blob;
			}
		}

		console.log('Preload.get('+name+') = return null');
		return null;
    }

	async loadFiles(array, cache = false)
    {
		this.setProgress(0);

		for (let i=0; i < array.length; i++) {

			let result = await this.loadFile(array[i]);

			if (result === 'ok') {
				this.setProgress(i, array.length);
			} else {
				this.setProgress(0);
				this.setProgressText(result);
			}
		}

	}

	async loadFile(url, cache=false) {

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

					let blob = new Blob([byteArray]);//, { type: "image/jpeg" } );
					let urlCreator = window.URL || window.webkitURL;
					let urlBlob = urlCreator.createObjectURL(blob);
					let name = url.split('\\').pop().split('/').pop();
					let short = Preload.getShortName(name);

					// check unical
					for (let i=0; i < preloadFiles.length; i++ ) {
						if(preloadFiles[i].name === name || preloadFiles[i].short === short) {
							throw new Error('file name ' + (name + '/' + short) + ' is not unical');
						}
					}

					preloadFiles.push({
						'uri': url,
						'name': name,
						'short': short,
						'blob': urlBlob,
					});

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