angular.module('starter.controllers', [])

.controller('RandomController', function($scope, $http, $ionicFilterBar) {
        $scope.navTitle='<img class="title-image" style="height: 27px;margin-top: 8px;" src="img/logoiclubs.png" />';
        
        var page = 0;
        var limit = 10;
        
        $scope.showFilterBar = function () {
            filterBarInstance = $ionicFilterBar.show({
                items: $scope.locales,
                update: function (filteredItems, filterText) {
                    $scope.locales = filteredItems;
                    if (filterText) {
                        console.log(filterText);
                    }
                }
            });
        };         
})

.controller('FeedsController', function($scope, $http, Feeds, $ionicFilterBar) {
        //$scope.$on('$ionicView.enter', function(e) {
        //});


        $scope.favorito = function(local){

        };
        
        Feeds.all($scope);
        
        $scope.showFilterBar = function () {
            filterBarInstance = $ionicFilterBar.show({
                items: $scope.locales,
                update: function (filteredItems, filterText) {
                    $scope.locales = filteredItems;
                    if (filterText) {
                        console.log(filterText);
                    }
                }
            });
        };

})

.controller('FeedController', function($scope, $stateParams, Feeds) {
    console.log($stateParams)
    Feeds.get($scope, $stateParams.feedsId);        
})

.controller('FavoritosController', function($scope) {})

.controller('AjustesController', function($scope) {
        $scope.settings = {
            enviarNotificaciones: true
        };
});
