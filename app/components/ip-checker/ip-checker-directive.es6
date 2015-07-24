class IpCheckerController {
    constructor ( Settings, BackgroundStatus ) {
        this.Settings = Settings;
        this.BackgroundStatus = BackgroundStatus;

        this.status = 'loading';
        this.initAddress();
    }

    initAddress () {
        var storedAddr = this.Settings.get('wdAddress');
        if ( storedAddr ) {
            this.updateServerStatus( storedAddr );
        }
        else {
            this.getAddressFromServer();
        }
    }

    getAddressFromServer () {
        this.BackgroundStatus.get({status: 'webdriver'}).$promise.then( res => {
            this.status = res.webdriverStatus;
            this.addressFromServer = res.serverAddress;
            this.Settings.set('wdAddress', res.serverAddress);
        });
    }

    updateServerStatus ( address ) {
        this.checking = true;
        this.BackgroundStatus.get({
            status: 'webdriver',
            local: address
        }).$promise.then( res => {
            this.status = res.webdriverStatus;
        }).finally( () => {
            this.checking = false;
        });
    }

    get address () {
        var storedAddr = this.Settings.get('wdAddress');
        if ( storedAddr ) {
            return storedAddr;
        }
        else {
            return this.addressFromServer;
        }
    }

    set address ( newAddress ) {
        console.log('hi');
        this.updateServerStatus( newAddress );
        this.Settings.set('wdAddress', newAddress);
        return newAddress;
    }

    reset() {
        this.Settings.delete('wdAddress');
        this.updateServerStatus( this.getAddressFromServer() );
    }
};

angular.module('honeydew')
    .directive('ipChecker', function () {
        return {
            templateUrl: 'components/ip-checker/ip-checker.html',
            replace: true,
            restrict: 'E',
            scope: {
                status: '@'
            },
            bindToController: true,
            controller: IpCheckerController,
            controllerAs: 'IpChecker'
        };
    });
