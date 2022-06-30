var app = new PIXI.Application();


class DisplayApi
{
	
	constructor() {  

        this.changeSpeed = 16;
        this.backSprite = new PIXI.Sprite();


        // картинки фона
        this.backContainer = new PIXI.Container();
        this.backContainer.addChild(this.backSprite);

        app.destroy();
        app = new PIXI.Application({
            width: 0, 
            height: 0, 
            backgroundColor: 0x333333, 
           // resolution: 1,
            resolution: window.devicePixelRatio || 1,
        });

        app.renderer.view.style.position = "absolute";
        app.renderer.view.style.display = "block";
        app.renderer.autoDensity = true;
        app.resizeTo = window;
        app.stage.addChild(this.backContainer);
    }

    load() {
        id('background').appendChild(app.view);
        window.addEventListener("resize", this.onResize.bind(this), false);
    }

    get x(){
        return this.backSprite.x > 0 ? this.backSprite.x : 0;
    }

    get y(){
        return this.backSprite.y > 0 ? this.backSprite.y : 0;
    }

    get width(){
        return app.stage.width;
    }

    get height() {
        return app.stage.height;
    }

    get backgroundColor(){
        return app.renderer.backgroundColor;
    }

    set backgroundColor(value){
        app.renderer.backgroundColor = value;
    }


    async img(name) {

        console.log('img(' + name + ')');

        let texture = await PIXI.Texture.fromURL(Preload.get(name));
        let sprite = new PIXI.Sprite(texture);
        sprite.alpha = 0;

        this.setPosition(sprite);
        this.backContainer.addChild(sprite);

        for (let i=0; i <= 100; i+=2) {
            sprite.alpha = i/100;
            await sleep(i / this.changeSpeed)
        }

        this.backSprite.destroy();
        this.backSprite = sprite;
        console.log('end img(' + name + ')');
    }


    /**
     * Мастштабирует картинку под размеры экрана
     * @param {PIXI.Sprite} sprite - спрайт изображения
     * @param {int} pw_max - максимальная длинна в процентах экрана
     * @param {int} ph_max - максимальная высота в процентах экрана
     */
    setPosition(sprite, pw_max = 132, ph_max = 120) {

        let ratio   = sprite.width / sprite.height;
        let width   = app.renderer.width;
        let height  = app.renderer.height;
        let p = function(value, max) {return 100 * value / max}

        let w, h=0;

        for (let i = 1; i < 10000; i++) {

            w = i;
            h = w / ratio;

            let pw = p(w, width);
            let ph = p(h, height);

            if (pw > pw_max || ph > ph_max) {
                break;
            }

            if (pw >= 100 && ph >= 100) {
                break;
            }

        }

        sprite.width = w;
        sprite.height = h;
        sprite.x = (width - w) / 2;
        sprite.y = (height - h) / 2;


        // resolution fix
        sprite.width = w / app.renderer.resolution;
        sprite.height = h / app.renderer.resolution;

        sprite.x = sprite.x / app.renderer.resolution;
        sprite.y = sprite.y / app.renderer.resolution;
    }


    onResize() {
        console.log('onResize: Display')
        this.setPosition(this.backSprite);
    }




    async effectShake(cycles = 3, wPerc = 0.1) {

        let wPix = Math.ceil(this.backSprite.width / 100 * wPerc);
        let wCount = 4; // должно быть всегда кратно 2;
        let y = this.backSprite.y;

        async function effectShakePos(x=null, y=null, msec=20){

            Display.backSprite.x = x;
            Display.backSprite.y = y;
            await sleep(msec)
        }

        // отодвигаем влево
        for (let i=0; i<wCount/2; i++) {
            await effectShakePos(this.backSprite.x - wPix, y);
        }

        for(let i=0; i<cycles; i++) {

            // идем вправо
            for (let j=0; j<wCount; j++) {
                await effectShakePos(this.backSprite.x + wPix, y);
            }

            // идем влево
            for (let j=0; j<wCount; j++) {
                await effectShakePos(this.backSprite.x - wPix, y);
            }

        }

        // возвращаем в центр
        for (let i=0; i<wCount/2; i++) {
            await effectShakePos(this.backSprite.x + wPix, y);
        }
	
    }

