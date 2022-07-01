var TRANSITION_MS = 500;
var PRANDOM	  	  = 0;

class DialogApi
{
	
	constructor() {  

		this.cache		= {};
		this.paused		= false;
		this.choised	= {};		// выбранный вариант. null - означает ожидание выбора

		this.elText			= false;
		this.elName			= false;
		this.elTextShow		= false;
		this.elMenu			= false;
		this.elChoises		= false;
		this.textTime		= 50;

		this.dialogClicked	= false;
	}

	load() {

		this.elText			= document.getElementById('dialog');
		this.elName			= document.getElementById('dialog-name');
		this.elTextShow		= document.querySelector('.dialog-text-show');
		this.elMenu 		= document.getElementById('menu');
		this.elChoises		= document.getElementById('choices');

		$(this.elText).click(function() {

			if (Dialog.dialogClicked === -1) {
				console.log('[BLOCKED!] click function! ' + this.dataset.id);
			} else {
				console.log('click function! ' + this.dataset.id);
				Dialog.dialogClicked = true;
			}

		});

		window.addEventListener("resize", this.onResize.bind(this), false);
	}


	setCharacter(name, color, avatar = "", portrait = "") {
		this.cache[name] = {
			name: name,
			color: color,
			avatar: avatar,
			portrait: portrait
		};
	}

	/**
	 * выбор
	 *
	 * @param {array} variants - массив вариантов ответа
	 */
	async choise(variants) {

		let choise_id = PRANDOM++;
		this.choised[choise_id] = null;

		await this.hide();

		// убираем старые кнопки
		$('.chbox-body div').remove();

		// добавляем варианты ответа
		for (let index in variants) {

			let el = null;
			let obj = variants[index];

			if (typeof obj === 'function') {

				console.log('CHOISE '+choise_id+': function');

				el =  $('<div class="chbox-item">'+index+'</div>');

				// при клике по варианту
				el.click(async ()=> {
					this.elChoises.classList.add('hidden');
					await obj();
					this.choised[choise_id] = index;
				})

			} else {

				console.log('CHOISE '+choise_id+': array ');

				el =  $('<div class="chbox-item">'+obj+'</div>');

				// при клике по варианту
				el.click(()=> {

					$(this.elChoises).addClass('hidden').removeClass('choices-show')

					this.choised[choise_id] = obj;
				})
			}

			$('.chbox-body').append(el);
		}

		// показываем форму
		$(this.elChoises).addClass('choices-show').removeClass('hidden')


		// ждем выбора и выполнения функций
		console.log('CHOISE '+choise_id+': wait');
		while (this.choised[choise_id] === null) {
			await sleep(5);
		}

		console.log('CHOISE '+choise_id+': return');
		return this.choised[choise_id];
	}



	async show() {

		if (!this.isDialogVisible()) {
			this.onResize()
			this.elText.classList.remove('hidden');
			await sleep(TRANSITION_MS);
		}
	}

	async hide() {
		if (this.isDialogVisible()) {
			this.elText.classList.add('hidden');
			await sleep(TRANSITION_MS);
		}
	}

	isDialogVisible() {
		return !this.elText.classList.contains('hidden');
	}




	async say(character, text = null, showMini=false, showPortrait=false) {

		let ms = 100 - this.textTime;
		let blink = "<span id='dialog-blink' class='blink'>_</span>";

		console.log('START DIALOG');

		if (this.dialogClicked === true) {
			throw new Error('Прошлый диалог не был закончен')
		}

		if (text === null) {
			text = character;
			character = '';
		}

		iconMap.visible = false;
		this.dialogClicked = false;
		this.elName.style.color = this.cache[character].color;
		this.elName.innerHTML = this.cache[character].name;
		this.elTextShow.innerHTML = text + blink;

		await sleep(10);
		let style = getComputedStyle(this.elTextShow);
		this.elTextShow.style.width = style.width;
		this.elTextShow.style.height = style.height;
		this.elTextShow.innerHTML = '';

		this.show();


		while (text.length > 0) {
			
			let t = (text[0] === '.') ? ms*5 :  ms;

			if (this.dialogClicked) {

				console.log('DIALOG: clicked!');
				this.elTextShow.innerHTML += text;
				this.dialogClicked = false;
				break;
			}

			this.elTextShow.innerHTML += text[0];
			text = text.substring(1);

			await sleep(t);
		}


		this.elTextShow.innerHTML += blink;
		this.elTextShow.style.width = 'unset';
		this.elTextShow.style.height = 'unset';

		// wait click
		console.log('WAIT DIALOG');

		while (!this.dialogClicked) {
			await sleep(50);
		}

		this.dialogClicked = -1;
		console.log('END DIALOG');
	}


	onResize() {

		console.log('onResize: Dialog');
		//this.elText.style.bottom = Math.round(Display.y) + 'px';
		let x = (app.renderer.height - (Display.y+Display.height));
		this.elText.style.bottom =  Math.round(x) + 'px';

	}


}

