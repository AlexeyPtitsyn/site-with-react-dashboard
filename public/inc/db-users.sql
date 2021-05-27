SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `login` tinytext COLLATE utf8mb4_bin NOT NULL,
  `password` tinytext COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

INSERT INTO `users` (`id`, `login`, `password`) VALUES
(1, 'admin', '5f4dcc3b5aa765d61d8327deb882cf99');

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
