'use strict';

angular.module('honeydew')
    .service('panes', [ function () {
        return {
            panes: [
                {
                    name: 'report',
                    classes: 'col-md-6',
                    src: '/reports.php?new=true',
                    icon: 'fa-list-alt',
                    tooltip: 'Live Report'
                },
                {
                    name: 'help',
                    classes: 'col-md-6',
                    src: '/rules.html',
                    icon: 'fa-question-circle',
                    tooltip: 'Help'
                }
            ],

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
