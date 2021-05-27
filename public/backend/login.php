<?php
/**
 * @file Login backend API.
 * @copyright Alexey Ptitsyn <numidium.ru@gmail.com>, 2021.
 */

require_once '../inc/backend.php';

$input = Backend::getInput();

if(!$input['login']) {
  Backend::err('No login specified.');
}
if(!$input['password']) {
  Backend::err('No password specified.');
}

session_start();

Backend::res([
  'isLoggedIn' => Backend::login($input['login'], $input['password'])
]);
