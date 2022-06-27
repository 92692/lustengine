<?php
require "libs/engine/router.php";

global $config, $user;

$config['menu'] = [
    'ГЛАВНАЯ'		=> [ 'uri' => '/' ],
    'ЭПИЗОДЫ'	    => [ 'uri' => '/episodes/' ],
    'ИНФО'	        => [ 'uri' => '/docs/' ],
    'PROFILE'	    => [ 'uri' => '/profile/', 		'login' => true ],
];



Route::get('/', function() { view('index'); });
Route::get('/episodes/', function() { view('episodes'); });
Route::get('/game/episode_1/', function() { load_game('game/episode_1'); });
Route::get('/game/episode_2/', function() { load_game('game/episode_2'); });
Route::get('/docs/', function() { view('docs'); });
return Route::dispatch();







function view($template, $args = [])
{
    global $config, $user;


    foreach($args as $key => $value) {
        $$key = $value;
    }

    include 'pages/site/layout.html';
}

function load_game($root) {

    $js_files = [];

    $di = new RecursiveDirectoryIterator($root, RecursiveDirectoryIterator::SKIP_DOTS);
    $it = new RecursiveIteratorIterator($di);

    foreach($it as $file) {
        if ($file->getExtension() === 'js') {
            $js_files[] = $file->getPathname();
        }
    }

    include 'pages/index.html';

}


function is_uri($str)
{
    return $_SERVER['REQUEST_URI'] === $str;
}

function TEXT($text) {
    return $text;
}