<?php
/**
 * @file Save page backend API.
 * @copyright Alexey Ptitsyn <numidium.ru@gmail.com>, 2021.
 */

require_once '../inc/backend.php';
require_once '../inc/auth.php';

$input = Backend::getInput();

if(!$input['page']) {
  Backend::err('No page specified.');
}

if(isset($input['page']['id'])) {
  // Update existing page
  $id = $input['page']['id'];

  Backend::updatePage($input['page']);
} else {
  // Create one page

  $id = Backend::createPage($input['page']);
}

$result = Backend::getPageById($id);

$result['lastModified'] = strtotime($result['lastModified']);
$result['noIndex'] = ($result['noIndex'] ? true : false);
$result['noFollow'] = ($result['noFollow'] ? true : false);

Backend::res([
  'error' => false,
  'page' => $result
]);
