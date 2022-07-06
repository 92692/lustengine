





function scriptDebug() {


    Dialog.choise({
        'Dialog': async ()=> { await say('THis is simple text') },
        'Effects': async ()=> {

            Dialog.choise({
                'Shake': async ()=>{
                    Display.effectShake();
                },
                'Lusted': async ()=>{
                    Display.effectLust();
                }
            })
        },
        'SkillCheck': async ()=>{

            //let variant = choise([1,2,3,4,5,6,7,8,9]);
            let checker = new SkillCheckApi();
            checker.start(3);

        },
        'SlowCheck': async ()=>{

            //let variant = choise([1,2,3,4,5,6,7,8,9]);
            let checker = new SkillCheckApi();
            checker.start(3, 300);

        },
        'SkillTest': skillTest,

    })


}