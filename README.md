# honeydew-ng #

[![Build Status](https://travis-ci.org/gempesaw/honeydew-ng.png?branch=master)](https://travis-ci.org/gempesaw/honeydew-ng)

Presuming you have `grunt` and `bower` installed globally:

```
$ npm install
$ bower install
$ grunt serve
```

## caveats

The pusher library requests pusher.min.js from a CDN; its HTTPS cert
is wonky. Replace the old script url in
`app/bower-components/angular-pusher/angular-pusher.js` with the new
one:

    -  var scriptUrl = '//js.pusher.com/2.1/pusher.min.js';
    +  var scriptUrl = '//d3dy5gmtp8yhk7.cloudfront.net/2.1/pusher.min.js';
