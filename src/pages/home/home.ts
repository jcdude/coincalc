import { Component, ViewChild,TemplateRef } from '@angular/core';
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

  @ViewChild('currencyFromHtml') currencyFromHtml: TemplateRef<any>;
  @ViewChild('currencyToHtml') currencyToHtml: TemplateRef<any>;

  topTemplate: TemplateRef<any>;
  bottomTemplate: TemplateRef<any>;

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

  ngOnInit() {

    this.topTemplate = this.currencyFromHtml;
    this.bottomTemplate = this.currencyToHtml;
  }

  ionViewDidLoad() {

    let currencyFromDefaut = 'bitcoin';
    let currencyToDefault = 'USD';
    this.currencyFromAmount = 1;
    this.currencyTo = this.currency[0];
    this.currencyFrom = this.coins[0];

    this.coinProvider.getCoinValue(currencyFromDefaut,currencyToDefault).then(data => this.getConversion(data));
  }

  getConversion(data:any){
    console.log(this.currencyTo.value);
    console.log(data);
    let symbol = 'price_'+(this.currencyTo.value as String).toLocaleLowerCase();
    this.currencyToAmount = this.currencyFromAmount * data[0][symbol];
  }

  refreshConversion()
  {
    console.log(this.currencyFrom);
    console.log(this.currencyTo);
    this.coinProvider.getCoinValue(this.currencyFrom.value,this.currencyTo.value).then(data => this.getConversion(data));
  }

  switchToAndFromCurrency()
  {
    let temp = this.topTemplate;
    this.topTemplate = this.bottomTemplate;
    this.bottomTemplate = temp;
  }

}
