'use strict';

describe('Gallery Item Component', function() {
  beforeEach(() => {
    angular.mock.module('cfgram');
    angular.mock.inject(($rootScope, $componentController, $httpBackend, authService) => {
      this.$rootScope = $rootScope;
      this.$componentController = $componentController;
      this.$httpBackend = $httpBackend;
      this.authService = authService;
    });
  });
  describe('galleryItemCtrl.deleteDone()', () => {
    it('should call deleteDone', () => {
      let bindings = {
        gallery: {
          _id: '4242',
          name: 'test gallery name',
          desc: 'test gallery description',
          pics: [],
        },
      deleteDone: function(data) {
        expect(data.galleryData._id).toEqual('4242');
      }
    };
    let galleryItemCtrl = this.$componentController('galleryItem', null, bindings);
    galleryItemCtrl.deleteDone({ galleryData: galleryItemCtrl.gallery });

    this.$rootScope.$apply();
    });
  });
  it('should call deleteDone with gallery after deleteGallery', () => {
    let url = 'http://localhost:3003/api/gallery/4242';
    let headers = {
      Accept: 'application/json',
      Authorization: 'Bearer test token'
    };
    let tempGallery = {
      _id: '4242',
      name: 'test name',
      desc: 'test desc'
    };
    let bindings = {
      gallery: tempGallery,
      deleteDone: function(data) {
        expect(data.galleryData._id).toEqual('4242');
      }
    };
    this.$httpBackend.expectDELETE(url, headers).respond(204);
    let galleryItemCtrl = this.$componentController('galleryItem', null, bindings);
    // spyOn(galleryItemCtrl, 'deleteDone');
    galleryItemCtrl.deleteGallery('4242');
    // expect(galleryItemCtrl.deleteDone).toHaveBeenCalledWith('4242');
    this.$httpBackend.flush();
    this.$rootScope.$apply();
  });
  describe('galleryItemCtrl.deleteGallery()', () => {
    it('should make a valid DELETE request', () => {
      let url = 'http://localhost:3003/api/gallery/4242';
      let headers = {
        Accept: 'application/json',
        Authorization: 'Bearer test token'
      };
      let tempGallery = {
        _id: '4242',
        name: 'test name',
        desc: 'test desc'
      };
      let bindings = {
        gallery: tempGallery,
        deleteDone: function(data) {
          expect(data.galleryData._id).toEqual('4242');
        }
      };
      this.$httpBackend.expectDELETE(url, headers).respond(204);
      let galleryItemCtrl = this.$componentController('galleryItem', null, bindings);
      galleryItemCtrl.deleteGallery(tempGallery._id)
      this.$httpBackend.flush();
      this.$rootScope.$apply();
  });
});
});
