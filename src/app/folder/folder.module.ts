import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {SobrePage} from '../sobre/sobre.page';
import {MapaPage} from '../mapa/mapa.page';

import { IonicModule, NavController } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule
  ],
  declarations: [FolderPage]
})
export class FolderPageModule {
  sobrePaga = SobrePage;
  mapaPage = MapaPage;

  constructor(public navCtrl: NavController){
    
  }
  

}

