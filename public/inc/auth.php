<?php
/**
 * @file This module throw JSON error on session timeout
 *       or in "not logged in" case.
 * @copyright Alexey Ptitsyn <numidium.ru@gmail.com>, 2021.
 */

require_once "backend.php";

session_start();

if(!Backend::isLoggedIn()) {
  Backend::res([
    'error' => true,
    'message' => 'Not logged in.',
    'loginError' => true
  ]);
}