    async effectLust() {

        let sprite = await getSprite('love.png');

        console.log(sprite);

        sprite.position.set(Display.x, Display.y);
        sprite.width = Display.width;
        sprite.height = Display.height;

        sprite.fadeIn = true;
        sprite.max = 0.4;
        sprite.min = 0.2;
        sprite.pulse = 1;
        sprite.alpha = 0;
        app.stage.addChild(sprite);

        app.ticker.add(function() {

            let range = sprite.max - sprite.min;
            let step = (range / app.ticker.FPS) / sprite.pulse;

            let max = sprite.max - step;
            let min = sprite.min + step;

            if (sprite.fadeIn) {
                if ((sprite.alpha += step) >= max) {
                    sprite.fadeIn = false;
                }
            } else {
                if ((sprite.alpha -= step) <= min) {
                    sprite.fadeIn = true;
                }
            }
        });



    }

}




















/*
















var app = null;
       
function onContainerOver() {
    this.alpha = 1;
}

function onContainerOut() {
    this.alpha = 0.5;
}

class DisplayApi
{
	
	constructor() {  

        this.backSprite = new PIXI.Sprite();
        this.backContainer = new PIXI.Container();
        this.changeSpeed = 16;

        
        this.userContainer = new PIXI.Container();
        this.frameLust =
    }


    load (backColor = 0x333333) {
        
        app = new PIXI.Application({
            width: 0, 
            height: 0, 
            backgroundColor: backColor, 
           // resolution: 1,
            resolution: window.devicePixelRatio || 1,
        });
    
        app.renderer.view.style.position = "absolute";
        app.renderer.view.style.display = "block";
        app.renderer.autoDensity = true;
        app.resizeTo = window;

        this.backContainer.addChild(this.backSprite);
        app.stage.addChild(this.backContainer);
        app.stage.addChild(this.userContainer);
        
        $('#background')[0].appendChild(app.view);

        window.addEventListener("resize", this.onResize.bind(this), false);
    }

    color(value) {
        app.renderer.backgroundColor=value;
    }


    async ebobo(){

        app.renderer.plugins.interaction.mouseOverRenderer=true

        document.getElementById('game').classList.remove('nodisplay');

        app = new PIXI.Application({
            width: 0, 
            height: 0, 
            backgroundColor: '#ccc', 
            resolution: window.devicePixelRatio || 1,
        });

        app.renderer.view.style.position = "absolute";
        app.renderer.view.style.display = "block";
        app.renderer.autoDensity = true;
        app.resizeTo = window;

        $('#background')[0].appendChild(app.view);
   
        var square = new PIXI.Graphics();
        square.beginFill(0x12345678);
        square.drawRect(0, 0, 500, 500);
        square.endFill();
        square.x = 200;
        square.y = 200;
        square.interactive = true;
     
        app.stage.addChild(square);

        square.on('mouseover', function (e) {
            console.log('Mouse clicked');
            console.log('X', e.data.global.x, 'Y', e.data.global.y);
        });
        square.on('mouseout', function (e) {
            console.log('Mouse clicked');
            console.log('X', e.data.global.x, 'Y', e.data.global.y);
        });









    }

    async user() {

        let face = await PIXI.Texture.fromURL(Preload.get('face-female'));
        let frame = await PIXI.Texture.fromURL(Preload.get('frame'));
        let frameHover = await PIXI.Texture.fromURL(Preload.get('frame-hover'));

        const sFace = new PIXI.Sprite(face);
        const sFrame = new PIXI.Sprite(frame);
        const sFrameHover = new PIXI.Sprite(frameHover);

        sFrameHover.alpha = 0;

        function onButtonDown() {
           
            this.isdown = true;
            alert('click!')
        }
        
        function onButtonUp() {
            console.log('onButtonUp')
            this.isdown = false;
            if (this.isOver) {
                
            } else {
               
            }
        }
        
        function onButtonOver() {
            console.log('onButtonOver')
            this.isOver = true;
            if (this.isdown) {
                return;
            }
            this.alpha = 1;
        }
        
        function onButtonOut() {
            console.log('onButtonOut')
            this.isOver = false;
            if (this.isdown) {
                return;
            }
            this.alpha = 0.5;
        }

        
        app.renderer.plugins.interaction.mouseOverRenderer=true


        Display.userContainer.addChild(sFace);
        Display.userContainer.addChild(sFrame);
        Display.userContainer.addChild(sFrameHover);

        Display.userContainer.interactive = true;
        Display.userContainer.alpha = 0.5;
        Display.userContainer
        .on('pointerdown', onButtonDown)
        .on('pointerup', onButtonUp)
        .on('pointerupoutside', onButtonUp)
        .on('pointerover', onButtonOver)
        .on('pointerout', onButtonOut);

  


        
    }

    async img(name) {
        
        let texture = await PIXI.Texture.fromURL(Preload.get(name));
        let sprite = new PIXI.Sprite(texture);
        sprite.alpha = 0;

        this.setSpritePoint(sprite);
        this.backContainer.addChild(sprite);


        for (let i=0; i <= 100; i+=2) {

			var promise = new Promise((resolve, reject) => {
				setTimeout(() => {


					sprite.alpha = i/100
					resolve(1);

				}, i / this.changeSpeed);
			});
			
			await promise;
        }

        this.backSprite.destroy();
        this.backSprite = sprite;
    }

    async imgFade() {

        for (let i=100; i >= 0; i-=2) { 

			var promise = new Promise((resolve, reject) => {
				setTimeout(() => {

                    this.backSprite.alpha = i/100;
					resolve(1);

				}, i / this.changeSpeed);
			});
			
			await promise;
        }
    }




    setSpritePoint(sprite) {

        let pw_max  = 120;
        let ph_max  = 120;
        let ratio   = sprite.width / sprite.height;
        let width   = app.renderer.width;
        let height  = app.renderer.height;
        let p = function(value, max) {return 100 * value / max}

        let w, h=0;

        for (let i = 1; i < 10000; i++) {

            w = i;
            h = w / ratio;

            let pw = p(w, width);
            let ph = p(h, height);

            if (pw > pw_max || ph > ph_max) {
                break;
            }

            if (pw >= 100 && ph >= 100) {
                break;
            }

        }

        sprite.width = w;
        sprite.height = h;
        sprite.x = (width - w) / 2;
        sprite.y = (height - h) / 2;


        // resolution fix
        sprite.width = w / app.renderer.resolution;
        sprite.height = h / app.renderer.resolution;

        sprite.x = sprite.x / app.renderer.resolution;
        sprite.y = sprite.y / app.renderer.resolution;
    }

    onResize() {
        this.setSpritePoint(this.backSprite);
    }




    async effectShake(cycles = 3, wPerc = 0.1) {

        let wPix = Math.ceil(this.backSprite.width / 100 * wPerc);
        let wCount = 4; // должно быть всегда кратно 2;
        let y = this.backSprite.y;

        // отодвигаем влево
        for (let i=0; i<wCount/2; i++) {
            await this.setBackSpriteOffset(this.backSprite.x - wPix, y);
        }

        for(let i=0; i<cycles; i++) {

            // идем вправо
            for (let j=0; j<wCount; j++) {
                await this.setBackSpriteOffset(this.backSprite.x + wPix, y);
            }

            // идем влево
            for (let j=0; j<wCount; j++) {
                await this.setBackSpriteOffset(this.backSprite.x - wPix, y);
            }

        }

        // возвращаем в центр
        for (let i=0; i<wCount/2; i++) {
            await this.setBackSpriteOffset(this.backSprite.x + wPix, y);
        }
	
    }


    async setBackSpriteOffset(x=null, y=null, msec=20){

        let promise = new Promise((resolve, reject) => {
            setTimeout(() =>  {
                if(x!== null) {Display.backSprite.x=x}
                if(y!== null) {Display.backSprite.y=y}
                resolve(1);
            }, msec);
        });

        await promise;
    }




}

*/