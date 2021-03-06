var EditorSettingsCtrl = function ($scope, $localStorage) {
    this.$storage = $localStorage.$default({
        settings: {
            font: 'Default',
            theme: 'xq-light',
            collapse: {
                tree: 'false',
                execute: 'false'
            },
            navClass: ''
        }
    });

    this.options = {
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
            'neo',
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

    this.redrawPage = () => {
        $scope.$emit('codemirror:redraw');
    };
};

angular.module('honeydew')
    .directive('editorSettings', function () {
        return {
            templateUrl: 'editor/panes/settings/editor-settings.html',
            replace: true,
            restrict: 'E',
            controller: 'EditorSettingsCtrl',
            controllerAs: 'Settings'
        };
    })
    .controller('EditorSettingsCtrl', EditorSettingsCtrl);
