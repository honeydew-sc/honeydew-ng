angular.module('honeydew')
    .service('Jobs', function ($resource, $location) {
        var backendJob = $resource('/rest.php/jobs', null, {
            'execute': {
                method: 'POST'
            }
        });

        var browserPrefix = server => {
            // The local servers are a two letter abbrevation, a
            // colon, and then the IP of the local server. Running
            // jobs locally is just 'Localhost' and running on
            // Saucelabs is Saucelabs. We want to prefix the
            // abbreviation of the server to the browser so the user
            // can see it in reports.
            var matches = server.match(/^(..): /);
            if ( matches ) {
                return matches[1] + ' ';
            }
            else {
                return '';
            }
        };

        var browserSuffix = server => {
            if (! isSaucelabs(server) ) {
                return ' Local';
            }
            else {
                return '';
            }
        };

        var isSaucelabs = server => server === 'Saucelabs';

        class Job {
            constructor( properties ) {
                for (var prop in properties) {
                    this[prop] = properties[prop];
                }

                // Browser is passed as an array because the backend
                // knows how to handle more than once browser at once.
                this.browser = [
                    browserPrefix(this.server)
                        + this.browser
                        + browserSuffix(this.server)
                ];

                this.payload = new backendJob( this );
            }

            $execute () {
                this.payload.$execute();
            }
        }

        return Job;


    });
