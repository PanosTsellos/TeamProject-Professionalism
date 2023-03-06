<?php
 
/**
 * Endpoint for handling client errors (400 responses)
 * 
 * @author Panagiotis Tsellos w20024460
 */
class ClientError extends Endpoint
{
    
    public function __construct($message = "", $code = 400) {
        // Set the relevant response code
        http_response_code($code);
 
        // We are following the same pattern for all endpoints
        $this->setData( array(
            "length" => 0,
            "message" => $message,
            "data" => null
        ));
    }
}