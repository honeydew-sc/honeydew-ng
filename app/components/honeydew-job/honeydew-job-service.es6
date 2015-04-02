angular.module('honeydew')
    .service('HoneydewJob', function ($resource, $location, Settings, localConfig, hostname, liveReport) {
        class HoneydewJob {
            constructor( properties ) {
                for (var prop in properties) {
                    this[prop] = properties[prop];
                }

                this.file = this.file || $location.path().substr(1);
                this.host = this.host || hostname.host;
                this.channel = this.channel || liveReport.switchChannel();
                this.server = this.server || HoneydewJob.browserToServer( this.browser );

                this.browser = this._decoratedBrowser();
                if ( ! this._isSaucelabs() ) {
                    this.local = HoneydewJob.wdServerAddress( this.server );
                }

                this.payload = new (HoneydewJob.backend())( this );
            }

            $execute() {
                return this.payload.$execute();
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
                if ( this._isSaucelabs() ) {
                    return '';
                }
                else {
                    if ( this.browser.match(/Local\s*$/) ){
                        return '';
                    }
                    else {
                        return 'Local';
                    }
                }
            }

            _serverPrefix() {
                var matches = this.server.match(/^(..): (.*)/);
                return matches ? matches[1] : '';
            }

            static wdServerAddress ( server ) {
                var storedAddr = Settings.get('wdAddress');
                if (server === 'Localhost' && storedAddr ) {
                    return storedAddr;
                }
                else {
                    return server.split(' ').pop();
                }
            }

            static browserToServer( browser ) {
                var prefix = browser.slice(0, 2);
                var server = Object.keys(localConfig).filter( it => {
                    return it.slice(-2).toLowerCase() === browser.slice(0,2).toLowerCase();
                })[0];

                if ( server ) {
                    return [ prefix, localConfig[server] ].join(' ');
                }
                else {
                    return 'Localhost';
                }
            }

            static backend() {
                return $resource('/rest.php/jobs', null, {
                    'execute': {
                        method: 'POST'
                    }
                });
            }
        }

        return HoneydewJob;
    });
