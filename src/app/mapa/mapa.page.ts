import { Component, OnInit } from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  map: any;


  constructor(
    private geolocation: Geolocation
  ) { }

  
  ngOnInit() {
    this.initializeMap();
  }

  initializeMap() {
    this.geolocation.getCurrentPosition()
      .then((resp) => {
        const position = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
        const mapOptions = {
          zoom: 13,
          center: position
        }
        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        const marker = new google.maps.Marker({
          position: position,
          map: this.map
        });
      }).catch((error) => {
        console.log('Erro ao recuperar sua posição', error);
      });
  }

}
