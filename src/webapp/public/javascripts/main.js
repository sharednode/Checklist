require.config({
    /*.js by default*/
    paths: {
        'jQuery':  '../vendor/jquery/dist/jquery.min',
        'angular': '../vendor/angular/angular.min',
        'angular-route': '../vendor/angular-route/angular-route.min',
        'twitter': '../vendor/bootstrap/dist/js/bootstrap.min',
        'domReady': '../vendor/requirejs-domready/domReady',
        'moment': '../vendor/momentjs/min/moment.min',
        'toastr': '../vendor/toastr/toastr.min'
    },
    shim: {
        'jQuery': {
            exports: '$'
        },
        'twitter': {
            deps: ['jQuery']
        },
        'angular': {
            exports: 'angular'
        },
        'angular-route': {
            deps: ['angular']
        }
    },
    deps: ['./bootstrap']
});
