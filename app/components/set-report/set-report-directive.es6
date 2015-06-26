class SetReportController {
    constructor ($scope, $q, SetReportService, hostname) {
        this.$q = $q;
        this.SetReport = SetReportService;
        this.hostname = hostname;
        this.$scope = $scope;

        this.hideExtraSetRuns();
        this.getSetHistoryData();
        this.refreshDataOnHostnameChange();

        this.wrongHostMessage = 'This page filters by the hostname above! Please choose the appropriate hostname if you\'re expecting results and not seeing any :)';
    }

    getSetHistoryData () {
        let { set, SetReport, hostname } = this;
        this.$scope.$emit('progress:loading');

        return this.$q.all( [
            SetReport.getSetFeatures( set ),
            SetReport.getSetHistory( set, hostname.host )
        ] )
            .then( SetReport.reorganizeReportData )
            .then( ({ setData, reportData }) => {
                this.hideExtraSetRuns();
                this.$scope.$emit('progress:done');

                this.setData = setData;
                this.reportData = reportData;
            })
            .catch( res => {
                console.log(res);
                this.$scope.$emit('progress:done');
            });
    }

    refreshDataOnHostnameChange () {
        this.$scope.$on('hostname:changed', ( ) => {
            this.getSetHistoryData();
        });
    }

    isSetRunOld( startDate ) {
        let oneWeekAgo = 1000 * 60 * 60 * 24 * 7,
            now = new Date();

        return now - startDate > oneWeekAgo;
    }

    hideExtraSetRuns () {
        this.setRunDisplayCount = 5;
        this.displayToggleText = "more";
    }

    toggleAllSetRunDisplay () {
        if ( this.setRunDisplayCount === 100 ) {
            this.hideExtraSetRuns();
        }
        else {
            this.displayToggleText = "less";
            this.setRunDisplayCount = 100;
        }
    }
}

angular.module('honeydew')
    .directive('setReport', function () {
        return {
            templateUrl: 'components/set-report/set-report.html',
            replace: true,
            restrict: 'E',
            scope: {
                set: '@'
            },
            bindToController: true,
            controller: SetReportController,
            controllerAs: 'SetReport'
        };
    });
