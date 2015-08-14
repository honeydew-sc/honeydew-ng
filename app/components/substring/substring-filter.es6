// courtesy of https://gist.github.com/mugifly/4942965
angular.module('honeydew')
    .filter('substring', function() {
        return function(str, start, end) {
            return str.substring(start, end);
        };
    });
