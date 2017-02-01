(function(){

  'use strict';

  var app = angular.module('PHPKonfApp', [
    'ngDialog',
    'ngSanitize',
    'ngRoute'
  ])

  app.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
        when('/speakers/:id', {
          templateUrl: 'speaker.html',
          controller: 'SpeakersController'
        }).
        otherwise({
          redirectTo: '/'
        });
    }]);

  app.filter('html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
  }]);

  app.filter('toArray', function () {
    return function (obj, addKey) {
      if (!angular.isObject(obj)) return obj;
      if ( addKey === false ) {
        return Object.keys(obj).map(function(key) {
          return obj[key];
        });
      } else {
        return Object.keys(obj).map(function (key) {
          var value = obj[key];
          return angular.isObject(value) ?
              Object.defineProperty(value, '$key', { enumerable: false, value: key}) :
          { $key: key, $value: value };
        });
      }
    };
  });

  app.controller('MainController', ['$http', '$scope', 'ngDialog', '$rootScope', function ($http, $scope, ngDialog, $rootScope) {

    $scope.limit = 16;

    $http.get("languages/speakers.json")
      .success (function (data) {
        $rootScope.speakers = data.speakers;
    });

    $scope.clickToOpen = function (speaker) {
      var speakerDialog = ngDialog.open({
        template  : 'modal.html',
        appendTo  : '#speakers',
        controller : function ($scope) {
          $scope.speaker = speaker;
        },
        showClose : false
      });
    };

    $scope.clickToOpenCoc = function () {
      var speakerDialog = ngDialog.open({
        template  : 'coc.html',
        showClose : false
      });
    };

  }]);

  app.controller('SpeakersController', ['$http', '$scope', 'ngDialog', '$rootScope', function ($http, $scope, ngDialog, $rootScope) {
  }]);

}());

