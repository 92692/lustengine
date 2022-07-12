const ACTIVE_MENU = {
	None: 1,
	Main: 2,
	Options: 3,
	Gallery: 4,
};


class MenuApi
{

	constructor() {  	
		/**
		 * Активный пункт меню
		 */
		this.active = ACTIVE_MENU.None;

		/**
		 * Восстановить диалог при закрытии меню
		 */
		this.restoreSay=false;

		this.blockSave = false;
	}

	/**
	 * Вызов меню во время игры
	 */
	Esc() {

		sound('flick');

		switch(this.active)
		{

			case ACTIVE_MENU.None:
				
				this.active = ACTIVE_MENU.Main;
				this.restoreSay = Dialog.isDialogVisible();
				Dialog.paused = true;
				
				if (this.restoreSay) {
					Dialog.hide(false);
				}
				
				Dialog.elMenu.style.visibility='visible';
				Dialog.elMenu.style.left='0';

				$('main').addClass('glass');
				$('.escmenu').hide();
				$('#loading-div').hide();
			break;

			case ACTIVE_MENU.Main:

				this.active = ACTIVE_MENU.None
				Dialog.paused = false; 
				Dialog.elMenu.style.left='-100%';
				
				if (this.restoreSay) {
					Dialog.show();
				}

				$('main').removeClass('glass');
				$('.escmenu').show();
				$('#loading-div').show();
				
				setTimeout(function(){
					Dialog.elMenu.style.visibility='hidden';
				}, 600);

			break;

			case ACTIVE_MENU.Gallery:
				Menu.Gallery();
			break;
			case ACTIVE_MENU.Options:
				Menu.Options();
			break;

			default:
				console.error('Unkhown menu active page');
			break;

		}
	}

	/*
	 Переключение полноэкранного режима
	*/
	FullScreen(){

		let icoFullScreen = 'icon-resize-full';
		let icoSmallSreen = 'icon-resize-small';
		let $icon = $('#icon-fullscreen');
		let body = document.body;

		if ($icon.hasClass(icoFullScreen)){

			// try enter fullscreen
			if (body.requestFullscreen) {
				body.requestFullscreen();
			} else if(documbodyent.webkitRequestFullscreen ) {
				body.webkitRequestFullscreen();
			} else if(body.mozRequestFullscreen) {
				body.mozRequestFullScreen();
			}

			$icon.removeClass(icoFullScreen);
			$icon.addClass(icoSmallSreen);
		} else {

			document.exitFullscreen()

			$icon.removeClass(icoSmallSreen);
			$icon.addClass(icoFullScreen);
		}

		setTimeout(function(){Display.onResize()}, 500);
		setTimeout(function(){Display.onResize()}, 1000);
		
	}
	
	/**
	 * Пункт меню - возобновить игру
	*/
	Resume(){
		console.log('clickResume()');
		Menu.Esc();
	}

	/**
	 * Пункт меню - галлерея
	*/
	Gallery(){
		console.log('clickGallery()');

	}

	/**
	 * Пункт меню - опции
	*/
	Options() {
		
		let $menu = $('.main-menu');
		let $options = $('.options-menu');

		if (this.active === ACTIVE_MENU.Main) {

			this.active = ACTIVE_MENU.Options;

			$menu.hide();
			$options.show();

		} else {

			this.active = ACTIVE_MENU.Main;

			$menu.show();
			$options.hide();	
		}
	}


	/**
	 * Пункт меню - выход из игры
	*/
	Exit(){
		console.log('clickExit()');
	}



	/**
	 * Загружает опции и ставит хуки на изменений 
	 */
	loadOptions() {
		
		let options = {
			volumeMusic : 0.5,
			volumeSound : 0.5,
			textTime	: 50,
		};
			
		if (localStorage.getItem("options") !== null) {
			options = JSON.parse(localStorage.getItem("options"));
		}

		Sound.volumeMusic	= options.volumeMusic;
		Sound.volumeSound	= options.volumeSound;
		Dialog.textTime 	= options.textTime;

		let p1 =  options.volumeMusic * 100;
		id('music-volume').value = p1;
		id('music-volume').style.background = 'linear-gradient(90deg, #d3c4ff '+p1+'%, #646360 '+p1+'%)';
		
		let p2 =  options.volumeSound * 100;
		id('sound-volume').value = p2;
		id('sound-volume').style.background = 'linear-gradient(90deg, #d3c4ff '+p2+'%, #646360 '+p2+'%)';
		
		let p3 =  options.textTime;
		id('text-volume').value = p3;
		id('text-volume').style.background = 'linear-gradient(90deg, #d3c4ff '+p3+'%, #646360 '+p3+'%)';
		

		$('#music-volume').on('change input', function(){

			let p = this.value;
			let volume = p / 100;

			this.style.background = 'linear-gradient(90deg, #d3c4ff '+p+'%, #646360 '+p+'%)';
			Sound.volumeMusic = volume;
			Menu.Save();
		});
		
		
		$('#sound-volume').on('change input', function(){

			let p = this.value;
			let volume = p / 100;

			this.style.background = 'linear-gradient(90deg, #d3c4ff '+p+'%, #646360 '+p+'%)';
			Sound.volumeSound = volume;
			sound('flick');
			Menu.Save();
		});
		
		$('#text-volume').on('change input', function(){
			let p = this.value;
			this.style.background = 'linear-gradient(90deg, #d3c4ff '+p+'%, #646360 '+p+'%)';
			Dialog.textTime = parseInt(p);
			Menu.Save();
		});
	
	}
	

	/**
	 * Сохраняет опции в localStorage
	 */
	Save() {

		if (this.blockSave) {
			return false;
		}

		this.blockSave = true;

		setTimeout(function(){

			let options = JSON.stringify({
				'volumeMusic'	: Sound.volumeMusic,
				'volumeSound'	: Sound.volumeSound,
				'textTime'		: Dialog.textTime,
			})

			localStorage.setItem("options", options);
			Menu.blockSave = false;

			console.log('SAVED!');
			console.log(options);

		}, 1000);
	}












}

