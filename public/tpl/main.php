<!DOCTYPE html>
<html>
<?php
  require_once 'head.php';
?>
<body>

<header class="header">
  <nav class="header__nav">
    <?php

    $links = [
      'Index' => 'index',
      'Item 1' => '#',
      'Item 2' => '#',
      'Item 3' => '#'
    ];

    ?>

    <?php foreach ($links as $caption => $href): ?>
      <a href="<?=$href?>" class="header__link <?=$href == $url ? 'active' : ''?>"><?=$caption?></a>
    <?php endforeach; ?>
  </nav>
</header>

<main class="main">
  <?php eval( '?>' . $content . '<?php '); ?>
</main>

<footer class="footer">
  <div class="footer__left">
    <div class="footer__copyright">
      &copy; 2020&ndash;<?=date('Y')?> ...
    </div>
    <div class="footer__text">
      Some text...
    </div>
  </div><!-- /.footer__left -->
  <div class="footer__right">
    [buttons]
  </div>
</footer>

</body>
</html>
