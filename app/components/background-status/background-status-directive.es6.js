function backgroundStatusDirectiveController ($localStorage, BackgroundStatus, localConfig, manualAddressService) {
    this.list = [];

    var queryOpts = () => {
        $localStorage.settings = $localStorage.settings || { };

        if ( 'wdAddress' in $localStorage.settings ) {
            return { local: $localStorage.settings.wdAddress };
        }
        else {
            return null;
        };
    };

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
        manualAddressService.popModal();
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
