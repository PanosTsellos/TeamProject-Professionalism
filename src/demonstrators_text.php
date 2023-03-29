<?php


class Demonstrators_Text extends Endpoint
{
    protected function endpointParams()
    {
        return ['id', 'text'];
    }
    protected function initialiseSQL()
    {
        $sql = "SELECT id,text
        FROM Demonstrators_Text
        WHERE 1=1";
    
        $sqlParams = array();
         /**
         * check if author_id is set in request and if it's a valid integer
         */
         // check if id is set in request and if it's a valid integer
         if (isset($_GET['id'])) {
            $id = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);
            if ($id !== false) {
                $sql .= " AND id = :id";
                $sqlParams[':id'] = $id;
            } else {
                throw new ClientError("The id must be a valid integer", 400);
            }
        }
          /**
         * check if first_name is set in request and if it's a valid string
         */
        
        

        $this->setSQL($sql);
        $this->setSQLParams($sqlParams);
        return array($sql, $sqlParams);
        
    }
  

        
}
