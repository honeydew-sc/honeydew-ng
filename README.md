# honeydew-ng #

[![Build Status](https://travis-ci.org/gempesaw/honeydew-ng.png?branch=master)](https://travis-ci.org/gempesaw/honeydew-ng)

The `bower` and `composer` dependencies are checked in to the repo, so
you shouldn't have to `bower install` or `composer
install`. Otherwise, just

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
