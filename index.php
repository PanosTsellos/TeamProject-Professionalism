<?php
/**
 * Index with paths and get/post requestd
 * 
 * @author Panagiotis Tsellos w20024460
 */
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Headers: *");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {    
    exit(0);
} 

include 'config/autoloader.php';
spl_autoload_register('autoloader');

include 'config/exceptionHandler.php';
set_exception_handler('exceptionHandler');

//include exceptionhandler as autoloader above
 
if (!in_array($_SERVER['REQUEST_METHOD'], array("GET", "POST"))){
    // Updated to use the ClientError endpoint
    $endpoint = new ClientError("Invalid method: ". $_SERVER['REQUEST_METHOD'], 405);
} else {

    // Work out the request from the path
    $path = parse_url($_SERVER['REQUEST_URI'])['path'];
    $path = str_replace("/tpp","",$path);
 
    // Route the request as appropriate
    try {
        switch ($path) {
            case '/':
                $endpoint = new Home();
                break;
            default:
                $endpoint = new ClientError("Path not found: " . $path, 404);
        }
    }catch(ClientErrorException $e) {
        $endpoint = new ClientError($e->getMessage(), $e->getCode());
    }
    
}
 
$response = $endpoint->getData();
echo json_encode($response);
