class StatusController {
    constructor ( $anchorScroll, $location, $stateParams, EnvStatus, Environment ) {
        this.Environment = Environment;
        this.apps = this.chooseAppsFromParams( $stateParams );

        this.appChoices = ["SC", "DROZ", "HCA", "DS", "DoD"];
    }

    chooseAppsFromParams ( params ) {
        let allApps = Object.keys(this.Environment.apps);
        if ( params.hasOwnProperty('app') && params.app !== null ) {
            let appParam = params.app.replace(/DoD/, 'Army,TMA');
            let chosenApps = appParam.toLowerCase().split(',');

            return allApps.filter( app => chosenApps.includes( app.toLowerCase() ) );
        }
        else {
            return allApps;
        }
    }
}

if (![].includes) {
    Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
        var O = Object(this);
        var len = parseInt(O.length) || 0;
        if (len === 0) {
            return false;
        }
        var n = parseInt(arguments[1]) || 0;
        var k;
        if (n >= 0) {
            k = n;
        } else {
            k = len + n;
            if (k < 0) {k = 0;}
        }
        var currentElement;
        while (k < len) {
            currentElement = O[k];
            if (searchElement === currentElement ||
                (searchElement !== searchElement && currentElement !== currentElement)) {
                return true;
            }
            k++;
        }
        return false;
    };
}

angular.module('honeydew')
    .controller('StatusController', StatusController);
