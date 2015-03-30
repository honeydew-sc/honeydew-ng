function ManualAddressCtrl ( $sessionStorage, BackgroundStatus ) {
    this.status = 'loading';
    this.addressFromServer = '';

    var getAddressFromServer = () => {
        BackgroundStatus.get({status: 'webdriver'}).$promise.then( res => {
            this.status = res.webdriverStatus;
            this.addressFromServer = $sessionStorage.settings.wdAddress = res.serverAddress;
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

    // handle the new user case
    $sessionStorage.settings = $sessionStorage.settings || {};
    if ( $sessionStorage.settings.hasOwnProperty('wdAddress') ) {
        updateServerStatus( $sessionStorage.settings.wdAddress );
    }
    else {
        getAddressFromServer();
    }

    this.address = newAddress => {
        if ( angular.isDefined( newAddress ) ) {
            updateServerStatus( newAddress );
            return ( $sessionStorage.settings.wdAddress = newAddress );
        }
        else if ( angular.isDefined( $sessionStorage.settings.wdAddress ) ) {
            return $sessionStorage.settings.wdAddress;
        }
        else {
            return this.addressFromServer;
        }
    };

    this.reset = () => {
        delete $sessionStorage.settings.wdAddress;
        updateServerStatus( getAddressFromServer() );
    };
}

angular.module('honeydew').controller('ManualAddressCtrl', ManualAddressCtrl);
