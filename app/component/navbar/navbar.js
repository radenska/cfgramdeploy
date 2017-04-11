'use strict';

require('./_navbar.scss');

module.exports = {
  template: require('./navbar.html'),
  controller: ['$log', '$location', '$rootScope', 'authService', NavbarController],
  controllerAs: 'navbarCtrl'
};

function NavbarController($log, $location, $rootScope, authService) {
  $log.debug('NavbarController');

  this.checkPath = function() {
    $log.debug('NavbarController.checkPath');
    let path = $location.path();
    if (path === '/join') this.hideBtn = true;
    if (path !== '/join') this.hideBtn = false;

    authService.getToken()
    .catch( () => $location.url('/join#login')); //if there is no token, that means user is not signed in, take them to log in screen
  };

  this.checkPath();
  $rootScope.$on('$locationChangeSuccess', () => this.checkPath()) //any time the location changes, check the path to determine whether or not to display the logout button

  this.logout = function () {
    $log.debug('NavbarController.logout');
    this.hideBtn = true;
    authService.logout()
    .then( () => $location.url('/')); //after running the logout method from the auth Service, which removes token from local storage, take user to landing view
  };
}
