import { Component, ViewChild,TemplateRef,ElementRef } from '@angular/core';
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

  @ViewChild('currencyFromInput') currencyFromInput: ElementRef;
  @ViewChild('currencyToInput') currencyToInput: ElementRef;

  topTemplate: TemplateRef<any>;
  bottomTemplate: TemplateRef<any>;

  conversionType = 1;

  constructor(public navCtrl: NavController,public coinProvider:CoinProvider) {

    this.coins = [{title:"BTC",value:"bitcoin"}];
    this.currency = [{title:"USA Dollar",value:"USD"}];
    this.coinProvider.getCoinTypes().then(data => console.log(data));
    this.coinProvider.getCoinTypes().then(data => 
      {
        this.coins = data;
        this.currencyFrom = this.coins[0];
      });
    this.coinProvider.getCurrencyTypes().then(data => 
      {
        this.currency = data;
        this.currencyTo = this.currency[0];
      });
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

    this.coinProvider.getCoinValue(currencyFromDefaut,currencyToDefault).then(data => this.getConversionCoin(data));
  }

  getConversionCoin(data:any){
   
    let symbol = 'price_'+(this.currencyTo.value as String).toLocaleLowerCase();
    this.currencyToAmount = Math.round((this.currencyFromAmount * data[0][symbol]) * 100) /100;

  }

  getConversionCurrency(data:any){
  
    let symbol = 'price_'+(this.currencyTo.value as String).toLocaleLowerCase();
    this.currencyFromAmount = Math.round((this.currencyToAmount / data[0][symbol]) * 100) /100;

  }

  refreshConversionCoin()
  {
      this.coinProvider.getCoinValue(this.currencyFrom.value,this.currencyTo.value).then(data => this.getConversionCoin(data));
  }

  refreshConversionCurrency()
  {
      this.coinProvider.getCoinValue(this.currencyFrom.value,this.currencyTo.value).then(data => this.getConversionCurrency(data));
    
  }

  switchToAndFromCurrency()
  {
    let temp = this.topTemplate;
    this.topTemplate = this.bottomTemplate;
    this.bottomTemplate = temp;
  }

}
