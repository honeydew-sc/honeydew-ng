'use strict';

angular.module('honeydew')
    .service('panes', [ function () {
        return {
            panes: [{
                    name: 'report',
                    classes: 'col-md-6',
                    src: '/features.php',
                    icon: 'fa-list-alt'
                }],

            activePane: "",

            openPane:  function (pane) {
                this.activePane = pane;
            },

            closePane:  function () {
                this.activePane = "";
            },

            togglePane:  function (pane) {
                if (this.activePane === pane) {
                    this.closePane();
                }
                else {
                    this.openPane(pane);
                }
            }
        };
    }]);
