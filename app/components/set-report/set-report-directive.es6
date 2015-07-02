class SetReportController {
    constructor ($scope, $q, SetReportService, Environment, hostname) {
        this.$q = $q;
        this.SetReportService = SetReportService;
        this.Environment = Environment;
        this.hostname = hostname;
        this.$scope = $scope;

        this.hideExtraSetRuns();
        this.getSetHistoryData();
        this.refreshDataOnHostnameChange();

        this.wrongHostMessage = 'This page filters by the hostname above! Please choose the appropriate hostname if you\'re expecting results and not seeing any :)';
    }

    getSetHistoryData () {
        let { set, SetReportService, hostname } = this;
        this.$scope.$emit('progress:loading');

        let p1 = SetReportService.getSetFeatures( set ),
            p2 = SetReportService.getSetHistory( set, hostname.host );

        p1.then( res => { this.$scope.$emit( 'progress:increment' ); } );
        p2.then( res => { this.$scope.$emit( 'progress:increment' ); } );

        return this.$q.all( [ p1, p2 ] )
            .then( SetReportService.reorganizeReportData )
            .then( ({ setData, reportData }) => {
                this.hideExtraSetRuns();
                this.$scope.$emit( 'progress:value', { value: 100 } );

                this.setData = setData;
                this.reportData = reportData;
            })
            .catch( res => {
                this.$scope.$emit('progress:done');
            });
    }

    highlightHostnames() {
        let { set, SetReportService, hostname, Environment } = this;

        return SetReportService.getSetHostnames( set )
            .then( ({ hostnames }) => {
                let appEnvPairs = hostnames
                        .map( ({ host })  => host )
                        .map( host => Environment.lookup( host ) )
                        .filter( pair => pair );

                hostname.highlightEnvs( appEnvPairs );

                return appEnvPairs;
            });
    }

    refreshDataOnHostnameChange () {
        this.$scope.$on('hostname:changed', ( ) => {
            this.getSetHistoryData();
        });
    }

    isSetRunOld ( startDate ) {
        // we're assuming startDate is a Date() because we're LAZY
        let oneWeekAgo = 1000 * 60 * 60 * 24 * 7,
            now = new Date();

        return now - startDate > oneWeekAgo;
    }

    rerunFailures ( setData ) {
        let missing = this.SetReportService.missingOrFailed(
            setData.setRunId,
            this.reportData
        );

        // We need the set name on the setData so we can name the
        // channel after it.
        return this.SetReportService.rerun( missing, setData, this.set );
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
