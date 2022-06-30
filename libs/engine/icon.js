
var ICON_NUMBER = 1;

/*
    Иконка персонажа и все с ней связанное
*/
class IconApi
{

    constructor() {

        this.number = ICON_NUMBER++;
        this.ratio = 0.075;
        this.transparency = 0.75
        this.xOffset = 20;
        this.yOffset = 20;
        this.spriteIcon = new PIXI.Sprite();

        this.container = new PIXI.Container();
        this.container.interactive = true;
        this.container.buttonMode = true;
        this.container.visible = false;
        this.container.alpha = this.transparency;
        this.container.addChild(this.spriteIcon);
        this.container
            .on('pointerdown', function () { this.onClick() }.bind(this))
            .on('pointerover', function () { this.onButtonOver() }.bind(this))
            .on('pointerout', function () { this.onButtonOut() }.bind(this))

        app.stage.addChild(this.container);


        window.addEventListener("resize", this.onResize.bind(this), false);
        this.onResize();
    }

    get visible() {
        return this.container.visible;
    }

    set visible(enable) {
        this.onResize();
        this.container.visible = enable;
    }

    get texture() {
        return this.spriteIcon.texture;
    }

    set texture(texture) {
        this.spriteIcon.texture = texture;
        this.onResize();
    }

    async fadeIn() {

        this.container.interactive = true;
        this.container.visible = true;

        if (this.container.alpha === this.transparency) { return; }


        for (let i = 0; i < 10; i++) {
            this.container.alpha += this.transparency / 10;
            await sleep(20);
        }

        this.container.alpha = this.transparency;
    }

    async fadeOut() {

        this.container.interactive = false;

        if (this.container.alpha === 0) {
            return;
        }

        for (let i = 0; i < 10; i++) {
            this.container.alpha = this.transparency - ((this.transparency / 10) * i);
            await sleep(20);
        }

        this.container.alpha = 0;
    }



    onResize() {

        // set size
        let size = Math.ceil(Display.width * this.ratio);
        this.spriteIcon.width = size;
        this.spriteIcon.height = size;


        // set position - X
        let offset = (this.xOffset * this.number) + (size * this.number - size);

        if (this.number > 1) {
            offset -= ((this.xOffset/2) * this.number);
        }

        this.spriteIcon.x = offset;
        this.spriteIcon.y = Display.y + this.yOffset;
    }

    onClick() {
        alert('icon  clicked!');
    }

    onButtonOver() {
        console.log(this.number +' - onButtonOver')
        this.container.alpha = 1;
    }
        
    onButtonOut() {
        console.log(this.number + ' - onButtonOut')
        this.container.alpha = this.transparency;
    }


    
}