/* Autor: Luis Bahamonde */

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'jett.ionic.filter.bar', 'ion-gallery', 'jett.ionic.scroll.sista', 'ngIOS9UIWebViewPatch', 'ion-affix'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {

    setTimeout(function () {
        navigator.splashscreen.hide();
    }, 2000);

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
        //StatusBar.styleDefault();
        StatusBar.styleLightContent();
    }

  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicFilterBarConfigProvider, $ionicConfigProvider) {

        $ionicFilterBarConfigProvider.theme('light');
        $ionicFilterBarConfigProvider.clear('ion-close');
        $ionicFilterBarConfigProvider.search('ion-search');
        $ionicFilterBarConfigProvider.backdrop(true);
        $ionicFilterBarConfigProvider.transition('vertical');
        $ionicFilterBarConfigProvider.placeholder('Search...');

        $ionicConfigProvider.backButton.previousTitleText(false);
        $ionicConfigProvider.backButton.text('');

    $stateProvider
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
  .state('tab.article', {
    url: '/article',
    views: {
      'tab-article': {
        templateUrl: 'templates/tab-article.html',
        controller: 'RandomController'
      }
    }
  })
  .state('tab.feeds', {
      url: '/feeds',
      views: {
        'tab-feeds': {
          templateUrl: 'templates/tab-feeds.html',
          controller: 'FeedsController'
        }
      }
    })
    .state('tab.feeds-detail', {
      url: '/feeds/:feedsId',
      views: {
        'tab-feeds': {
          templateUrl: 'templates/feeds-detail.html',
          controller: 'FeedController'
        }
      }
    })
    .state('tab.favoritos', {
        url: '/favoritos',
        views: {
            'tab-favoritos': {
                templateUrl: 'templates/tab-love.html',
                controller: 'FavoritosController'
            }
        }
    })
  .state('tab.account', {
        url: '/account',
        views: {
            'tab-account': {
                templateUrl: 'templates/tab-account.html',
                controller: 'AjustesController'
            }
        }
  });

  /*Si ninguno de los siguientes estados esta activo reenviar a /tab/article */
//   $urlRouterProvider.otherwise('/tab/article');

});
