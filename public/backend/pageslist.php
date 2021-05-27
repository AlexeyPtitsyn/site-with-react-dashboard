<?php
/**
 * @file Get pages list backend API.
 * @copyright Alexey Ptitsyn <numidium.ru@gmail.com>, 2021.
 */

require_once '../inc/backend.php';
require_once '../inc/auth.php';

$pages = Backend::getPagesList();

Backend::res([
  'error' => false,
  'pages' => $pages
]);
