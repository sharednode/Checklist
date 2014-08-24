/**
 * NOTE: the ng-app attribute should not be on the index.html when using ng.bootstrap
 */
define(['require', 'angular', 'app', 'routes', 'jQuery'], function (require, angular) {
    'use strict';

    require(['domReady!'], function (document) {
        angular.bootstrap(document, ['app']);
    });
});
