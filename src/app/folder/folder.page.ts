import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  map: google.maps.Map;
  minhaPosicao: google.maps.LatLng;
  latitude: any = "";
  longitude: any = "";

  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;

  constructor(
    private router: Router,
    private geolocation: Geolocation,
    private actRuter: ActivatedRoute,
    public toastCtrl: ToastController,
    private httpClient: HttpClient,
    //private provider: Api
    ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.exibirMapa();
  }

  // colocando uma posição especifica no mapa.
  exibirMapa() {
    const posicao = new google.maps.LatLng(-6.463933, -37.113028);
    const opcao = {
      center: posicao,
      zoom: 8,
      disableDefaultUI: true
    };

    this.map = new google.maps.Map(this.mapRef.nativeElement, opcao);

    this.buscarPosicao();
  }

  // Obtendo Geolocalização no mapa
  buscarPosicao(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude    

      this.minhaPosicao = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

      this.irParaMinhaPosicao();
      
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  // Mostrando a localização no mapa
  irParaMinhaPosicao(){
    this.map.setCenter(this.minhaPosicao);
    this.map.setZoom(15);

    const marker = new google.maps.Marker({
      position: this.minhaPosicao,
      title: 'Estou Aqui',
      animation: google.maps.Animation.BOUNCE,
      map: this.map
    });
  }


  salvar(){
  }
}
