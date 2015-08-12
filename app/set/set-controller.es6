class SetController {
    constructor ($stateParams, $q, SetReportService) {
        this.stateParams = $stateParams;

        this.setName = $stateParams.set;
        this.run = $stateParams.run || '';
    }
}

angular.module('honeydew')
    .controller('SetController', SetController );
