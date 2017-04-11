'use strict';

require('./_home.scss');

module.exports = ['$log', '$rootScope', 'galleryService', HomeController];

function HomeController($log, $rootScope, galleryService) {
  $log.debug('HomeController');

  this.galleries = [];

  this.fetchGalleries = function() {
    $log.debug('HomeController.fetchGalleries');

    galleryService.fetchGalleries()
    .then(galleries => this.galleries = galleries);
  };

  this.galleryDeleteDone = function(gallery) {
    $log.debug('HomeController.galleryDeleteDone', gallery);

    if (this.currentGallery._id === gallery._id) this.currentGallery = null;
  };

  this.fetchGalleries();
  $rootScope.$on('$locationChangeSuccess', () => this.fetchGalleries());

}
