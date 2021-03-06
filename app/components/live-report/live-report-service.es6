angular.module('honeydew')
    .service('liveReport', function ($rootScope, Pusher, randomString, $timeout, alerts, cmReportMode) {
        var timeout;
        var service =  {
            oldChannel: null,
            channel: null,
            pusherChannel: null,
            output: ['There\'s nothing to see here yet; try executing a feature! :)'],
            current: '',
            placeHolder: true,
            registered: false,
            events: {
                evalRule: 'client-eval-rule',
                finish: 'client-finish'
            },
            autoVacateDelay: 3 * 60 * 1000,
            breakpoint: {
                rule: 'When I set a breakpoint',
                alert: {
                    type: 'info',
                    msg: 'Your test has reached a breakpoint :D Use "Alt+Enter" to send new rules to the browser, and "Alt+Esc" to resume the test. You can also try out bare CSS selectors to highlight them!'
                }
            }
        };

        service.switchChannel = function (channel) {
            if (typeof(channel) === 'undefined') {
                var newChannel = 'private-' + randomString.string();
                return service.switchChannel(newChannel);
            }
            else {
                service.close();
                service.oldChannel = service.channel;
                service.channel = channel;
                service.tail(service.channel);
                return service.channel;
            }
        };

        service.pusherListener = function (item) {
            if (service.placeHolder) {
                // Need to wipe the output if we're displaying a place
                // holder.
                service.output = [];
                service.current = '';
                service.placeHolder = false;
            }

            if (/^####/.test( item )) {
                service.current += item;
            }
            else {
                service.current = '';
                service.output.push(cmReportMode.highlight(item));
                emitEndOfReport( item );
            }
        };

        function emitEndOfReport( item ) {
            if ( /End Date: /.test( item ) ) {
                $rootScope.$broadcast( 'report:ended' );
            }
        }

        service.tail = function (channel) {
            // we don't want input from two channels at once
            if (service.oldChannel) {
                Pusher.unsubscribe(service.oldChannel);
            }

            // need a placeholder while the job starts
            service.output = [];
            service.current = '#### Loading...';
            service.placeHolder = true;

            // we don't have a slick way of knowing when to close the
            // connection; for now they're on an idle auto-close timer
            Pusher.subscribe(channel, 'rule',  service.pusherListener).then(function (channel) {
                service.pusherChannel = channel;
                timeout = $timeout( service.close, service.autoVacateDelay);
            });
        };

        service.evalRule = function (rule) {
            if (typeof(service.pusherChannel) !== 'undefined') {
                $timeout.cancel(timeout);
                timeout = $timeout( service.close, service.autoVacateDelay);

                service.pusherChannel.trigger(service.events.evalRule, rule.trim());
            }
        };

        service.close = function () {
            if (service.pusherChannel) {
                service.pusherChannel.trigger(service.events.finish, service.events.finish);
            }

            if (timeout) {
                $timeout.cancel(timeout);
            }
        };

        return service;
    });
