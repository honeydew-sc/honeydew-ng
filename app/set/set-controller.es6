class SetController {
    constructor ($stateParams, $q, SetReportService, History) {
        this.stateParams = $stateParams;

        this.setName = $stateParams.set;
        History.addCurrentLocation();
    }
}

angular.module('honeydew')
    .controller('SetController', SetController );
