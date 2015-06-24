class SetController {
    constructor ($stateParams, $q, SetReportService) {
        this.stateParams = $stateParams;

        this.setName = $stateParams.set;
    }
}

angular.module('honeydew')
    .controller('SetController', SetController );
