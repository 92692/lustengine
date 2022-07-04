
async function alex() {

    SkillCheck.enabled = true;
    SkillCheck.pressed = false;

    let degSC = -180;
    let screen = id('skill-check');
    let skill = id("skillcheck");
    let zone = id("zone");
    let tick = id("tick");
    let overlay = id("customkeyoverlay");
    let randZone = random(0, 360);
    let tickZone = randZone + 180 + 90;

    screen.classList.remove('nodisplay');
    zone.style.opacity = "0";
    tick.style.opacity = "0";
    overlay.style.opacity = "0";



    // await sleep(parseInt(Math.random() * 1000));
    // play audio

    // make random position
    zone.style.transform = "rotate(" + randZone + "deg)";

    skill.style.opacity = "1";
    zone.style.opacity = "0.7";
    tick.style.opacity = "1";
    overlay.style.opacity = "1";



    // waiting press

    while(!SkillCheck.pressed)
    {
        // check key is pressed;
        tickZone+=4;
        if(tickZone > 360){tickZone-=360}
        tick.style.transform = "translate(50%, 0%) rotate(" + tickZone + "deg)";

        await sleep(13);
    }

/*
    while(1) {
        id("zone").style.transform = "rotate(" + xxx + "deg)";
        id("tick").style.transform = "translate(60px, 66px) rotate(" + (xxx+180) + "deg)";
        await sleep(2);
    }
*/

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


    if(result >= -2 && result <= 50) {
        console.log('SUCCESS : ' + result);
    } else {
        console.log('FAIL : ' + result);
    }

  //  await alex();





    SkillCheck.enabled = false;
}


