class SiteNav {
    constructor () {
        this.links = [{
            url: '/dashboard/index.html',
            title: 'Dashboard',
            image: 'landing/honeydew-dashboard-sm.png'
        }, {
            url: '/#/monitor',
            title: 'Monitor',
            image: 'landing/honeydew-monitor-sm.png'
        }, {
            url: '/#/status',
            title: 'EnvStatus',
            image: 'landing/honeydew-status-sm.png'
        }, {
            url: 'docs',
            title: 'Docs',
            image: 'landing/honeydew-docs-sm.png'
        }, {
            url: 'http://qa-166.terminus1.openstack.internal:9191/overview',
            title: 'Queues',
            image: 'landing/honeydew-queue-sm.png'
        }, {
            url: '/old.php',
            title: 'Olddew',
            image: 'landing/honeydew-old-sm.png'
        }, {
            url: '/kabocha/dashboard.html',
            title: 'Kabocha',
            image: 'landing/kabocha-dashboard-sm.png'
        }, {
            url: '/kabocha/ratm.html#/assessments',
            title: 'RATM',
            image: 'landing/kabocha-rat-sm.png'
        }];
    }
}

angular.module('honeydew').service('SiteNav', SiteNav );
