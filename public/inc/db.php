<?php
/**
 * @file Database singleton.
 * @copyright Alexey Ptitsyn <numidium.ru@gmail.com>, 2019.
 */

class DB
{
  private static $_instance = null;
  private $_PDO = null;

  private function __construct() {
    $this->_PDO = new PDO(
      'mysql:dbname=' . DB_NAME .
      ';host=' . DB_HOST .
      ';charset=utf8',
      DB_USERNAME,
      DB_PASSWORD,
      [
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'",
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET CHARACTER SET 'utf8'",
      ]
    );

    $this->_PDO->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    $this->_PDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  } // Constructor

  private function __clone () {}
  private function __wakeup () {}

  public static function getInstance() {
    if (is_null(self::$_instance)) {
      self::$_instance = new self();
    }

    return self::$_instance;
  } // ::getInstance();

  public static function getPDO() {
    $instance = self::getInstance();

    return $instance->_PDO;
  } // ::getPDO();
} // class DB
