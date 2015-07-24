class IpCheckerController {
    constructor ( Settings, BackgroundStatus ) {
        this.Settings = Settings;
        this.BackgroundStatus = BackgroundStatus;

        this.status = 'loading';
        this._initAddress();
    }

    address ( newAddress ) {
        if ( angular.isDefined( newAddress ) ) {
            return this._setAddress( newAddress );
        }
        else {
            return this._getAddress();
        }
    }

    reset() {
        this.Settings.delete('wdAddress');
        this._updateServerStatus( this._getAddressFromServer() );
    }

    _initAddress () {
        var storedAddr = this.Settings.get('wdAddress');
        if ( storedAddr ) {
            this._updateServerStatus( storedAddr );
        }
        else {
            this._getAddressFromServer();
        }
    }

    _getAddress () {
        var storedAddr = this.Settings.get('wdAddress');
        if ( storedAddr ) {
            return storedAddr;
        }
        else {
            return this.addressFromServer;
        }
    }

    _setAddress ( newAddress ) {
        this._updateServerStatus( newAddress );
        this.Settings.set('wdAddress', newAddress);
    }

    _getAddressFromServer () {
        this.BackgroundStatus.get({status: 'webdriver'}).$promise.then( res => {
            this.status = res.webdriverStatus;
            this.addressFromServer = res.serverAddress;
            this.Settings.set('wdAddress', res.serverAddress);
        });
    }

    _updateServerStatus ( address ) {
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
