/*
    author: Jamie Altizer
    version: 0.1.0
    license: MIT

    This module contains a directive that provides an object for each element
        tracked. The returned object holds properties that indicate status
        through a boolean value.

    Usage:
        var app = angular.module('SomeApp', ['ScrolledDirective']);
        app.controller('SomeController', function ($scope) {
                $scope.results = {};
            });

        <div ng-app="SomeApp" ng-controller="SomeController">
            <div scrolled="results"></div>
        </div>

    What is returned into $scope.results :
        {
            top: <bool>,
            bottom: <bool>,
            middleOfY: <bool>,
            left: <bool>,
            right: <bool>,
            middleOfX: <bool>
        }

*/
;(function () {
    'use strict';

    angular.module('ScrolledDirective', [])
        .directive('scrolled', function () {
            function isTop(obj) {
                return obj.scrollTop <= 0;
            }
            function isBottom(obj) {
                return obj.scrollTop >= (obj.scrollHeight - obj.offsetHeight);
            }
            function isLeft(obj) {
                return obj.scrollLeft <= 0;
            }
            function isRight(obj) {
                return obj.scrollLeft >= (obj.scrollWidth - obj.offsetWidth);
            }


            return {
                restrict: 'EA',
                link: function scrolledLinkMethod(scope, element, attrs) {
                    var domObj = element[0];
                    var supported = {
                        top: {
                            valid: function() {
                                return isTop(domObj);
                            }
                        },
                        bottom: {
                            valid: function() {
                                return isBottom(domObj);
                            }
                        },
                        middleOfY: {
                            valid: function() {
                                return !isTop(domObj) && !isBottom(domObj);
                            }
                        },
                        left: {
                            valid: function() {
                                return isLeft(domObj);
                            }
                        },
                        right: {
                            valid: function() {
                                return isRight(domObj);
                            }
                        },
                        middleOfX: {
                            valid: function() {
                                return !isLeft(domObj) && !isRight(domObj);
                            }
                        }
                    };

                    var setValues = function () {
                        for(var p in supported) {
                            scope[attrs.scrolled][p] = supported[p].valid();
                        }
                    };

                    //Initialize the values
                    setValues();

                    element.bind('scroll', function () {
                        scope.$apply(function () {
                            setValues();
                        });
                    });
                }
            };
        });
})();
