/// <reference path="../app.ts" />
"use strict";

module users {
    export interface IUserScope extends ng.IScope {
        users: any;
    }

    export class UserController {

        private users = [];
        private selected: any = null;
        private toggleList: any;

        constructor(private $scope: IUserScope, private userService: any, private $mdSidenav: angular.material.ISidenavService,
                    private $mdBottomSheet: angular.material.IBottomSheetService, private $log: angular.ILogService,
                    private $q: angular.IQService) {

            let self: UserController = this;

            self.selected = null;
            self.users = [];
            self.selectUser = this.selectUser;
            self.toggleList = this.toggleUsersList;
            self.makeContact = this.makeContact;

            // Load all registered users
            userService
                .loadAllUsers()
                .then(function (users) {
                    self.users = [].concat(users);
                    self.selected = users[0];
                });
        }

        /**
         * Hide or Show the "left" sideNav area
         */
        private toggleUsersList = () => {
            this.$mdSidenav("left").toggle();
        }

        /**
         * Select the current avatars
         * @param menuId
         */
        private selectUser = (user) => {
            this.selected = angular.isNumber(user) ? $scope.users[user] : user;
        }

        /**
         * Show the Contact view in the bottom sheet
         */
        private makeContact = (selectedUser) => {

            /**
             * User ContactSheet controller
             */
            let ContactSheetController = ($mdBottomSheet) => {
                this.user = selectedUser;
                this.actions = [
                    {icon: "phone", icon_url: "images/phone.svg", name: "Phone"},
                    {icon: "twitter", icon_url: "images/twitter.svg", name: "Twitter"},
                    {icon: "google_plus", icon_url: "images/google_plus.svg", name: "Google+"},
                    {icon: "hangouts", icon_url: "images/hangouts.svg", name: "Hangout"},
                ];
                this.contactUser = (action) => {
                    // The actually contact process has not been implemented...
                    // so just hide the bottomSheet
                    $mdBottomSheet.hide(action);
                };
            }

            this.$mdBottomSheet.show( <angular.material.IBottomSheetOptions>{
                "controller": ["$mdBottomSheet", ContactSheetController],
                "controllerAs": "cp",
                "parent": angular.element(document.getElementById("content")),
                "templateUrl": "./views/contactSheet.html",
            } ).then( (clickedItem) => {
                this.$log.debug(clickedItem.name + " clicked!");
            });

        }
    }
}

// angular.module("users")
//     .controller("UserController", UserController);
//
//
// (function(){
//
//   angular
//        .module("users")
//        .controller("UserController", [
//           "userService", "$mdSidenav", "$mdBottomSheet", "$log", "$q",
//           UserController,
//        ]);
//   /**
//    * Main Controller for the Angular Material Starter App
//    * @param $scope
//    * @param $mdSidenav
//    * @param avatarsService
//    * @constructor
//    */
//   function UserController( userService, $mdSidenav, $mdBottomSheet, $log) {
//     let self: any = this;
//
//     self.selected     = null;
//     self.users        = [ ];
//     self.selectUser   = selectUser;
//     self.toggleList   = toggleUsersList;
//     self.makeContact  = makeContact;
//
//     // Load all registered users
//
//     userService
//           .loadAllUsers()
//           .then( function( users ) {
//             self.users    = [].concat(users);
//             self.selected = users[0];
//           });
//
//     // *********************************
//     // Internal methods
//     // *********************************
//
//     /**
//      * Hide or Show the "left" sideNav area
//      */
//     function toggleUsersList() {
//       $mdSidenav("left").toggle();
//     }
//
//     /**
//      * Select the current avatars
//      * @param menuId
//      */
//     function selectUser ( user ) {
//       self.selected = angular.isNumber(user) ? $scope.users[user] : user;
//     }
//
//     /**
//      * Show the Contact view in the bottom sheet
//      */
//     function makeContact(selectedUser) {
//
//         $mdBottomSheet.show({
//           controller    : [ "$mdBottomSheet", ContactSheetController],
//           controllerAs  : "cp",
//           parent        : angular.element(document.getElementById("content")),
//           templateUrl   : "./views/contactSheet.html",
//         }).then(function(clickedItem) {
//           $log.debug( clickedItem.name + " clicked!");
//         });
//
//         /**
//          * User ContactSheet controller
//          */
//         function ContactSheetController( $mdBottomSheet ) {
//           this.user = selectedUser;
//           this.actions = [
//             { icon: "phone"       , icon_url: "images/phone.svg", name: "Phone"        },
//             { icon: "twitter"     , icon_url: "images/twitter.svg", name: "Twitter"      },
//             { icon: "google_plus" , icon_url: "images/google_plus.svg", name: "Google+"      },
//             { icon: "hangouts"    , icon_url: "images/hangouts.svg", name: "Hangout"      },
//           ];
//           this.contactUser = function(action) {
//             // The actually contact process has not been implemented...
//             // so just hide the bottomSheet
//
//             $mdBottomSheet.hide(action);
//           };
//         }
//     }
//
//   }
//
// })();
