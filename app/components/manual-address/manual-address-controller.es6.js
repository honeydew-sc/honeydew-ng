'use strict';

function ManualAddressCtrl ( $localStorage, BackgroundStatus ) {
    this.status = 'loading';

    var getAddressFromServer = () => {
        BackgroundStatus.get({status: 'webdriver'}).$promise
            .then( res => {
                this.status = res.webdriverStatus;
                this.address = res.serverAddress;
                console.log(this.status);
            })
            .catch( res => { console.log(res); } );
    };

    if ( 'wdAddress' in $localStorage.settings ) {
        this.address = $localStorage.settings.wdAddress;
        BackgroundStatus.get({
            status: 'webdriver',
            local: this.address
        }).$promise
            .then( res => {
                this.status = res.webdriverStatus;
            });
    }
    else {
        getAddressFromServer();
    }

}

angular.module('honeydew').controller('ManualAddressCtrl', ManualAddressCtrl);
