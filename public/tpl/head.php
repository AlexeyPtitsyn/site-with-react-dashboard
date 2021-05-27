<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title><?=htmlspecialchars($title)?></title>

  <meta name="robots"
    content="<?=$noIndex ? 'noindex' : 'index'?>,<?=$noFollow ? 'nofollow' : 'follow'?>">

  <?php if($description): ?>
    <meta name="description" content="<?=htmlspecialchars($description)?>">
  <?php endif; ?>

  <?php if($author): ?>
    <meta name="author" content="<?=htmlspecialchars($author)?>">
  <?php endif; ?>
  
  <?php if($canonical): ?>
    <link rel="canonical" href="<?=$canonical?>">
  <?php endif; ?>

  <link rel="stylesheet" type="text/css" href="css/main.css">

  <?=$headStuff?>
</head>
