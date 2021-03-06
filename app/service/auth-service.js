'use strict';

module.exports = ['$q', '$log', '$http', '$window', authService];

function authService($q, $log, $http, $window) {
  $log.debug('authService');

  let service = {};
  let token = null;

  function setToken(_token) {
    $log.debug('authService.setToken');
    if (!_token) return $q.reject(new Error('no token'));

    $window.localStorage.setItem('token', _token);
    token = _token;
    return $q.resolve(token);
  }

  service.getToken = function() {
    $log.debug('authService.getToken');

    if (token) return $q.resolve(token); //if there is already a token, don't bother with the rest of the function
    token = $window.localStorage.getItem('token'); //find the token variable in local storage
    if (token) return $q.resolve(token); //return the token found
    return $q.reject(new Error('token not found')); //in case there is no token var in local storage
  };

  service.signup = function(user) {
    $log.debug('authService.signup');

    let url = `${__API_URL__}/api/signup`;
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    return $http.post(url, user, config)
    .then(response => {
      $log.log('success: ', response.data);
      return setToken(response.data);
    })
    .catch(err => {
      $log.error('failure: ', err.message);
      return $q.reject(new Error('signup failed'));
    });
  };

  service.login = function(user) {
    $log.debug('authService.login');

    let url = `${__API_URL__}/api/login`;
    let base64 = $window.btoa(`${user.username}:${user.password}`);
    let config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${base64}`
      }
    };
    return $http.get(url, config)
    .then(response => {
      $log.log('success:', response.data);
      return setToken(response.data);
    })
    .catch(err => {
      $log.error('failure', err.message);
      return $q.reject(new Error('login failed'));
    });
  };

  service.logout = function() {
    $log.debug('authService.logout');

    $window.localStorage.removeItem('token');
    token = null;
    return $q.resolve();
  };
  return service;
}
