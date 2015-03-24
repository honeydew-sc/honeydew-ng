'use strict';

angular.module('sc.constants', [])
    .constant('preambleOptions', {
        'Existing Bug': 'Existing Bug: (.*)',
        'Set': 'Set: (.*)',
        'Proxy': 'Proxy',
        'Email': 'Email: (.*)',
        'Subtitles': 'Subtitles: (.*)',
        'Keep Open': 'Keep Open',
        'JIRA': 'JIRA: (.*)',
        'Scenario': 'Scenario: (.*)',
        'Agent': 'Agent: (.*)',
        'User': 'User: (.*)'
    });
