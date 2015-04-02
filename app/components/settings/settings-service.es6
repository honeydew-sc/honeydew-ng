class Settings {
    constructor ( $localStorage ) {
        if ( !( 'settings' in $localStorage ) ) {
            $localStorage.settings = {};
        }

        this.local = $localStorage;
    }

    get ( key ) {
        if (key in this.local.settings) {
            return this.local.settings[key];
        }
        else {
            return false;
        }
    }

    set ( key, value ) {
        this.local.settings[key] = value;
    }

    delete ( key ) {
        delete this.local.settings[key];
    }

    reset () {
        this.local.settings = {};
    }
}

angular.module('sc.settings', [ 'ngStorage' ]).service('Settings', Settings);
