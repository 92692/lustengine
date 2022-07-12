





function scriptDebug() {

    Dialog.choise({
        'Dialog': async ()=> { await say('THis is simple text') },
        'Effects': async ()=> {

            await Dialog.choise({
                'Shake': async ()=>{
                    await Display.effectShake();
                },
                'Lusted': async ()=>{
                    Display.effectLust();
                }
            })
        },
        'SkillCheck': async ()=>{
            await SkillCheck.start(3)
        },
        'SlowCheck': async ()=>{
            await SkillCheck.start(3, 300)
        },
        'SkillTest':  async ()=> {
            await SkillCheck.test()
        },

    })


}