<?php
/**
 * @file Logout backend API.
 * @copyright Alexey Ptitsyn <numidium.ru@gmail.com>, 2021.
 */

require_once '../inc/backend.php';
require_once '../inc/auth.php';

Backend::logout();

Backend::res([
  'logout' => true
]);
