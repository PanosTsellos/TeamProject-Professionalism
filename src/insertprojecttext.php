<?php
class InsertProjectText extends Endpoint 
{
    public function __construct() {
        $this->validateRequestMethod("POST");
        $this->validateInsertParams();
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

      private function validateInsertParams() {
        if (!filter_has_var(INPUT_POST,'text')) {
          throw new ClientError("Text parameter required", 400);
        }
        // Add any other validation for required parameters
      }
      private function validateRequestMethod($method) {
        if ($_SERVER['REQUEST_METHOD'] != $method) {
          throw new ClientError("Invalid Request Method", 405);
         }}

      protected function initialiseSQL() {
        $text = $_POST['text'];
        // Add any other parameters required for the insert statement
        $sql = "INSERT INTO Projects_Text (text) VALUES (:text)";
        $this->setSQL($sql);
        $this->setSQLParams([
          'text' => $text
        ]);
      }
}
