<?php


class Route
{
    private static $paths = [];

    public static function get($text, callable $func)
    {
        self::$paths[] = [
            'text'      => $text,
            'func'      => $func,
        ];
    }

    public static function dispatch($skip_query = false)
    {
        //$uri = $_SERVER['REQUEST_URI'];
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

        foreach(self::$paths as $path)
        {
            if (!empty($path['text']) && $path['text'] === $uri) {
                call_user_func_array($path['func'], []);
                return true;
            }
        }

        return false;
    }

}