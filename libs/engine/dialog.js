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
		this.elTextHide		= false;
		this.elMenu			= false;
		this.elChoises		= false;
		this.textTime		= 50;
		this.dialogClicked	= false;
	}

	load() {

		this.elText			= document.getElementById('dialog');
		this.elName			= document.getElementById('dialog-name');
		this.elTextShow		= document.getElementById('dialog-text-show');
		this.elTextHide		= document.getElementById('dialog-text-hide');
		this.elMenu 		= document.getElementById('menu');
		this.elChoises		= document.getElementById('choices');

		$(this.elText).click(function(){
			Dialog.dialogClicked = true;
		});
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

					this.elChoises.classList.add('hidden');
					this.choised[choise_id] = obj;
				})
			}

			$('.chbox-body').append(el);
		}

		// показываем форму 
		this.elChoises.classList.remove('hidden');

		// ждем выбора и выполнения функций
		console.log('CHOISE '+choise_id+': wait');
		while (this.choised[choise_id] === null) {
			await sleep(5);
		}

		console.log('CHOISE '+choise_id+': return');
		return this.choised[choise_id];
	}


	
	clearDialog() {
		this.elName.innerHTML = ' ';
		this.elTextShow.innerHTML = ' ';
		this.dialogClicked = false;
	}

	async show() {

		if (!this.isDialogVisible()) {
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


	async say(character, text, showMini=false, showPortrait=false) {

		console.log('START DIALOG: ' + text);
		iconMap.visible = false;
		Dialog.dialogClicked = false;
		let ms = 100 - this.textTime;
		this.clearDialog();
		this.elName.style.color = this.cache[character].color;
		this.elName.innerHTML = this.cache[character].name;
		this.elTextShow.innerHTML = text[0];
		this.elTextHide.innerHTML = text.substring(1) + '_';
		this.show();


		while(this.elTextHide.innerHTML.length !== 0) {
			
			let t = ms;

			if (this.elTextHide.innerHTML[0] === '.') {
				t *= 5;
			}

			if (Dialog.dialogClicked) {
				console.log('DIALOG: clicked!');
				this.elTextShow.innerHTML += this.elTextHide.innerHTML;
				this.elTextHide.innerHTML = '';
				Dialog.dialogClicked=false;
				break;

			} else {
				this.elTextShow.innerHTML += this.elTextHide.innerHTML[0];
				this.elTextHide.innerHTML = this.elTextHide.innerHTML.substring(1);
			}

			await sleep(t);
		}

		let t = this.elTextShow.innerHTML;
		this.elTextShow.innerHTML = t.substring(0, t.length-1) + "<span id='dialog-blink' class='blink'>_</span>";

		// wait click
		while (!Dialog.dialogClicked) {
			await sleep(50);
		}


		console.log('END DIALOG: ' + text);
	}




}

