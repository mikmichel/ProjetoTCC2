import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ToastController } from '@ionic/angular';
import { Api } from 'src/services/api';
import {SpeedTestService} from 'ng-speed-test';



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
  testeRede: any = ""; 
  speeds: any="";
  

  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;

  constructor(
    private geolocation: Geolocation,
    private actRuter: ActivatedRoute,
    public toastCtrl: ToastController,
    private provider: Api,
    private speedTestService: SpeedTestService
    ) { }

  ngOnInit() {
      this.actRuter.params.subscribe((data:any) =>{

      });
  }
  ionViewWillEnter() {
    this.exibirMapa();
    this.trackSpeed();
  }

  // colocando uma posição especifica no mapa.
  exibirMapa() {
    const posicao = new google.maps.LatLng(-6.463933, -37.113028);
    const opcao = {
      center: posicao,
      zoom: 8,
      disableDefaultUI: true

    };
    //console.log('ExibirMapa');
    this.map = new google.maps.Map(this.mapRef.nativeElement, opcao);

    this.buscarPosicao();
  }

  // Obtendo Geolocalização no mapa
  buscarPosicao(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;

      this.minhaPosicao = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

      this.irParaMinhaPosicao();

    }).catch((error) => {
      console.log('Error getting location', error);
    });
    //console.log('BuscarPosicao');
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
   // console.log('IrParaMinhaPosicao');
  }

  //Realizando um teste de rede
  trackSpeed() {
    this.speeds = [];
    this.speedTestService.getMbps({ retryDelay: 1500 }).subscribe(
      (speed) => {
        this.speeds.unshift(
          speed.toFixed(2)
        );
        this.testeRede = this.speeds;
        console.log('Passei por aqui 2 ' + speed); //teste
        console.log('Passei por aqui 3 ' + this.speeds); //reste

      }
    );
  }

  // Salvando a posição no BD
  salvar(){
    console.log('Salvar'); //teste
    return new Promise(resolve => {
      let dados = {
        latitude: this.latitude,
        longitude: this.longitude,
        testeRede: this.testeRede
      }
       console.log('Antes de Salvar'); //teste
      this.provider.dadosApi(dados, 'localizacao/inserir.php').subscribe(
        data => {
           console.log(data['mensagem']); //teste
          this.mensagemSucesso(data['mensagem']);
        }
      );
       console.log('Eu cheguei aqui'); //teste
    });
  }

  // Apresentando uma mensagem de sucesso ao salvar no banco
  async mensagemSucesso(mensagem){
    const toast = await this.toastCtrl.create({
      message: mensagem,
      duration: 2000
    });
    toast.present();
  }




}