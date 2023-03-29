<?php

class Projects extends Endpoint
{
    protected function endpointParams()
    {
        return ['id', 'status'];
    }
    
    protected function initialiseSQL()
    {
        $sql = "SELECT id, Title, Abstract, Main_Text, Partners, img,status
        FROM Projects
        WHERE 1=1";
    
        $sqlParams = array();
        
        /**
         * check if id is set in request and if it's a valid integer
         */
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
         * check if status is set in request and if it's a valid string
         */
        if (isset($_GET['status'])) {
            $status = filter_input(INPUT_GET, 'status', FILTER_SANITIZE_STRING);
            if (in_array($status, ['completed', 'not completed'])) {
                $sql .= " AND status = :status";
                $sqlParams[':status'] = $status;
            } else {
                throw new ClientError("The status must be either 'completed' or 'not completed'", 400);
            }
        }
        
        $this->setSQL($sql);
        $this->setSQLParams($sqlParams);
        return array($sql, $sqlParams);
    }
}
