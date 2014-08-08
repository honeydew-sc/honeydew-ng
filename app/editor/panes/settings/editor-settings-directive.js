'use strict';

angular.module('honeydew')
    .directive('editorSettings', function ($localStorage) {
        return {
            templateUrl: 'editor/panes/settings/editor-settings.html',
            scope: {
                options: '='
            },
            replace: true,
            restrict: 'E',
            controller: function ($scope) {
                $scope.$storage = $localStorage.$default({
                    settings: {
                        font: 'Default',
                        theme: 'xq-light',
                        collapse: {
                            tree: 'false',
                            execute: 'false'
                        }
                    }
                });

                $scope.settingsOptions = {
                    fonts: [
                        'Default',
                        'Carl'
                    ],

                    themes: [
                        '3024-day',
                        '3024-night',
                        'ambiance',
                        'base16-dark',
                        'base16-light',
                        'blackboard',
                        'cobalt',
                        'default',
                        'eclipse',
                        'elegant',
                        'erlang-dark',
                        'lesser-dark',
                        'mbo',
                        'mdn-like',
                        'midnight',
                        'monokai',
                        'neat',
                        'night',
                        'paraiso-dark',
                        'paraiso-light',
                        'rubyblue',
                        'solarized',
                        'the-matrix',
                        'tomorrow-night-eighties',
                        'twilight',
                        'vibrant-ink',
                        'xq-dark',
                        'xq-light'
                    ]
                };
            }
        };
    });
