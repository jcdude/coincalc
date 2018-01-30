import { Component, ViewChild,ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CoinProvider } from '../../providers/coin/coin';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  coins:any;
  currency:any;
  coinDetails:any;

  currencyFrom:any;
  currencyTo:any;

  currencyFromAmount:any;
  currencyToAmount:any;

  @ViewChild('currencyFromHtml') currencyFromHtml: ElementRef;
  @ViewChild('currencyToHtml') currencyToHtml: ElementRef;

  constructor(public navCtrl: NavController,public coinProvider:CoinProvider) {

    this.coins = [
      {title:'BTC',value:'bitcoin'},
      {title:'ETH',value:'ethereum'},
      {title:'XRP',value:'ripple'}
    ];

    this.currency = [
      {title:'USA Dollar',value:'USD'},
      {title:'EURO',value:'EUR'},
      {title:'British Pount',value:'GBP'}
    ];

  }

  ionViewDidLoad() {

    let currencyFromDefaut = 'bitcoin';
    let currencyToDefault = 'USD';
    this.currencyFromAmount = 1;
    this.currencyTo = this.currency[0];

    this.coinProvider.getCoinValue(currencyFromDefaut,currencyToDefault).then(data => this.getConversion(data));
  }

  getConversion(data:any){
    console.log(this.currencyTo);
    let symbol = 'price_'+(this.currencyTo.value as String).toLocaleLowerCase();
    this.currencyToAmount = this.currencyFromAmount * data[0][symbol];
  }

  refreshConversion()
  {
    console.log(this.currencyFrom);
    this.coinProvider.getCoinValue(this.currencyFrom.value,this.currencyTo.value).then(data => this.getConversion(data));
  }

  switchToAndFromCurrency()
  {
console.log(this.currencyToHtml.nativeElement.innerHTML);

      let toHtml = this.currencyToHtml.nativeElement.innerHTML;
      let fromHtml = this.currencyFromHtml.nativeElement.innerHTML;

      this.currencyToHtml.nativeElement.innerHTML = fromHtml;
      this.currencyFromHtml.nativeElement.innerHTML = toHtml;
  }

}
