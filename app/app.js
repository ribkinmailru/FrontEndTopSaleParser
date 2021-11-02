let myApp = angular.module('myApp',[
  'ngRoute',
  'myControllers'
])

myApp.config(function ($routeProvider, $locationProvider) {
  $routeProvider
          .when('/notebook', {
              templateUrl: 'notebook.html',
              controller: 'notebookController'
          })
          .when('/tvset', {
            templateUrl: 'notebook.html',
            controller: 'tvsetController'
          })
          .when('/phone', {
            templateUrl: 'notebook.html',
            controller: 'phoneController'
         }) 
  });



  myApp.controller('notebookController', function DataController($http, $scope){
    angular.element(document.querySelector("#canvas")).removeClass("d-none")
    game = true
    $http.get('http://localhost:8080/notebook').then(function(success){
      angular.element(document.querySelector("#canvas")).addClass("d-none")
      game = false
      $scope.prouducts  = success.data
    })
  })
  myApp.controller('tvsetController', function DataController($http, $scope){
    angular.element(document.querySelector("#canvas")).removeClass("d-none")
    game = true
    $http.get('http://localhost:8080/tvset').then(function(success){
      angular.element(document.querySelector("#canvas")).addClass("d-none")
      game = false
      $scope.prouducts  = success.data
    })
  })

  myApp.controller('phoneController', function DataController($http, $scope){
    angular.element(document.querySelector("#canvas")).removeClass("d-none")
    game = true
    $http.get('http://localhost:8080/phone').then(function(success){
      angular.element(document.querySelector("#canvas")).addClass("d-none")
      game = false
      $scope.prouducts  = success.data
    })
  })


