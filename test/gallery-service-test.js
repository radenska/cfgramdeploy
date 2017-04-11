'use strict';

describe('Gallery Service', function() {
  beforeEach(() => {
    angular.mock.module('cfgram');
    angular.mock.inject(($rootScope, authService, galleryService, $window, $httpBackend) => {
      this.$rootScope = $rootScope;
      this.authService = authService;
      this.galleryService = galleryService;
      this.$httpBackend = $httpBackend;
      this.$window = $window;
    });
  });
  describe('galleryService.createGallery', () => {
    it('should create a new gallery', () => {
      let galleryData = {
        name: 'example gallery name',
        desc: 'example gallery description'
      };
      let headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer test token'
      };
      this.$httpBackend.expectPOST('http://localhost:3003/api/gallery', galleryData, headers)
      .respond(200, {
        _id: '42',
        username: 'exampleuser',
        name: galleryData.name,
        desc: galleryData.desc,
        pics: []
      });
      this.galleryService.createGallery(galleryData);
      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });
  describe('galleryService.deleteGallery', () => {
    it('should delete a gallery', () => {
      this.$httpBackend.expectDELETE('http://localhost:3003/api/gallery/42')
      .respond(204);
      this.galleryService.deleteGallery('42');
      this.$rootScope.$apply();
    });
  });
});
