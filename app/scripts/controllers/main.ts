/// <reference path="../app.ts" />

'use strict';

module testAngularTsApp {
    export interface IMainScope extends ng.IScope {
        awesomeThings:any[];
    }

    export class MainCtrl {

        constructor(private $scope:IMainScope) {
            $scope.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];
        }
    }
}

angular.module('testAngularTsApp')
    .controller('MainCtrl', testAngularTsApp.MainCtrl);
