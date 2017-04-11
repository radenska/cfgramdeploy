'use strict';

module.exports = ['$q', '$log', '$http', 'authService', galleryService];

function galleryService($q, $log, $http, authService) {
  $log.debug('galleryService');

  let service = {};
  service.galleries = [];

  service.createGallery = function(gallery) {
    $log.debug('galleryService.createGallery');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/gallery`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      return $http.post(url, gallery, config);
    })
    .then(response => {
      $log.log('gallery created');
      let gallery = response.data;
      service.galleries.unshift(gallery);
      return gallery;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  }

  service.fetchGalleries = function() {
    $log.debug('galleryService.fetchGalleries');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/gallery`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      };
      return $http.get(url, config);
    })
    .then(response => {
      $log.log('galleries fetched');
      service.galleries = response.data;
      return service.galleries;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deleteGallery = function(galleryID) {
    $log.debug('galleryService.deleteGalleries');

    authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/gallery/${galleryID}`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      };
      return $http.delete(url, config);
    })
    .then( () => {
      $log.log('gallery removed');
      service.galleries.some((gallery, index) => {
        if (gallery._id === galleryID) {
          service.galleries.splice(index, 1);
          return true;
        }
      });
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.updateGallery = function(galleryID, galleryData) {
    $log.debug('galleryService.updateGallery');

    authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/gallery/${galleryID}`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      };
      return $http.put(url, galleryData, config);
    })
    .then(response => {
      $log.log('gallery updated');
      service.galleries.some((gallery, index) => {
        if (gallery._id === galleryID) {
          service.galleries[index] = response.data;
          return true;
        }
      });
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  }
  return service;
}
