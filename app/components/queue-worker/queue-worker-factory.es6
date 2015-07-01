function QueueWorker($resource) {
    return $resource(
        '/rest.php/jobs/worker', { work: true }, {
            spawn: { method: 'POST' }
        });
    }

angular.module('honeydew')
    .factory('QueueWorker', QueueWorker);
