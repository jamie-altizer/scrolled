;(function () {
    var app = angular.module('TestApp', ['ScrolledDirective']);

    app.controller('ScrolledController', function ($scope) {
        $scope.horizResults = {};
        $scope.vertResults = {};
        $scope.allResults = {};
    });
})();
