
var POINT_TRANSPARENCY = 0.8;

class Map
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

        this.container.alpha=0;
        this.container.visible=true;

        let height = Display.backContainer.height;
        let mask = new PIXI.Graphics();
        mask.drawRect(0, Display.backSprite.y, Display.backSprite.width, Display.backSprite.height);
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
        Display.setPosition(this.backSprite, 90, 90);
    }

}