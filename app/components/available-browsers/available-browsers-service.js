'use strict';

angular.module('honeydew')
    .service('availableBrowsers', function (localConfig) {
        var self = this;
        self.set = [];
        // in the backend, we look specifically for 'local' to be in
        // the browser name to determine whether to send it to
        // saucelabs or not.
        var localBrowsers = [
            'IE Local',
            'Chrome Local',
            'FF Local',
            'Batch: All Local',
            'Batch: All Local, Serial',
            'Local Mobile Emulator'
        ];
        var local = addMetaInformation(localBrowsers, 'Current Local');

        // add the browsers from the local configuration
        Object.keys(localConfig).forEach(function (key) {
            var ip = localConfig[key];
            var prefix = key.split('_').pop().toUpperCase();

            var browsers = [
                prefix + ' IE 10 Local',
                prefix + ' Chrome Local',
                prefix + ' FF Local',
                'Batch: All ' + prefix ,
                'Batch: All ' + prefix + ', Serial'
            ];

            var decoratedBrowsers = addMetaInformation(browsers, prefix + ': ' + ip, {local: ip});
            self.set = self.set.concat(decoratedBrowsers);
        });

        var sauceBrowsers = [
            'Windows 7 - Chrome',
            'Windows 7 - FF',
            'Windows 8.1 - IE 11',
            'Windows 8 - IE 10',
            'Windows 7 - IE 9',
            'Sauce Mobile Emulator'
        ];
        var sauce = addMetaInformation(sauceBrowsers, 'SauceLabs OnDemand', {sauce: 'on'});

        self.set = self.set.concat(sauce);
        self.all = local.concat(self.set);

        function addMetaInformation( browsers, group, extra ) {
            // takes an array of browser names and returns an array of
            // browser objects with labels, appropriate groups, and
            // any extra necessary properties
            return browsers.map(function (label) {
                var browserMeta = {
                    browser: [label],
                    label: label,
                    group: group
                };

                // batch browsers need to have an array
                if (label.indexOf('Batch') === 0) {
                    // but they shouldn't include themselves, or mobile
                    browserMeta.browser = localBrowsers.filter(function (label) {
                        return label.indexOf('Batch') === -1 && label.indexOf('Mobile') === -1;
                    });
                }

                if (label.indexOf('Serial') !== -1) {
                    browserMeta.serial = true;
                }

                for (var key in extra) {
                    if (extra.hasOwnProperty(key)) {
                        browserMeta[key] = extra[key];
                    }
                }

                return browserMeta;
            });
        }
    });
