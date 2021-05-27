<?php
/**
 * @file Delete page backend API.
 * @copyright Alexey Ptitsyn <numidium.ru@gmail.com>, 2021.
 */

require_once '../inc/backend.php';
require_once '../inc/auth.php';

$input = Backend::getInput();

if(!$input['id']) {
  Backend::err('No id specified.');
}

if(Backend::deletePageById($input['id'])) {
  Backend::res([
    'error' => false
  ]);
}

Backend::err('Unable to delete page with id: ' + $input['id']);
