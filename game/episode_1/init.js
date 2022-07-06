var fixAutoplay = true;
var GAME_FILES = [

    /*
            '/bar/intro_1.jpg',
            '/bar/intro_2.jpg',
            '/bar/intro_3.jpg',
            ['/bar/scene_1_simple.jpg',    'scene_1', 'Stats.tattoo==false'],
            ['/bar/scene_1_tattoo.jpg',    'scene_1', 'Stats.tattoo==false'],
            '/bar/scene_2.jpg',
            '/bar/scene_3.jpg',
    */

    /* audio */
    'sound/bg_theme.mp3',
    'sound/click.mp3',
    'sound/flick.wav',
    'sound/click-map-close.ogg',
    'sound/click-map-open.wav',

    'sound/skillcheck_success_00.wav',
    'sound/skillcheck_fail_00.wav',


    /* effects */
    'effects/love.png',

    /* user icons */
    'user/female-0-3.png',
    'user/female-1-3.png',
    'user/female-2-3.png',
    'user/female-3-3.png',
    'user/map.png',

    /* map */
    'map/map-back.jpg',
    'map/map-close.png',
    'map/map-point-1.png',
    'map/map-point-2.png',

    /*
    'map/point/img-point1.jpg',
    'map/point/img-point2.jpg',
    'map/point/img-point3.jpg',
    'map/point/img-point4.jpg',
    'map/point/img-point5.jpg',
*/

    /*
    *       GAME SLIDES
    * */
    'img/intro_1.jpg',
    'img/intro_2.jpg',
    'img/intro_3.jpg',


];

async function initGame() {


    $showEl('loading');

    if (await Preload.loadFiles(GAME_FILES) === false) {
        return false;
    }

    $hideEl('loading');

    // Если требуется принудительный клик
    if (fixAutoplay) {

        $showEl('force-click')

        $("#force-click button").on('click', function () {

            $hideEl('force-click')

            $showEl('game')
            $showEl('choices')
            $("#choices").addClass('hidden');

            initScene();
        });

    } else {

        $showEl('game')
        $showEl('choices')
        $("#choices").addClass('hidden')

        initScene()
    }

}


async function initScene() {

    Dialog.setCharacter('');
    Dialog.setCharacter('Intro', 'Red');
    Dialog.setCharacter('Angel');
    Dialog.setCharacter('Michael');

    await img('intro_1.jpg');


    // init player icon
    iconMain.texture = await getTexture('female-0-3');

    // init map icon
    iconMap.texture = await getTexture('map');

    // init map
    map = new MapApi(await getTexture('map-back'));
    map.addPoint('map-door-1',  await getTexture('map-point-1'), 553, 409, async ()=> await callPoint1());
    map.addPoint('map-door-2',  await getTexture('map-point-2'), 986, 810, async ()=> await callPoint2());
    map.addPoint('map-close', await getTexture('map-close'), 1820, 75, async ()=> {
        Audio.playSound('map-close.ogg');
        await map.fadeOut();
    });

    // map click
    iconMap.onClick = async function () {
        Audio.playSound('click-map-open');
        await map.fadeIn();
    };

    runIconMainUpdater();
    scenario();

}



function runIconMainUpdater() {

    var prevSprite = '';

    setInterval(async () => {

        let curSprite = Stats.sex + '-' + Stats.lust_cur + '-' + Stats.lust_max;

        if (prevSprite === curSprite) {
            return;
        }

        prevSprite = curSprite;
        iconMain.texture = await getTexture(curSprite);

    }, 1000);
}
