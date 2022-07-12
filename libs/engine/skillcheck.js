class SkillCheckApi
{
    constructor() {
        this.enabled = false;
        this.pressed = false;
        this.success = 0;
        this.fails   = 0;
        this.checks = [];
    }

    load() {
        this.screen = id('skill-check');
        this.zone = id('zone');
        this.tick = id('tick');
        this.overlay = id('customkeyoverlay');
    }

    show(count) {

        this.load();
        this.enabled = true;

        /* SHOW CHECKBOX LIST */
        $('.stat input').prop('checked', false)
        $('.stat').addClass('nodisplay');
        $('.stat:lt('+count+')').removeClass('nodisplay');

        this.screen.classList.remove('nodisplay');
        this.zone.style.opacity =  "0.7";
        this.tick.style.opacity = '1';
        this.overlay.style.opacity = '1';
    }

    hide() {

        this.enabled = false;

        this.screen.classList.add("nodisplay");
        this.zone.style.opacity = '0';
        this.tick.style.opacity = '0';
        this.overlay.style.opacity = '0';
    }

    async start(count = 1, speed = 10) {

        this.show(count);

        for (let i=0; i<count; i++) {

            let result = await this.startCircle(speed);

            if (!result) {
                Sound.playSound('skillcheck_fail_00');
                this.hide();
                return false;
            }

            document.querySelectorAll('.stat input')[i].checked = true;
            Sound.playSound('skillcheck_success_00');

            await sleep(1000);
        }

        this.hide();
        return true;
    }


    async startCircle(speed) {

        this.pressed = false;

        /* RUN */
        let randZone = random(0, 360);
        let tickZone = randZone + 180 + 90;
        this.zone.style.transform = "rotate(" + randZone + "deg)";

        // waiting press
        while(!this.pressed)
        {
            // check key is pressed;
            tickZone+=4;
            if(tickZone > 360){tickZone-=360}
            this.tick.style.transform = "translate(50%, 0%) rotate(" + tickZone + "deg)";

            await sleep(parseInt(speed ));
        }



        // check result
        while(tickZone > 360) { tickZone-=360 }

        console.log(randZone);
        console.log(tickZone);

        let result = tickZone - randZone;

        console.log(result);
        if(result < 0) {
            result -= -360;
            console.log('FIX! : ' + result);
        }


        if(result >= -2 && result <= 46) {
            console.log('SUCCESS : ' + result);
        } else {
            console.log('FAIL : ' + result);
        }

        return (result >= -2 && result <= 46);
    }


    async test() {

        this.show(3);
        let randZone = random(0, 360);

        while (!this.pressed) {

            this.zone.style.transform = "rotate(" + randZone + "deg)";
            this.tick.style.transform = "translate(50%, 0) rotate(" + randZone + "deg)";
            await sleep(2);

            randZone++
            if (randZone++ > 360) {
                randZone-=360;
            }
        }

        this.hide();
    }
}

