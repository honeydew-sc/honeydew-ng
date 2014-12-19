# honeydew-ng #

[![Build Status](https://travis-ci.org/gempesaw/honeydew-ng.png?branch=master)](https://travis-ci.org/gempesaw/honeydew-ng)

The `bower` and `composer` dependencies are checked in to the repo, so
you shouldn't have to `bower install` or `composer
install`. So, just

```bash
$ npm install
$ grunt serve
```

For the backend to work, you'll need to get `backend/rest.php` and
`backend/rest-routes` into the root of your folder being served, such
that

```bash
$ curl localhost/rest.php
```

would hit this repo's `backend/rest.php`. Your setup can obviously
vary, but if you're on OS X, using the built-in Apache should be
feasible. Sudo edit your `/etc/apache2/httpd.conf` and [uncomment the
php5 line][uncomment]

```
LoadModule php5_module libexec/apache2/libphp5.so
```

if necessary; then `sudo apachectl start`.

The default folder served by Apache is
`/Library/WebServer/Documents`, so you could symlink the necessary
files if you wanted (assuming your `httpd.conf` has FollowSymLinks set
for that directory).

```bash
$ ln -s backend/rest-routes /Library/WebServer/Documents/rest-routes
$ ln -s backend/rest.php /Library/WebServer/Documents/rest.php
```

[uncomment]: http://coolestguidesontheplanet.com/get-apache-mysql-php-phpmyadmin-working-osx-10-9-mavericks/

## configuration

Configuration is copied out of the `/opt/honeydew/honeydew.ini` file
via the `ngconstant:build` task into app/config.js. It also draws data
from a `domains.json` file in the root of this repo. Empty copies of
`app/config.js` and `domains.js` are kept in the module via git's
`update-index`:

    $ git update-index --assume-unchanged app/config.js

## contributing

### style & organization

For the most part, attempt to conform to
johnpapa/angularjs-styleguide. For file organization, explicit routes
like `monitor`, `editor (features|phrases|sets)`, `landing` - those
pieces are at the top level along with `app.js`. Everything else is
goes in the `components/` folder and they're handled via AngularJS's
DI and the `grunt fileblocks` plugin.

Note that we are explicitly /not/ doing group-by-type. For example,
our filetree component has a folder in `components/` with all of the
filetree services, directives, and controllers. The unit tests and end
to end tests are also in the same folder. You should be able to open
any folder in the `components/` and have all the files there that you
need to deal with. And, as usual, use SRP - keep each component in a
separate file, with the type of the thing (service, controller,
directive, etc) appended to the name: `filetree-service.js` and
`filetree-directive.js`, for example.

### current on-going refactors

1. `ng-controller="Ctrl as ctrl"` - use the ng-controller
   `ControllerAs` syntax in the html templates instead of binding the
   less explicitly in the router or something. This takes out $scope
   from your controller and replaces it with binding everything to
   `this`, and makes your html more explicit, especially when nesting
   controllers and dealing with inherited properties in nested scopes.

2. ES6! As you touch a file, change its filename to `whatever.es6.js`
   (from `whatever.js`). Ignore the normal `.js` file, add your new
   one to the repo, and use `grunt traceur` to generate the ES5
   compatible result. Courtesy of a couple traceur modules, the only
   loss of functionality is line number coordination, but I think it's
   possible to get source maps to fix this? We don't have the source
   maps set up yet, though.
