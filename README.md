# honeydew-ng #

[![Build Status](https://travis-ci.org/gempesaw/honeydew-ng.png?branch=master)](https://travis-ci.org/gempesaw/honeydew-ng)

We use [`composer`] to manage our backend dependencies, [`npm`] to
manage our frontend build dependencies, and bower to manage the front
end deps that get loaded in the browser. We've made a few changes to
our bower dependencies, so they're checked in, but you'll need to
manually install the `composer` and `npm` deps before using `grunt` to
start up the app:

[`composer`]: https://getcomposer.org/
[`npm`]: https://www.npmjs.com/

```bash
$ composer install
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

The default folder served by Apache is `/Library/WebServer/Documents`,
so you could symlink the necessary files if you wanted (assuming your
`httpd.conf` has FollowSymLinks set for that directory). Run these
commands from the `ng` directory such that there is a `backend` folder
in your directory.

```bash
$ sudo ln -s $(pwd)/backend/rest-routes /Library/WebServer/Documents/rest-routes
$ sudo ln -s $(pwd)/backend/rest.php /Library/WebServer/Documents/rest.php
```

[uncomment]: http://coolestguidesontheplanet.com/get-apache-mysql-php-phpmyadmin-working-osx-10-9-mavericks/

## configuration

Configuration is copied out of the `/opt/honeydew/honeydew.ini` file
via the `ngconstant:build` task into app/config.js. Empty copies of
`app/config.js` are kept in the module via git's `update-index`.

## usage gotchas

The version of grep that apache/_www/your webserver user has access to
might be too old to recognize some of the flags we use. You may need
to

    $ sudo mv /usr/bin/grep /usr/bin/grep-backup
    $ sudo ln -s /usr/local/bin/grep /usr/bin/grep

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

2. modularize! when applicable, make your new component part of its
   own module. Currently in progress:

       * sc.cmmodes - this should have all of the CodeMirror modes in
         it, but it currently only has reportMode

3. `Start using Settings module` - currently, many of the settings
   talk directly to `$localStorage` and `$sessionStorage`. That's
   unhelpful because we're planning to switch out our dependency on
   the ngStorage module sometime in the future due to poor support and
   bad performance. Before we do that, we need to switch all direct
   uses over to the new Settings class in
   [app/components/settings/settings-service.es6][settings].

[settings]: app/components/settings/settings-service.es6
