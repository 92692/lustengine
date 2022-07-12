
var POINT_TRANSPARENCY = 0.8;

class MapApi
{

    constructor(texture = null) {

        this.points = [];
        this.backSprite = new PIXI.Sprite();
        this.container = new PIXI.Container();
        this.container.visible = false;
        this.container.addChild(this.backSprite);

        app.stage.addChild(this.container);
        
        if (texture !== null) {
            this.texture = texture;
        }

        window.addEventListener("resize", this.onResize.bind(this), false);
    }

    get visible() {
        return this.container.visible;
    }

    set visible(value) {
        this.onResize();
        this.container.visible = value;
    }

    set texture(texture) {
        this.backSprite.texture = texture;
        this.onResize();
    }

    async fadeInOld(step=0.05, ms=5){

        var skewxMin = 5;
        var skewxMax = 6.26;
        var skewx=skewxMin;

        while(skewx < skewxMax) {

            let percent = percentage(skewx, skewxMax, skewxMin);
            skewx += step;

            this.container.skew.x = skewx;
            this.container.alpha = percent / 100;

            if(percent < 75) {

                this.container.alpha = percent / 300;
                await sleep(ms/2);

            } else {
                await sleep(ms);
            }

        }

        this.container.skew.x = 0;
        this.container.alpha = 1;


    }

    async fadeIn() {

        if (this.container.visible) {
            return;
        }

        this.onResize()
        this.container.alpha=0;
        this.container.visible=true;

        let height = Display.height;
        let mask = new PIXI.Graphics();
        mask.drawRect(0, Display.y, Display.width, Display.height);
        mask.endFill();
        this.container.mask = mask;
        this.container.y = -height;

        let step = Math.ceil(height / 400);

        while(this.container.y < 0) {

            step = step + (step/10);
            this.container.y += step;

            let p =  (100 - percentage(-this.container.y, height)) / 100;
            p /= 10;
            console.log(p)
            this.container.alpha = p;
            await sleep(8);
            app.renderer.render(this.container);
        }

        this.container.y = 0;
        this.container.alpha = 1;
        this.container.mask = null;
    }

    async fadeOut(){


        if (!this.container.visible) {
            return;
        }


        let height = Display.backContainer.height;
        let mask = new PIXI.Graphics();
        mask.drawRect(0, Display.backSprite.y, Display.backSprite.width, Display.backSprite.height);
        mask.endFill();
        this.container.mask = mask;
        let step = Math.ceil(height / 400);

        while(this.container.y > -height) {

            step = step + (step/10);
            this.container.y -= step;

            let p =  (100- percentage(-this.container.y, height)) / 100;
            p /= 2;
            console.log(p)
            this.container.alpha = p;
            await sleep(8);
            app.renderer.render(this.container);
        }

        this.container.y = 0;
        this.container.alpha = 1;
        this.container.mask = null;
        this.container.visible=false;


    }

    /**
     * Добавить 'здание' на карте и обработчик нажатия
     * 
     * @param {string} name     - имя точки
     * @param {object} texture  - текстура
     * @param {int} x           - координаты
     * @param {int} y           - координаты
     * @param {function} func   - вызываемая функция
     */
    addPoint(name, texture, x, y, func) {

        let point = new PIXI.Sprite(texture);
        this.container.addChild(point);

        point.interactive = true;
        point.buttonMode = true;
        point.alpha = POINT_TRANSPARENCY;
        point.name = name;
        point.x = x;
        point.y = y;
        point
            .on('pointerdown', async e =>  {
                console.log('START!');
                await func()
                console.log('END!');
            })
            .on('pointerover', this.onPointOver)
            .on('pointerout', this.onPointOut)
        
        this.backSprite.addChild(point);
    }



    /*
        Events
    */
    onClick() {
        this.container.visible = true;
    }

    onPointOver() {
        this.alpha = 1;
    }

    onPointOut() {
        this.alpha = POINT_TRANSPARENCY;
        console.log(this.alpha);
    }

    onResize() {

        console.log('OnResize: Map');

        let ratio   = this.backSprite.width / this.backSprite.height;
        let width   = Display.width;
        let height  = Display.height;
        let pw_max=90, ph_max=90, w=0, h=0, pw=0, ph=0;

        // подбираем оптимальный размер спрайта
        for (let i = 1; i < 10000; i++) {

            w  = i;
            h  = w / ratio;
            pw = percentage(w, width);
            ph = percentage(h, height);

            if (pw > pw_max || ph > ph_max) {
                break;
            }
        }


        // задаем размер и позицию спрайта
        this.backSprite.width = w;
        this.backSprite.height = h;
        this.backSprite.x = (app.renderer.width - w) / 2;
        this.backSprite.y = (app.renderer.height - h) / 2;


        // resolution fix
        this.backSprite.width = w / app.renderer.resolution;
        this.backSprite.height = h / app.renderer.resolution;

        this.backSprite.x = this.backSprite.x / app.renderer.resolution;
        this.backSprite.y = this.backSprite.y / app.renderer.resolution;
    }

}










class MapperApi {


    constructor(soundOpen = null, soundClose = null) {
        this.maps = [];
        this.backs = [];
        this.soundOpen = soundOpen;
        this.soundClose= soundClose;
    }

    addRoot(img) {

        /*
        let map = [

            // [откуда,  куда       знач0к     координаты  функция]
            ['town', 'tavern',      'tavern.png', x, y,     'jumpTownTavern'],
            ['town', 'school',      'school.png', x, y,     'jumpTownSchool'],
            ['town', 'hospital',    'hospital.png', x, y,   'jumpTownHospital'],


            ['tavern', null,    'tavern-human', x, y, 'jumpToTavernOrc'],
            ['tavern', null,    'tavern-place', x, y, 'jumpToTavernPlace'],
            ['tavern', 'town',  'tavern-exit', x, y, 'jumpToTavernPlace'],

        ];*/

    }


