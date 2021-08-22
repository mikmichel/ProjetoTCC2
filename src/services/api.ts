import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

//arquivo utilizado apra conectar com o banco(API)
@Injectable()
export class Api{
    server: string = 'http://localhost/testeMaps/';

    constructor(private http : HttpClient){
       
    }
     dadosApi(dados: any, api: string){
            const httpOptions = {
                headers: new HttpHeaders({'Content-Type' : 'application/json'})
            }

            let url = this.server + api;
            return this.http.post(url, JSON.stringify(dados), httpOptions).map(res => res);
        }
}