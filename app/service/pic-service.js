'use strict';

module.exports = ['$q', '$log', '$http', 'Upload', 'authService', picService];

function picService($q, $log, $http, Upload, authService) {
  $log.debug('picService');

  let service = {};

  service.uploadGalleryPic = function(galleryData, picData) {
    $log.debug('picService.uploadGalleryPic');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/gallery/${galleryData._id}/pic`;
      let headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      };
      return Upload.upload({
        url,
        headers,
        method: 'POST',
        data: {
          name: picData.name,
          desc: picData.desc,
          file: picData.file
        }
      });
    })
    .then(response => {
      $log.debug('galleryData', galleryData);
      galleryData.pics.unshift(response.data);
      $log.debug('galleryData.pics', galleryData.pics);
      return response.data;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deleteGalleryPic = function(galleryData, picData) {
    $log.debug('picService.deleteGalleryPic');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/gallery/${galleryData._id}/pic/${picData._id}`;
      let config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      return $http.delete(url, config);
    })
    .then( () => {
      $log.log('photo deleted');
      galleryData.pics.splice(galleryData.pics.indexOf(picData), 1);
      return;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };


  return service;
}
