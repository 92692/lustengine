var fixAutoplay = true;
var GAME_FILES = [


    /* audio */
    ['sound/bg_theme.01.mp3',  { rule: 'return !Stats.night' }],
    ['sound/bg_theme.02.mp3',  { rule: 'return Stats.night' }],
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
    'map/map-town.jpg',
    'map/map-camp.jpg',
    'map/map-close.png',
    'map/map-point-1.png',
    'map/map-point-2.png',
    'map/map-point-3.png',

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
    ['img/intro_1.jpg',  { music: 'bg_theme' } ],
    ['img/intro_2.jpg',  { music: 'bg_theme' } ],
    ['img/intro_3.jpg',  { music: 'bg_theme' }],

];


var POINTS = [

    // Карты
    ['map-town', 'map-close', 1820, 75],
    ['map-camp', 'map-close', 1820, 75],

    // Точки на картах
    ['map-town', null,          'map-point-1', 553, 409, jumpToTavern ],
    ['map-town', 'map-camp',    'map-point-2', 986, 810, jumpToCamp   ],
    ['map-camp', 'map-town',    'map-point-3', 553, 409, jumpToTown   ],
]






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

    await img('intro_1');


    // init player icon
    iconMain.texture = await getTexture('female-0-3');

    // init map icon
    iconMap.texture = await getTexture('map');


    await map.loadPoints(POINTS);


/*

    map.addMap('town', await getSprite('map-back'), await getSprite('map-close'), 1820, 75);
    map.addPoint('town', null, await getSprite('map-point-1'), 553, 409, jumpToTavern);
    map.addPoint('town', 'camp', await getSprite('map-point-2'), 986, 810, jumpToCamp);

    map.addMap('camp', await getSprite('map-camp'), await getSprite('map-close'), 1820, 75);
    map.addPoint('camp', 'town', await getSprite('map-point-2'), 986, 810, jumpToTown);

*/

        // map click
    iconMap.onClick = async ()=> { await map.fadeIn(); };

    iconMain.fadeIn();
    iconMap.fadeIn()

    await sleep(66666);

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
