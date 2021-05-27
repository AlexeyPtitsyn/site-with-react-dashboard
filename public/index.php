<?php
/**
 * @file Page render backend.
 * @copyright Alexey Ptitsyn <numidium.ru@gmail.com>, 2020.
 */

$page = null;
if(isset($_GET['page'])) {
  $page = $_GET['page'];
}

if($page == 'admin') {
  require_once 'tpl/admin.php';
  exit();
}

if(!$page) {
  $page = 'index';
}

require_once 'inc/backend.php';

$result = Backend::getPageByUrl($page);

if(!$result) {
  http_response_code(404);
  require_once 'tpl/error404.php';
  exit();
}

renderPage($result);

/**
 * Check value. If not exist, return default item.
 * @param mixed $item
 * @param mixed $default
 * @return mixed
 */
function checkDefault($item, $default) {
  if(isset($item)) {
    return $item;
  }

  return $default;
}

/**
 * Render page to client.
 * @param array $pageArray Array of page parameters and data.
 */
function renderPage($pageArray) {
  if(isset($pageArray['lastModified'])) {
    // Getting last modified unix-time (in seconds);
    $lastModifiedTime = strtotime($pageArray['lastModified']);
    $lastModifiedString = gmdate("D, d M Y H:i:s \G\M\T", $lastModifiedTime);
    header('Last-Modified: ' . $lastModifiedString);
  }

  // Default values:
  $url = checkDefault($pageArray['url'], '');
  $title = checkDefault($pageArray['title'], '');
  $noIndex = checkDefault($pageArray['noIndex'], false);
  $noFollow = checkDefault($pageArray['noFollow'], false);
  $description = checkDefault($pageArray['description'], '');
  $author = checkDefault($pageArray['author'], '');
  $canonical = checkDefault($pageArray['canonical'], '');
  $headStuff = checkDefault($pageArray['headStuff'], '');
  $content = checkDefault($pageArray['content'], '');

  require_once 'tpl/main.php';

  exit();
}
