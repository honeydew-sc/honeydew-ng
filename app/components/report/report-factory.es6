angular.module('honeydew')
    .factory('Report', $resource => {
        return $resource('/rest.php/report/:report', { report: '@report' } );
    });
