function SetReportFactory ($resource) {
    let ret = $resource('/rest.php/report/set/:name', {
        name: '@name'
    }),
        hostnames = $resource('/rest.php/report/set/:name/host', {});

    ret.getHostnames = ({ name }) => {
        return hostnames.get({ name });;
    };

    return ret;
}

angular.module('honeydew')
    .factory('SetReport', SetReportFactory);
