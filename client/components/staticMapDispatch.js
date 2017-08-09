
angular.module('pet-detective')
  .controller('staticMapDispatchController', function (fetchCoordsFactory) {
    this.createMap = () => {

    };
    fetchCoordsFactory.fetchCoords().then(function (data) {
      this.woa = {
        city: 'PET',
      };

      //set up new marker images
      let blueMarker = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + '0000FF');
      let redMarker = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + 'ff0000');

      // set up map
      this.mapOptions = {
        zoom: 12,
        center: new google.maps.LatLng(29.945947, -90.070023),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      };

      this.mymapdetail = new google.maps.Map(document.getElementById('map-canvas'), this.mapOptions);

      data.data.forEach(obj => {
        let cord = obj.latlong.split(',');
        obj.lat = cord[0];
        obj.long = cord[1];
      });

      for (let i = 0; i < data.data.length; i++) {
        this.addMarker = function () {

          this.mymarker = new google.maps.Marker({
            map: this.mymapdetail,
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(data.data[i].lat, data.data[i].long),
            title: this.woa.city,
            icon: data.data[i].lostOrFound === 'Lost' ? redMarker : blueMarker,
          });
        };
        this.addMarker();
      }
    });
  })
  .directive('staticMapDispatch', function staticMapDispatchDirective() {
    return {
      scope: {
      },
      restrict: 'E',
      template: "<div style='border-radius: 10px' ng-model='ctrl.mymarker' id='map-canvas'></div>",
      controller: 'petFormController',
      controllerAs: 'ctrl',
      bindToController: true,
      replace: true,
    };
  });

