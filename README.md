# Site with react dashboard example

Simple site engine with admin dashboard written in React. It uses
PHP as a backend and MySQL as a database engine.

This engine has dependencies:
- [SASS/SCSS](https://sass-lang.com/),
- [React](https://reactjs.org/),
- [react-router](https://reactrouter.com/),
- [react-redux](https://react-redux.js.org/),
- [axios](https://github.com/axios/axios),
- [babel](https://babeljs.io/) (to compile JSX).
- ...and [webpack](https://webpack.js.org/) (to compile all together).

## Installation

1. Create new mysql database.
2. Import default database tables:
    1. Pages table from `public/inc/db-pages.sql`,
    2. Users table from `public/inc/db-users.sql`.
3. Place your repository in apache `www` directory.
4. Copy `public/inc/config-default.php` to `public/inc/config.php` and edit it.
You need to set database name, host, username and password.
Also you may set different session name for php.
5. Install npm dependencies: `npm install`.
6. Compile CSS: run script `compile-css.sh`.
7. Compile dashboard: run script `compile-admin-production.sh` or `compile-admin-watch`.

Now you should be able to navigate your browser to `public` directory.
Default index page will appear.

Navigate your browser to `public/admin`.
Default username is `admin` and password is `password`.

## Project structure

1. `public` - this directory should be exposed to www.
    1. `public/assets` - Additional fonts, images and other files.
    2. `public/backend` - A set of scripts that providing backend API for the dashboard.
    3. `public/inc` - A set of server-side engine PHP scripts.
    4. `public/tpl` - Page templates in PHP.
2. `scss` - Source code for site (not dashboard) SASS/SCSS files.
3. `src` - Source code for dashboard.

## How it works

### Public part

All of the requests to site going through `index.php`. It decides
which page to show and load it to variables for templates. Then, it imports
a template from `public/tpl` directory.

There are three types of templates:
- `admin.php` - for admin page.
- `error404.php` - for 404 page.
- `main.php` - for all other pages (e.g. pages with content).

Also, templates use style sheets from `public/css` directory. This styles
should be compiled from `/scss` folder as they are written in SASS/SCSS.

### Dashboard (administration) part

Dashboard part is a React application. It locates in `src` directory
and compiles to `public/js/admin/main_bundle.js`.
It uses [SASS/SCSS](https://sass-lang.com/), [React](https://reactjs.org/),
[redux](https://react-redux.js.org/), [react-router](https://reactrouter.com/)
and [axios](https://github.com/axios/axios).
