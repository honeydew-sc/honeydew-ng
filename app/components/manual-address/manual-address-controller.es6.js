function ManualAddressCtrl ( $localStorage, BackgroundStatus ) {
    this.status = 'loading';
    this.addressFromServer = '';

    var getAddressFromServer = () => {
        BackgroundStatus.get({status: 'webdriver'}).$promise.then( res => {
            this.status = res.webdriverStatus;
            this.addressFromServer = $localStorage.settings.wdAddress = res.serverAddress;
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
    $localStorage.settings = $localStorage.settings || {};
    if ( $localStorage.settings.hasOwnProperty('wdAddress') ) {
        updateServerStatus( $localStorage.settings.wdAddress );
    }
    else {
        getAddressFromServer();
    }

    this.address = newAddress => {
        if ( angular.isDefined( newAddress ) ) {
            updateServerStatus( newAddress );
            return ( $localStorage.settings.wdAddress = newAddress );
        }
        else if ( angular.isDefined( $localStorage.settings.wdAddress ) ) {
            return $localStorage.settings.wdAddress;
        }
        else {
            return this.addressFromServer;
        }
    };

    this.reset = () => {
        delete $localStorage.settings.wdAddress;
        updateServerStatus( getAddressFromServer() );
    };
}

angular.module('honeydew').controller('ManualAddressCtrl', ManualAddressCtrl);
