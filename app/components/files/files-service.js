'use strict';

angular.module('honeydew')
    .factory('Files', function ($resource) {
        var res = $resource('/rest.php/files/:file', {file: '@file'
        }, {
            'commit': {method: 'PUT'}
        });

        res.encode = function ( file ) {
            if (typeof(file) === 'undefined') {
                file = $scope.filename;
            }
            // ngResource encodes the slashes to %2F. Apache needs
            // 'AllowEncodedSlashes' set to true, but we have no
            // permissions for that. Double encoding the url gets
            // past the Apache issue; Slim decodes one level, so
            // we just have to decode once in the Slim app.
            return encodeURIComponent(file);
        };

        return res;
    });
