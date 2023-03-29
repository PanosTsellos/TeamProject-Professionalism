<?php

/**
 * A general class for events 
 * 
 * @author Panagiotis Tsellos w20024460
 */
class Events extends Endpoint{
protected function endpointParams() {
    return ['id'];
 }
 
 protected function initialiseSQL() {
    $sql = "SELECT *
     FROM events";


        $this->setSQL($sql);
    }
   
}