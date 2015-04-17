'use strict';

angular.module('honeydew')
    .service('availableBrowsers', function (localConfig, $location) {
        var service = this;
        // in the backend, we look specifically for 'local' to be in
        // the browser name to determine whether to send it to
        // saucelabs or not.
        service.getBrowsers = () => {
            let localBrowsers = [
                'Chrome',
                'Firefox',
                'Android Mobile',
                'iOS Mobile',
                'IE 8',
                'IE 9',
                'IE 10',
                'IE 11',
            ];

            return localBrowsers;
        };


        service.getServers = () => {
            var url = $location.path();

            var localServers = [];
            for (let name in localConfig) {
                var ip = localConfig[name];
                var prefix = name.split('_').pop().toUpperCase();
                localServers.push(prefix + ': ' + ip);
            }
            service.servers = [ "Localhost" ].concat(localServers).concat(["Saucelabs"]);

            // We don't want to set up monitors to run against
            // Localhost, as we have no idea what that means in the
            // middle of the night.
            if (url.match(/^#\/monitor/)) {
                service.servers.shift();
            }
            return service.servers;
        };

        return service;
    });
