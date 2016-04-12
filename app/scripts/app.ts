/// <reference path="../../typings/angularjs/angular.d.ts" />

"use strict";

angular.module("starterApp", ["ngMaterial", "users"])
    .config(($mdThemingProvider: angular.material.IThemingProvider, $mdIconProvider: angular.material.IIconProvider) => {

        $mdIconProvider
            .defaultIconSet("./images/avatars.svg", 128)
            .icon("menu", "./images/menu.svg", 24)
            .icon("share", "./images/share.svg", 24)
            .icon("google_plus", "./images/google_plus.svg", 512)
            .icon("hangouts", "./images/hangouts.svg", 512)
            .icon("twitter", "./images/twitter.svg", 512)
            .icon("phone", "./images/phone.svg", 512);

        $mdThemingProvider.theme("default")
            .primaryPalette("brown")
            .accentPalette("red");

    });
