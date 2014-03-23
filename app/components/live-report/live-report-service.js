'use strict';

angular.module('honeydew')
    .config(function(PusherServiceProvider) {
        // as this is during the config phase, we can't use services
        // like $http :( I just don't want to commit the token to the
        // public repo.
        var getPusherToken = new XMLHttpRequest();
        getPusherToken.onload = function (res) {
            PusherServiceProvider.setToken(getPusherToken.response);
            PusherServiceProvider.setOptions({
                authEndpoint: '/rest.php/pusher/auth'
            });
        };
        getPusherToken.open("get", "/rest.php/pusher/token", true);
        getPusherToken.send();
    })

    .service('liveReport', function ($rootScope, Pusher, randomString) {
        var service =  {
            oldChannel: '',
            channel: '',
            pusherChannel: null,
            output: 'There\'s nothing to see here yet; try executing a feature! :)',
            placeHolder: true,
            registered: false,
            events: {
                evalRule: 'client-eval-rule',
                finish: 'client-finish'
            }
        };

        service.switchChannel = function (channel) {
            if (typeof(channel) === 'undefined') {
                var newChannel = 'private-' + randomString.string();
                return service.switchChannel(newChannel);
            }

            service.oldChannel = service.channel;
            service.channel =  channel;
            service.tail(service.channel);
            return service.channel;
        };

        service.pusherListener = function (item) {
            if (service.placeHolder) {
                service.output = item;
                service.placeHolder = false;
            }
            else {
                service.output += item;
            }
        };

        service.tail = function (channel) {
            // we don't want input from two channels at once
            if (service.oldChannel !== '') {
                try {
                    Pusher.unsubscribe(service.oldChannel);
                }
                catch (e) {
                    console.log('sorry, couldn\'t unsub: ', e);
                };
            }

            // need a placeholder while the job starts
            service.output = 'Loading...' + "\n";
            service.placeHolder = true;

            Pusher.subscribe(channel, 'rule',  service.pusherListener);
        };

        service.evalRule = function (rule) {
            if (typeof(Pusher.channel) !== 'undefined') {
                Pusher.channel.trigger(service.events.evalRule, rule.trim());
            }
        };

        return service;
    });
