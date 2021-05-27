<?php
/**
 * @file Backend database interaction and client-server interaction API.
 * @copyright Alexey Ptitsyn <numidium.ru@gmail.com>, 2021.
 */

require_once 'config.php';
require_once 'db.php';

class Backend {
  /**
   * Gets input JSON as array.
   * @return array
   */
  public static function getInput() {
    $data = file_get_contents('php://input');
  
    if(strlen($data) == 0) {
      self::err('Zero-length input.');
    }

    $req = json_decode($data,true);
    if(json_last_error() !== JSON_ERROR_NONE) {
      self::err('Incorrect JSON.');
    }

    return $req;
  }

  /**
   * Returns error message to the client in JSON format.
   * @param string $message
   */
  public static function err($message) {
    self::res([
      'error' => true,
      'message' => $message
    ]);
  }

  /**
   * Returns abstract response to the client in JSON format. Then exits.
   * @param array|string $data
   */
  public static function res($data) {
    header('Content-type: application/json');
    echo json_encode($data);
    exit();
  }

  /**
   * Executing database request and returns it as associative array.
   * @param string $query
   * @param array $params Associative array of request substitutions.
   *                      Like `'id' => 100500`.
   * @return array
   */
  public static function dbRequest($query, $params = []) {
    $db = DB::getPDO();
    $st = $db->prepare($query);
    $st->execute($params);

    return $st->fetchAll(PDO::FETCH_ASSOC);
  }

  /**
   * Log in system. Returns succes of operation.
   * @param string $login
   * @param string $password
   * @return boolean
   */
  public static function login($login, $password) {
    $res = self::dbRequest('
      SELECT *
      FROM users
      WHERE login = :login
      AND password = :password
    ', [
      'login' => $login,
      'password' => md5($password)
    ]);

    if($res) {
      $_SESSION[SESSION_NAME] = [
        'isLoggedIn' => true
      ];

      return true;
    }

    return false;
  }

  /**
   * Log out system.
   */
  public static function logout() {
    unset($_SESSION[SESSION_NAME]);
  }

  /**
   * Check if user is logged in.
   * @return boolean
   */
  public static function isLoggedIn() {
    if(!isset($_SESSION[SESSION_NAME]) || !$_SESSION['PHP-REACT-PROJECT']) {
      return false;
    }

    return true;
  }

  /**
   * Create new page. Returns last inserted database ID.
   * @param array $page Associative array of 'page'.
   * @return int
   */
  public static function createPage($page) {
    $db = DB::getPDO();
    $st = $db->prepare(
      '
        INSERT INTO `pages` (url,
          title,
          description,
          author,
          content,
          canonical,
          headStuff,
          noIndex,
          noFollow,
          lastModified
          )
        VALUES (
          :url,
          :title,
          :description,
          :author,
          :content,
          :canonical,
          :headStuff,
          :noIndex,
          :noFollow,
          FROM_UNIXTIME(:lastModified, "%Y-%m-%d %H:%i:%s")
        )
      '
    );

    $st->execute([
      'url' => $page['url'],
      'title' => $page['title'],
      'description' => $page['description'],
      'author' => $page['author'],
      'content' => $page['content'],
      'canonical' => $page['canonical'],
      'headStuff' => $page['headStuff'],
      'noIndex' => (int)$page['noIndex'],
      'noFollow' => (int)$page['noFollow'],
      'lastModified' => $page['lastModified']
    ]);

    return $db->lastInsertId();
  }

  /**
   * Update page.
   * @param array $page Associative array of 'page'.
   */
  public static function updatePage($page) {
    self::dbRequest('
      UPDATE `pages`
      SET url = :url,
        title = :title,
        description = :description,
        author = :author,
        content = :content,
        canonical = :canonical,
        headStuff = :headStuff,
        noIndex = :noIndex,
        noFollow = :noFollow,
        lastModified = FROM_UNIXTIME(:lastModified, "%Y-%m-%d %H:%i:%s")
      WHERE id = :id
    ', [
      'id' => $page['id'],
      'url' => $page['url'],
      'title' => $page['title'],
      'description' => $page['description'],
      'author' => $page['author'],
      'content' => $page['content'],
      'canonical' => $page['canonical'],
      'headStuff' => $page['headStuff'],
      'noIndex' => (int)$page['noIndex'],
      'noFollow' => (int)$page['noFollow'],
      'lastModified' => $page['lastModified']
    ]);
  }

  /**
   * Delete page with certain ID. Returns success of operation.
   * @param int $id
   * @return boolean
   */
  public static function deletePageById($id) {
    $db = DB::getPDO();
    $st = $db->prepare(
      '
        DELETE FROM `pages`
        WHERE id = :id
      '
    );
    $st->execute([
      'id' => $id
    ]);
    return $st->rowCount() > 0;
  }

  /**
   * Get brief pages list.
   * @return array
   */
  public static function getPagesList() {
    return self::dbRequest("
      SELECT id, url, title
      FROM `pages`
    ");
  }

  /**
   * Get page array by id.
   * @param int $id Page ID.
   * @return array
   */
  public static function getPageById($id) {
    $result = self::dbRequest(
      "
        SELECT *
        FROM `pages`
        WHERE id = :id
      ",
      [
        'id' => $id
      ]
    );

    if($result) {
      return $result[0];
    }

    return null;
  }

  /**
   * Get page by url name.
   * @param string $url
   * @return array
   */
  public static function getPageByUrl($url) {
    $result = self::dbRequest(
      "
        SELECT *
        FROM `pages`
        WHERE url = :url
      ",
      [
        'url' => $url
      ]
    );

    if($result) {
      return $result[0];
    }

    return null;
  }
}
