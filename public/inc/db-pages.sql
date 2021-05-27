SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE TABLE `pages` (
  `id` int(11) NOT NULL,
  `url` tinytext COLLATE utf8mb4_bin,
  `title` tinytext COLLATE utf8mb4_bin,
  `description` text COLLATE utf8mb4_bin,
  `author` tinytext COLLATE utf8mb4_bin,
  `content` text COLLATE utf8mb4_bin,
  `canonical` tinytext COLLATE utf8mb4_bin,
  `headStuff` text COLLATE utf8mb4_bin,
  `noIndex` tinyint(4) DEFAULT NULL,
  `noFollow` tinyint(4) DEFAULT NULL,
  `lastModified` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;


INSERT INTO `pages` (`id`, `url`, `title`, `description`, `author`, `content`, `canonical`, `headStuff`, `noIndex`, `noFollow`, `lastModified`) VALUES
(1, 'index', 'Index page', 'An example of description.', 'author', '<h1>Page header</h1>\n\n<h2>Headers</h2>\n<hr>\n<h1>Header 1</h1>\n<h2>Header 2</h2>\n<h3>Header 3</h3>\n<h4>Header 4</h4>\n<h5>Header 5</h5>\n<h6>Header 6</h6>\n<hr>\n\n<h2>Images</h2>\n<figure class=\"float_left\">\n  <img src=\"https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png\" width=\"200\" />\n</figure>\n\n<figure class=\"float_right\">\n  <img src=\"https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png\" width=\"200\" />\n  \n  <figcaption>A caption for image</figcaption>\n</figure>\n\n<div class=\"clear-both\"></div>\n\n<hr>\n\n<div class=\"center\">\n  <figure>\n    <img src=\"https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png\" width=\"200\" />\n    \n    <figcaption>A caption for image</figcaption>\n  </figure>\n</div>\n\n\n<h2>Content</h2>\n<?php for($i = 0; $i < 5; $i++): ?>\n<p>\n  Lorem ipsum dolor sit amet, <b>consectetur</b> adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut <i>aliquip ex</i> ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n</p>\n<?php endfor;?>\n\n<h2>Links</h2>\n<a href=\"#\">Regular link</a>\n\n<a href=\"javascript:(() => {})()\">JS-link</a>\n\n<blockquote>\n  <p>\n    Lorem ipsum dolor sit amet, <b>consectetur</b> adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut <i>aliquip ex</i> ea <var>test var</var> commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n  </p>\n</blockquote>\n\n<code>\n<pre>\ntest 000\ntest 2\n</pre>\n</code>\n\n<p>\n  Some inline code elements. <kbd>kbd tag</kbd>; <var>var tag...</var>. Test. Hit <kbd>Ctrl-w</kbd> to close tab. <q>Quote</q>. <q data-lang=\"ru\">Цитата</q>.\n</p>\n\n<p>\n  <mark>Marked</mark> <abbr title=\"test\">abbr</abbr> <s>test of strike-through text</s>.\n</p>\n\n\n<h2>Lists</h2>\n\n<ul>\n  <li>One</li>\n  <li>Two\n    <ul>\n      <li>Two - one</li>\n      <li>Two - two</li>\n      <li>Two - three</li>\n    </ul>\n  </li>\n  <li>Three</li>\n</ul>\n\n<ol>\n  <li>One</li>\n  <li>Two\n    <ol>\n      <li>Two - one</li>\n      <li>Two - two</li>\n      <li>Two - three</li>\n    </ol>\n  </li>\n  <li>Three</li>\n</ol>\n\n<dl>\n  <dt>Term</dt>\n  <dd>Lorem ipsum dolor sit amet, <b>consectetur</b> adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut <i>aliquip ex</i> ea <var>test var</var> commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</dd>\n    <dt>Term</dt>\n  <dd>Lorem ipsum dolor sit amet, <b>consectetur</b> adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut <i>aliquip ex</i> ea <var>test var</var> commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</dd>\n</dl>\n', 'canonical', '<!-- head stuff -->', 0, 0, '2021-05-27 07:27:46');

ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
