<?php

class Home extends Endpoint
{
    /**
     * Override the constructor because we do
     * not need to query the database for this 
     * endpoint.
     */
    public function __construct() {

        //connect the database.
        $db = new Database("db/tpp.db");
        $sql="SELECT text FROM home"; 
        $result = $db->executeSQL($sql);
        $posts = $result;
      

    
        $this->setSQL($sql);

//return the data for the base endpoint.
        $name = array(
            "Group Name" => "CV8", 
            "members" => "Panagiotis Tsellos, Andreas Christodoulou, Alexandros Tamboutsiaris, Panagiotis Tamboukatis, Dimireiana Stylianou"
        );
        $module = array(
            "code" => "KV6002", 
            "name" => "Team Project and Professionalism",
        );
        $data = array(
            "name" => $name,
            "module" => $module,
            "Information" => $posts
        );
 
        // We are following the same pattern for all endpoints
        $this->setData( array(
            "length" => count($data),
            "message" => "Success",
            "data" => $data,
        ));
    }
}