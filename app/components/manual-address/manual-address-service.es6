angular.module('honeydew')
    .service('manualAddress', function ($modal) {
        var service = {
            popModal() {
                var modal = $modal.open({
                    templateUrl: 'components/manual-address/manual-address.html'
                });

                return modal.result;
            }
        };

        return service;
    });
