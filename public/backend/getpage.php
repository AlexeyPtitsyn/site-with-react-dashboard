<?php
/**
 * @file Load page backend API.
 * @copyright Alexey Ptitsyn <numidium.ru@gmail.com>, 2021.
 */

require_once '../inc/backend.php';
require_once '../inc/auth.php';

$input = Backend::getInput();

if(!$input['id']) {
  Backend::err('No id specified.');
}

$result = Backend::getPageById($input['id']);

$result['lastModified'] = strtotime($result['lastModified']);
$result['noIndex'] = ($result['noIndex'] ? true : false);
$result['noFollow'] = ($result['noFollow'] ? true : false);

Backend::res([
  'error' => false,
  'page' => $result
]);
