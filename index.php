<?php
require "libs/Route66.php/Route66.php";
use Route66 as Route;

global $config, $user;

$config['menu'] = [
    'NEWS'		=> [ 'uri' => '/' ],
    'EPISODES'	=> [ 'uri' => '/episodes/' ],
    'DOCS'	    => [ 'uri' => '/docs/' ],
    'PROFILE'	=> [ 'uri' => '/profile/', 		'login' => true ],
];



Route::get('/', function() { view('index'); });
Route::get('/episodes/', function() { view('episodes'); });
Route::get('/docs/', function() { view('docs'); });
Route::dispatch();













function view($template, $args = [])
{
    global $config, $user;

    foreach($args as $key => $value) {
        $$key = $value;
    }

    include 'pages/layout.html';
}

function is_uri($str)
{
    return $_SERVER['REQUEST_URI'] === $str;
}

function TEXT($text) {
    return $text;
}