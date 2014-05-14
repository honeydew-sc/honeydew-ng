'use strict';

angular.module('honeydew')
    .service('availableBrowsers', function () {
        var localBrowsers = [
            'IE Local',
            'Chrome Local',
            'FF Local',
            'Batch: All Local',
            'Batch: All Local, Serial'
        ];
        var local = addMetaInformation(localBrowsers, 'Current Local');

        var gpBrowsers = [
            'GP IE 10 Local',
            'GP Chrome Local',
            'GP FF Local',
            'Batch: All GP',
            'Batch: All GP, Serial'
        ];
        var gpAddress = "10.10.0.83";
        var grandPoobah = addMetaInformation(gpBrowsers, 'GP: ' + gpAddress, {local: gpAddress});

        var sauceBrowsers = [
            'Windows 7 - Chrome',
            'Windows 7 - FF',
            'Windows 8.1 - IE 11',
            'Windows 8 - IE 10',
            'Windows 7 - IE 9'
        ];
        var sauce = addMetaInformation(sauceBrowsers, 'SauceLabs OnDemand', {sauce: 'on'});

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
                    // but they shouldn't include themselves
                    browserMeta.browser = localBrowsers.filter(function (label) {
                        return label.indexOf('Batch') === -1;
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

        var mobile = [
            {
                browser: ['iPhone Simulator Local'],
                label: 'iPhone Simulator Local',
                group: 'Mobile'
            },
            {
                browser: ['iPhone Simulator Sauce'],
                label: 'iPhone Simulator Sauce',
                group: 'Mobile',
                sauce: 'on'
            }
        ];

        this.all = local.concat(grandPoobah).concat(sauce).concat(mobile);
        this.set = grandPoobah.concat(sauce);
    });
