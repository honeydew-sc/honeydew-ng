'use strict';

angular.module('honeydew')
    .service('liveReport', function ($rootScope) {
        var service =  {
            oldChannel: '',
            channel: '',
            output: 'There\'s nothing to see here yet; try executing a feature! :)',
            placeHolder: true,
            registered: false
        };

        service.switchChannel = function (channel) {
            service.channel = channel;
            console.log('broadcasting');
            $rootScope.$broadcast('pusher:channel', channel);
        };

        return service;
    });
