




async function watcher(){

    let last = 0;

    while(true) {

        let x = Dialog.dialogClicked;
        if(last !== x) {
            console.log('CLICK=' + x);
            last = x;
        }
        await sleep(1);
    }
}



async function scenario() {


    watcher();


    await img('intro_1');
    await say('Intro', 'Как я оказалась здесь? Впереди какой то лес и еще много строк кода.')
    await img('intro_2');
    await say('Intro', 'Посмотрим что за тем мостом. Возможно там есть много вкусных наркотиков.')
    await say('Intro', 'А это  диалог.')
    await img('intro_3');

    await Dialog.choise({

        'Миниигра' : async ()=> {

            while (!await new SkillCheckApi().start(3)) {
                sleep(1000);
                await say('Вы проиграли, попробуйте еще раз');
                Dialog.hide();
            }

            await say('Вы подебили, еееее!');
        },
        'Здравствуйте' : async ()=> {
            await say('И вам не хворать')
            Dialog.hide();
        }
    });



    iconMain.fadeIn();
    iconMap.fadeIn()


    await img('intro_3');
    await sleep(2000);

}