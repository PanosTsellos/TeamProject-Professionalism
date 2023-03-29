
<?php
class InsertProject extends Endpoint 
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
        if (!filter_has_var(INPUT_POST,'Title') || !filter_has_var(INPUT_POST,'Abstract') || !filter_has_var(INPUT_POST,'Main_Text') || !filter_has_var(INPUT_POST,'Partners') || !filter_has_var(INPUT_POST,'img') || !filter_has_var(INPUT_POST,'status')) {
          throw new ClientError("All parameters are required", 400);
        }
        // Add any other validation for required parameters
      }
      private function validateRequestMethod($method) {
        if ($_SERVER['REQUEST_METHOD'] != $method) {
          throw new ClientError("Invalid Request Method", 405);
         }}

      protected function initialiseSQL() {
        $title = $_POST['Title'];
        $abstract = $_POST['Abstract'];
        $mainText = $_POST['Main_Text'];
        $partners = $_POST['Partners'];
        $img = $_POST['img'];
        $status = $_POST['status'];
        $sql = "INSERT INTO Projects (Title, Abstract, Main_Text, Partners, img, status) VALUES (:title, :abstract, :mainText, :partners, :img, :status)";
        $this->setSQL($sql);
        $this->setSQLParams([
          'title' => $title,
          'abstract' => $abstract,
          'mainText' => $mainText,
          'partners' => $partners,
          'img' => $img,
          'status' => $status
        ]);
      }
}

