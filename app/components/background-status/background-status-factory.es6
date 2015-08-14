angular.module('honeydew')
    .factory('BackgroundStatus', $resource => {
        return $resource('/rest.php/status/:status', {
            status: '@status'
        });
    });
