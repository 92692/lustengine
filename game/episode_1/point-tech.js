
var POINT1_CALLED = false;



async function callPoint1() {

    mapMain.visible = false;
    Dialog.hide();

    await img('img_8287.jpg');
    await say('Intro', 'У меня много секретов!');


    await Dialog.choise({
        'Ничего' : async ()=>{
            await say('Intro', 'Ну тогда пока!');
        },
        'Получить разрешение да' : async ()=>{
            await say('Intro', 'Хорошо, ты получаешь разрешение.');
            POINT1_CALLED = true;
        },
        'диалог внутри' : async ()=>{

            await say('Intro', 'Выбери паука!');
            result = await Dialog.choise(['чёрный', 'красный', 'еле живой']);
            await say('Intro', 'вам достаётся ' + result + ' паук');
        },
        'эффект: тряска' : async ()=>{

            await Display.effectShake();
        },
        'эффект: похоть' : async ()=>{

            if(Stats.lust_cur === Stats.lust_max) {
                Stats.lust_cur = 0;
            } else {
                Stats.lust_cur = Stats.lust_max;
            }
        },

    })

    await Dialog.hide();
    scenario();

}

async function callPoint2() {

    mapMain.visible = false;
    Dialog.hide();

    img('img-point1.jpg');

    if (!POINT1_CALLED) {
        await say('Intro', 'Вам запрещено сюда заходить!');
        Dialog.hide();
        MainScenario();
        return;
    }

    await say('Intro', 'Здравствуйте. Можно войти?');
    img('img-point2.jpg');
    await say('Intro', 'Входи. Садись. Входи. Садись. Входи. Садись. Входи. Садись. ');
    img('img-point3.jpg');
    await say('Intro', 'А теперь А теперь А теперьА теперьА теперь приступай к работе.');
    img('img-point4.jpg');
    await say('Intro', 'Вот так. Хорошо.Хорошо.Хорошо.Хорошо.');
    img('img-point5.jpg');
    await say('Intro', 'Глотай. А теперь уходи.');
    Dialog.hide();
    scenario();
}







var test;


function testParticle() {


    let config = {
        "lifetime": {
            "min": 0.5,
            "max": 0.5
        },
        "frequency": 0.008,
        "emitterLifetime": 0.31,
        "maxParticles": 1000,
        "addAtBack": false,
        "pos": {
            "x": 0,
            "y": 0
        },
        "behaviors": [
            {
                "type": "alpha",
                "config": {
                    "alpha": {
                        "list": [
                            {
                                "time": 0,
                                "value": 0.8
                            },
                            {
                                "time": 1,
                                "value": 0.1
                            }
                        ]
                    }
                }
            },
            {
                "type": "moveSpeed",
                "config": {
                    "speed": {
                        "list": [
                            {
                                "time": 0,
                                "value": 200
                            },
                            {
                                "time": 1,
                                "value": 100
                            }
                        ]
                    }
                }
            },
            {
                "type": "scale",
                "config": {
                    "scale": {
                        "list": [
                            {
                                "time": 0,
                                "value": 1
                            },
                            {
                                "time": 1,
                                "value": 0.3
                            }
                        ]
                    },
                    "minMult": 1
                }
            },
            {
                "type": "color",
                "config": {
                    "color": {
                        "list": [
                            {
                                "time": 0,
                                "value": "fb1010"
                            },
                            {
                                "time": 1,
                                "value": "f5b830"
                            }
                        ]
                    }
                }
            },
            {
                "type": "rotationStatic",
                "config": {
                    "min": 0,
                    "max": 360
                }
            },
            {
                "type": "textureRandom",
                "config": {
                    "textures": [
                        "img/fog.png"
                    ]
                }
            },
            {
                "type": "spawnShape",
                "config": {
                    "type": "torus",
                    "data": {
                        "x": 0,
                        "y": 0,
                        "radius": 10,
                        "innerRadius": 0,
                        "affectRotation": false
                    }
                }
            }
        ]
    };




    config = {


        "addAtBack": false,
        "lifetime": {
            "min": 1,
            "max": 2
        },

        "blendMode": "add",
        "frequency": 0.01,
        "emitterLifetime": 1,
        "maxParticles": 100,
        "behaviors": [
            {
                "type": "alpha",
                "config": {
                    "alpha": {
                        "list": [
                            {
                                "time": 0,
                                "value": 0.4
                            },
                            {
                                "time": 1,
                                "value": 0.8
                            }
                        ]
                    }
                }
            },
            /*{
                "type": "moveSpeed",
                "config": {
                    "speed": {
                        "list": [
                            {
                                "time": 0,
                                "value": 400
                            },
                            {
                                "time": 1,
                                "value": 500
                            }
                        ]
                    }
                }
            },*/
            {
                type: 'moveSpeed',
                config: {
                    speed: {
                        list: [{value: 600, time: 0}, {value: 500, time: 0.25}, {value: 400, time: 1}],
                    },
                    minMult: 0.8
                }
            },
            {
                "type": "scale",
                "config": {
                    "scale": {
                        "list": [
                            {
                                "time": 0,
                                "value": 1
                            },
                            {
                                "time": 1,
                                "value": 1.2
                            }
                        ]
                    },
                    "minMult": 1
                }
            },
            {
                "type": "color",
                "config": {
                    "color": {
                        "list": [
                            {
                                "time": 0,
                                "value": "eeeeee"
                            },
                            {
                                "time": 1,
                                "value": "e0e0e0"
                            }
                        ]
                    }
                }
            },
            {
                "type": "rotationStatic",
                "config": {
                    "min": 160,
                    "max": 200
                }
            },
            {
                "type": "textureRandom",
                "config": {
                    "textures": [
                        "img/fog.png"
                    ]
                }
            },



        ]
    };



    test = new ParticleExample(
        // The image to use
        ["img/fog.png"],

        // Emitter configuration, edit this to change the look
        // of the emitter
        config
    );

}












