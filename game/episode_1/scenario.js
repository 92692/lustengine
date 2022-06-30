




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

    await say('Ведение, начинается тут. Бла бла бла бла бла бла бла бла.')
    await say('Intro', 'Как я оказалась здесь? Черт его знает.')

    await img('intro_2');
    await say('Intro', 'Как я оказалась здесь? Черт его знает.')
    await say('Intro', 'Попробуем пойти сюда.')
    await say('Intro', 'Кажеться я нашла карту.')
    await img('intro_3');

    await Dialog.choise(['Валера', 'Бэбра', 'Вася', 'Пиривееет!']);


    iconMain.fadeIn();
    iconMap.fadeIn()


    await img('intro_3');
    await sleep(2000);

}