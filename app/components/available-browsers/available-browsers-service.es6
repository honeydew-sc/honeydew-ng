angular.module('honeydew')
    .service('availableBrowsers', function (localConfig, $location) {
        this.getBrowsers = () => {
            let localBrowsers = [
                'Chrome',
                'Firefox',
                'Firefox No JS',
                'iOS Mobile Safari',
                'Safari',
                'IE 8',
                'IE 9',
                'IE 10',
                'IE 11',
            ];

            return localBrowsers;
        };

        this.getServers = () => {
            var url = $location.path();

            var localServers = [];
            for (let name in localConfig) {
                var ip = localConfig[name];
                var prefix = name.split('_').pop().toUpperCase();
                localServers.push(prefix + ': ' + ip);
            }
            this.servers = [ "Localhost" ].concat(localServers).concat(["Saucelabs"]);

            // We don't want to set up monitors to run against
            // Localhost, as we have no idea what that means in the
            // middle of the night.
            if (url.match(/^\/monitor/)) {
                return this.servers.filter( (server) => server !== 'Localhost' );
            }
            else {
                return this.servers;
            }
        };

        this.getMobileServers = () => {
            return this.getServers().filter((server) => /Localhost|52:/.test(server));
        };

        return this;
    });
