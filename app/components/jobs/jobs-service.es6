angular.module('honeydew')
    .service('Jobs', function ($resource, $location, $localStorage) {
        var backendJob = $resource('/rest.php/jobs', null, {
            'execute': {
                method: 'POST'
            }
        });

        class Job {
            constructor( properties ) {
                for (var prop in properties) {
                    this[prop] = properties[prop];
                }

                if ( ! this._isSaucelabs() ) {
                    this.local = this._wdServerAddress();
                }

                this.browser = this._decoratedBrowser();

                this.payload = new backendJob( this );
            }

            $execute() {
                this.payload.$execute();
            }

            _decoratedBrowser() {
                var b = [
                    this._serverPrefix(),
                    this.browser,
                    this._browserSuffix()
                ].join(' ');

                // Browser is passed as an array because the backend
                // knows how to handle more than once browser at once.
                return [ b.trim() ];
            }

            _isSaucelabs() {
                return this.server === 'Saucelabs';
            }

            _browserSuffix() {
                return this._isSaucelabs() ? '' : 'Local';
            }

            _serverPrefix() {
                var matches = this.server.match(/^(..): (.*)/);
                return matches ? matches[1] : '';
            }

            _wdServerAddress() {
                $localStorage.settings = $localStorage.settings || {};
                if ( this.server === 'Localhost' && 'wdAddress' in $localStorage.settings){
                    return $localStorage.settings.wdAddress;
                }
                else {
                    return this.server.split(' ').pop();
                }

                var matches = this.server.match(/^(..): (.*)/);
                return matches ? matches[2] : '';
            }
        }

        return Job;


    });
