<?php

/** 
 * Update abstract
 * 
 * Update the abstract for a specified paper. A valid JWT
 * is required.
 * 
 * @author W20015975 Andreas Christodoulou
 */
class UpdateProjectText extends Endpoint 
{
    public function __construct() {
        $this->validateRequestMethod("POST");
       
        $this->validateUpdateParams();
        $db = new Database("db/tpp.db");
        $this->initialiseSQL();
        $queryResult = $db->executeSQL($this->getSQL(), $this->getSQLParams());
       
        // No need to set status code
       
        // Return a success message
        $this->setData( array(
          "length" => 0,
           "message" => "Success",
           "data" => null
        ));
      }
      private function validateRequestMethod($method) {
        if ($_SERVER['REQUEST_METHOD'] != $method) {
          throw new ClientError("Invalid Request Method", 405);
         }}
        
          
          private function validateUpdateParams() {
 
            // 1. Look for a abstract and paper_id parameter
            if (!filter_has_var(INPUT_POST,'text')) {
              throw new ClientError("Text parameter required", 400);
            }
            if (!filter_has_var(INPUT_POST,'id')) {
              throw new ClientError("Text id  parameter required", 400);
            }
           // if (!filter_has_var(INPUT_POST,'abstract')) {
             // throw new ClientError("abstract parameter required", 400);
           // }
                 
            // 2. Check to see if a valid abstract is supplied 
            
          }
          protected function initialiseSQL() {
            $abstract = $_POST['text'];
            $paperId = $_POST['id'];
           // $abstract = $_POST['abstract']; , abstract=:abstract
            $sql = "UPDATE  Projects_Text SET text = :text  WHERE id = :id";
            $this->setSQL($sql);
            $this->setSQLParams([
              'text' => $abstract,
              'id' => $paperId,
             // 'abstract' => $abstract,
            ]);
          }

}