angular.module('honeydew')
    .factory('SetReport', function ($resource, alerts, $location, filetree) {
        var res = $resource('/rest.php/report/set/:name', {
            name: '@name'
        });

        return res;
    });
