function SetReportFactory ($resource) {
    return $resource('/rest.php/report/set/:name', {
        name: '@name'
    });
}

angular.module('honeydew')
    .factory('SetReport', SetReportFactory);
