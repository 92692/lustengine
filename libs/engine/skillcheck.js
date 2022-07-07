

class SkillCheckApi
{
    constructor() {

        this.screen = id('skill-check');
        this.skill = id('skillcheck');
        this.zone = id('zone');
        this.tick = id('tick');
        this.overlay = id('customkeyoverlay');
        this.checks = [];
        this.count = 3;
    }

    async start(count = 1, speed = 10) {

        SkillCheck.enabled = true;

        /* SHOW CHECKBOX LIST */

        $('.stat input').prop('checked', false)
        $('.stat').addClass('nodisplay');
        $('.stat:lt('+count+')').removeClass('nodisplay');

/*
        let stats = document.querySelectorAll('.stat');
        let index = 0;

        for (let i=0; i < stats.length; i++) {
            if (i+1 > count) {
                stats[i].classList.add('nodisplay');
            } else {
                stats[i].classList.remove('nodisplay');
                document.querySelectorAll('.stat input')[i].checked=true;
            }
        }
*/

        /* SHOW SKILLCHECK ELEMENT */
        this.screen.classList.remove('nodisplay');
        this.zone.style.opacity = "0";
        this.tick.style.opacity = "0";
        this.overlay.style.opacity = "0";

        /* STYLE SKILLCHECK */
        this.skill.style.opacity = "1";
        this.zone.style.opacity = "0.7";
        this.tick.style.opacity = "1";
        this.overlay.style.opacity = "1";



        for (let i=0; i<count; i++) {

            let result = await this.startCircle(speed);

            if (!result) {
                Audio.playSound('skillcheck_fail_00');
                SkillCheck.enabled = false;
                return false;
            }

            document.querySelectorAll('.stat input')[i].checked = true;
            Audio.playSound('skillcheck_success_00');

            await sleep(1000);
        }


        SkillCheck.enabled = false;

        this.screen.classList.add('nodisplay');
        this.zone.style.opacity = "0";
        this.tick.style.opacity = "0";
        this.overlay.style.opacity = "0";
        return true;
    }


    async startCircle(speed) {

        SkillCheck.pressed = false;

        /* RUN */
        let randZone = random(0, 360);
        let tickZone = randZone + 180 + 90;
        this.zone.style.transform = "rotate(" + randZone + "deg)";

        // waiting press
        while(!SkillCheck.pressed)
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


}



async function skillTest(){

    SkillCheck.enabled = true;
    SkillCheck.pressed = false;

    let screen = id('skill-check');
    let skill = id('skillcheck');
    let zone = id('zone');
    let tick = id('tick');
    let overlay = id('customkeyoverlay');
    let randZone = random(0, 360);

    screen.classList.remove('nodisplay');
    zone.style.opacity = "0";
    tick.style.opacity = "0";
    overlay.style.opacity = "0";

    skill.style.opacity = "1";
    zone.style.opacity = "0.7";
    tick.style.opacity = "1";
    overlay.style.opacity = "1";



    while (!SkillCheck.pressed) {

        zone.style.transform = "rotate(" + randZone + "deg)";
        tick.style.transform = "translate(50%, 0) rotate(" + randZone + "deg)";
        await sleep(2);

        randZone++
        if (randZone++ > 360) {
            randZone-=360;
        }
    }

    SkillCheck.enabled = false;
}

