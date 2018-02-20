import { Injectable } from '@angular/core';

import { producto-carro } from '../models/producto-carro';

@Injectable()
export class carroService {
  public listacarro : producto-carro[] = [];
  private totales : number[];
  constructor() {
      this.totales = [];
      this.contadorCarro()
   }

  itemscarro(){
    if(sessionStorage.getItem("carro")){
      this.listacarro = JSON.parse(sessionStorage.getItem("carro"));
      return JSON.parse(sessionStorage.getItem("carro"));
    }
    return 0;
  }

  contadorCarro(){
    return this.itemscarro().length
  }

  verificarcarro(item){
    if(this.guardarcarro(item) == false){
      this.listacarro.push(item)
    }
    sessionStorage.setItem("carro", JSON.stringify(this.listacarro));
  }

  guardarcarro(item){
    if(this.listacarro.length > 0){
      for(let itemGuardado of this.listacarro){
        if(itemGuardado.id == item.id){
          itemGuardado.cantidad = Number(itemGuardado.cantidad) + Number(item.cantidad)
          return true
        }
      }
      return false;
    }
    return false; //Devolver falso si el producto no existia en el carro
  }

  subtotal(precio, cantidad){
    let subtotal = Number(cantidad) * Number(precio);
    this.totales.push(subtotal)
    return subtotal
  }

  eliminarcarro(listacarro){
    sessionStorage.setItem("carro", JSON.stringify(listacarro))
  }
}