    /**
     * @param {string}      name  - имя карты
     * @param {PIXI.Sprite} back  - фон
     * @param {PIXI.Sprite} close - кнопка закрытия
     * @param {int}         x     - позиция кнопка x
     * @param {int}         y     - позиция кнопка y
     */
    addMap(name, back, close, x, y) {

        let map = new PIXI.Container();
        map.visible = false;
        map.addChild(back);
        map.mapName = name;
        map.activeMap = false;
        back.mapName = name;

        app.stage.addChild(map);
        this.maps.push(map);
        this.backs.push(back);

        if(this.maps.length === 1) {
            this.setActiveMap(name)
        }

        this.addPoint(name, null, close, x, y, ()=> {
            console.log('MAP ' + name + 'CLOSING!');
            console.log(this);
            this.fadeOut()
        })
    }

    getMap(name) {

        for (let i = 0; i < this.maps.length; i++) {
            if (this.maps[i].mapName === name) {
                return this.maps[i];
            }
        }

        throw new Error('MapperApi::getMap(' + name + ') - not found!');
    }

    getActiveMap() {

        for (let i = 0; i < this.maps.length; i++) {
            if (this.maps[i].activeMap) {
                return this.maps[i];
            }
        }

        throw new Error('MapperApi::getActiveMap() - not found!');

    }


    /**
     * Добавить 'здание' на карте и обработчик нажатия
     *
     * @param {string} map_name     - имя родительской карты
     * @param {string|null} to      - смена карты при вызове
     * @param {PIXI.Sprite} sprite  - имя текстуры
     * @param {int} x               - позиция x
     * @param {int} y               - позиция y
     * @param {function} func       - вызываемая функция
     */
    addPoint(map_name, to, sprite, x, y, func) {

        sprite.interactive = true;
        sprite.buttonMode = true;
        sprite.alpha = POINT_TRANSPARENCY;
        sprite.name = name;
        sprite.x = x;
        sprite.y = y;
        sprite
            .on('pointerdown', async e =>  {
                console.log('MAP POINT CLICKED!');
                func()
            })
            .on('pointerover', this.onPointOver)
            .on('pointerout', this.onPointOut)

        for(let i=0; i<this.backs.length; i++) {
            if(this.backs[i].mapName === map_name) {
                this.backs[i].addChild(sprite);
            }
        }

    }

    setActiveMap(name) {
        for (let i = 0; i < this.maps.length; i++) {
            this.maps[i].activeMap = this.maps[i].mapName === name
        }
    }

    show(){
        this.onResize();

        Sound.playSound(this.soundOpen);
        this.getActiveMap().visible = true;
    }

    hide(){
        Sound.playSound(this.soundClose);
        this.getActiveMap().visible = false;
    }


    async fadeIn() {

        this.onResize()
        Sound.playSound(this.soundOpen);

        let map = this.getActiveMap();
        map.alpha=0;
        map.visible=true;

        let height = Display.height;
        let mask = new PIXI.Graphics();
        mask.drawRect(0, Display.y, Display.width, Display.height);
        mask.endFill();
        map.mask = mask;
        map.y = -height;

        let step = Math.ceil(height / 400);

        while(map.y < 0) {

            step = step + (step/10);
            map.y += step;

            let p =  (100 - percentage(-map.y, height)) / 100;
            p /= 10;
            console.log(p)
            map.alpha = p;
            await sleep(8);
            app.renderer.render(map);
        }

        map.y = 0;
        map.alpha = 1;
        map.mask = null;
    }

    async fadeOut(){

        this.onResize()
        Sound.playSound(this.soundClose);

        let map = this.getActiveMap();
        let height = Display.backContainer.height;
        let mask = new PIXI.Graphics();
        mask.drawRect(0, Display.backSprite.y, Display.backSprite.width, Display.backSprite.height);
        mask.endFill();
        map.mask = mask;
        let step = Math.ceil(height / 400);

        while(map.y > -height) {

            step = step + (step/10);
            map.y -= step;

            let p =  (100- percentage(-map.y, height)) / 100;
            p /= 2;
            console.log(p)
            map.alpha = p;
            await sleep(8);
            app.renderer.render(map);
        }

        map.y = 0;
        map.alpha = 1;
        map.mask = null;
        map.visible=false;

    }




    onPointOver() {
        this.alpha = 1;
    }

    onPointOut() {
        this.alpha = POINT_TRANSPARENCY;
        console.log(this.alpha);
    }

    onResize() {
        for (let i=0; i<this.backs.length; i++) {
            this.onResizeBack(this.backs[i]);
        }
    }

    onResizeBack(backSprite) {

        console.log('OnResize: Map');

        let ratio   = backSprite.width / backSprite.height;
        let width   = Display.width;
        let height  = Display.height;
        let pw_max=90, ph_max=90, w=0, h=0, pw=0, ph=0;

        // подбираем оптимальный размер спрайта
        for (let i = 1; i < 10000; i++) {

            w  = i;
            h  = w / ratio;
            pw = percentage(w, width);
            ph = percentage(h, height);

            if (pw > pw_max || ph > ph_max) {
                break;
            }
        }


        // задаем размер и позицию спрайта
        backSprite.width = w;
        backSprite.height = h;
        backSprite.x = (app.renderer.width - w) / 2;
        backSprite.y = (app.renderer.height - h) / 2;


        // resolution fix
        backSprite.width = w / app.renderer.resolution;
        backSprite.height = h / app.renderer.resolution;

        backSprite.x = backSprite.x / app.renderer.resolution;
        backSprite.y = backSprite.y / app.renderer.resolution;
    }

}