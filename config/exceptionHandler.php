<?php
 /**
 * client (e) handler
 * 
 * @author Panagiotis Tsellos w20024460
 */
function exceptionHandler($e) {
    http_response_code(500);
    $output['message'] = $e->getMessage();
    $output['location']['file'] = $e->getFile();
    $output['location']['line'] = $e->getLine();
    echo json_encode($output);
}