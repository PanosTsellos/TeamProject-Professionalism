<?php

/**
 * Connect and interact with an SQLite database 
 * 
 * @author Panagiotis Tsellos w20024460
 */
class Database 
{
    private $dbConnection;
   
    public function __construct($dbName) {
        $this->setDbConnection($dbName);
    }

    /**
     * Create database connection using PDO
     */
    private function setDbConnection($dbName) {
        try {           
            $this->dbConnection = new PDO('sqlite:'.$dbName);
            $this->dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch( PDOException $e ) {
            echo "Database Connection Error: " . $e->getMessage();
            exit();
        }
     }

    
    public function executeSQL($sql, $params=[]) { 
        $stmt = $this->dbConnection->prepare($sql);
        $stmt->execute($params);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}