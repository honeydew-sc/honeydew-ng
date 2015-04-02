function ManualAddressCtrl ( Settings, BackgroundStatus ) {
    this.status = 'loading';
    this.addressFromServer = '';

    var getAddressFromServer = () => {
        BackgroundStatus.get({status: 'webdriver'}).$promise.then( res => {
            this.status = res.webdriverStatus;
            this.addressFromServer = res.serverAddress;
            Settings.set('wdAddress', res.serverAddress);
        });
    };

    var updateServerStatus = address => {
        this.checking = true;
        BackgroundStatus.get({
            status: 'webdriver',
            local: address
        }).$promise.then( res => {
            this.status = res.webdriverStatus;
        }).finally( () => {
            this.checking = false;
        });
    };

    this.address = newAddress => {
        if ( angular.isDefined( newAddress ) ) {
            updateServerStatus( newAddress );
            Settings.set('wdAddress', newAddress);
            return newAddress;
        }
        else {
            var storedAddr = Settings.get('wdAddress');
            if ( storedAddr ) {
                return storedAddr;
            }
            else {
                return this.addressFromServer;
            }
        }
    };

    this.reset = () => {
        Settings.delete('wdAddress');
        updateServerStatus( getAddressFromServer() );
    };

    var storedAddr = Settings.get('wdAddress');
    if ( storedAddr ) {
        updateServerStatus( storedAddr );
    }
    else {
        getAddressFromServer();
    }
}

angular.module('honeydew').controller('ManualAddressCtrl', ManualAddressCtrl);
