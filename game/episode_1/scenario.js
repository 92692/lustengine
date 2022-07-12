






async function scenario() {


    await img('intro_1');
    await say('Intro', 'Как я оказалась здесь? Впереди какой то лес и еще много строк кода.')
    await img('intro_2');
    await say('Intro', 'Посмотрим что за тем мостом. Возможно там есть много вкусных наркотиков.')
    await say('Intro', 'А это  диалог.')
    await img('intro_3');

    await Dialog.choise({

        'Mini game' : async ()=> {

            while (!await SkillCheck.start(3)) {
                await sleep(1000);
                await say('Вы проиграли, попробуйте еще раз');
                Dialog.hide();
            }

            await say('Вы подебили, еееее!');
        },
        'Hello' : async ()=> {
            await say('И вам не хворать')
        }
    });



    iconMain.fadeIn();
    iconMap.fadeIn()


    await img('intro_3');
    await sleep(2000);

}