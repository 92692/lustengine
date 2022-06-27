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
			musicVolume : 0.5, 
			soundVolume : 0.5, 
			textTime	: 50,
		};
			
		if (localStorage.getItem("options") !== null) {
			options = JSON.parse(localStorage.getItem("options"));
		}

		Audio.music.volume	= options.musicVolume;
		Audio.sound.volume	= options.soundVolume;
		Dialog.textTime 	= options.textTime;

		console.log(Audio.music.volume)
		
		let p1 =  options.musicVolume * 100;
		$('#music-volume')[0].value = p1;
		$('#music-volume')[0].style.background = 'linear-gradient(90deg, #03a9f4 '+p1+'%, #646360 '+p1+'%)';
		
		let p2 =  options.soundVolume * 100;
		$('#sound-volume')[0].value = p2;
		$('#sound-volume')[0].style.background = 'linear-gradient(90deg, #03a9f4 '+p2+'%, #646360 '+p2+'%)';
		
		let p3 =  options.textTime;
		$('#text-volume')[0].value = p3;
		$('#text-volume')[0].style.background = 'linear-gradient(90deg, #03a9f4 '+p3+'%, #646360 '+p3+'%)';
		

		$('#music-volume').on('change input', function(){

			let p = this.value;
			this.style.background = 'linear-gradient(90deg, #03a9f4 '+p+'%, #646360 '+p+'%)';
			let volume = p / 100;
			Audio.music.volume = volume;
			Menu.Save();
		});
		
		
		$('#sound-volume').on('change input', function(){

			let p = this.value;
			this.style.background = 'linear-gradient(90deg, #03a9f4 '+p+'%, #646360 '+p+'%)';
			let volume = p / 100;
			Audio.sound.volume = volume;
			sound('flick');
			Menu.Save();
		});
		
		$('#text-volume').on('change input', function(){
			let p = this.value;
			this.style.background = 'linear-gradient(90deg, #03a9f4 '+p+'%, #646360 '+p+'%)';
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
				'musicVolume'	: Audio.music.volume,
				'soundVolume'	: Audio.sound.volume,
				'textTime'		: Dialog.textTime,
			})

			localStorage.setItem("options", options);
			Menu.blockSave = false;

			console.log('SAVED!');
			console.log(options);

		}, 1000);
	}












}

