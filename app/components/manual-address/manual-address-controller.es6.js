'use strict';

function ManualAddressCtrl ( $localStorage, BackgroundStatus ) {
    this.status = 'loading';

    var getAddressFromServer = () => {
        BackgroundStatus.get({status: 'webdriver'}).$promise.then( res => {
            this.status = res.webdriverStatus;
            $localStorage.settings.wdAddress = res.serverAddress;
        });
    };

    var updateServerStatus = () => {
        BackgroundStatus.get({
            status: 'webdriver',
            local: $localStorage.settings.wdAddress
        }).$promise.then( res => {
            this.status = res.webdriverStatus;
        });
    };

    // handle the new user case
    $localStorage.settings = $localStorage.settings || {};
    if ( $localStorage.settings.hasOwnProperty('wdAddress') ) {
        updateServerStatus();
    }
    else {
        getAddressFromServer();
    }

    this.address = newAddress => {
        if ( angular.isDefined(newAddress) ) {
            return ( $localStorage.settings.wdAddress = newAddress );
        }
        else {
            return $localStorage.settings.wdAddress;
        }
    };

}

angular.module('honeydew').controller('ManualAddressCtrl', ManualAddressCtrl);
