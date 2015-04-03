function backgroundStatusDirectiveController (Settings, BackgroundStatus, localConfig, manualAddress) {
    this.list = [];

    var queryOpts = () => {
        var storedAddr = Settings.get('wdAddress');
        return storedAddr
            ? { local: storedAddr }
            : false;
    };

    (function getSauceTunnelStatus(ctrl) {
        BackgroundStatus.get({ status: 'saucelabs'}, res => {
            ctrl.list.unshift(res);
        });
    })(this);

    BackgroundStatus.query(queryOpts(), res => {
        res.forEach( it => this.list.push(it) );

        // add any broken local servers to the list
        Object.keys(localConfig).forEach( server => {
            BackgroundStatus.get({
                status: 'webdriver',
                local: localConfig[server]
            }, res => {
                maybePush({
                    name: server,
                    status: res.webdriverStatus
                });
            });
        });
    });

    var maybePush = server => {
        if (!server.status) {
            this.list.push(server);
        }
    };

    this.popAddressModal = () => {
        manualAddress.popModal();
    };
}

angular.module('honeydew')
    .directive('backgroundStatus', function () {
        return {
            templateUrl: 'components/background-status/background-status.html',
            scope: {},
            restrict: 'E',
            controller: backgroundStatusDirectiveController,
            controllerAs: 'Status'
        };
    });
