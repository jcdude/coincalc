import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CoinProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CoinProvider {

  constructor(public http: HttpClient) {
    
  }

  getCoinValue(coinType:any,currencyType:any) {

    let url = 'https://api.coinmarketcap.com/v1/ticker/'+coinType+'/?convert='+currencyType;
    return new Promise(resolve => {
      this.http.get(url).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });

  }

}
