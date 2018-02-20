import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/Rx';
import { producto } from '../models/producto'


@Injectable()
export class TiendaService {
  public catalogo : producto[];
  public productosCatalogo : producto[];

  constructor(private http : Http, private router : Router) { }

  public getProductos(){
  return this.http.get('https://tiendavirtual-ca85d.firebaseio.com/productos/.json').map(
    (response : Response) => {
      this.catalogo =  response.json();
      this.productosCatalogo = this.catalogo
    })
  }

  public getDetalleProductos(idProduct:number) : producto {
    for(let item of this.productosCatalogo) {
      if(item.id == idProduct) {
        return item;
      }
    }
    return null;
  }

  cargarCatalogo(){
    return this.productosCatalogo
  }

  public filtrarProducto(filtro:string){
  this.productosCatalogo = this.catalogo;
  filtro.toLowerCase();
  let itemMatch : producto[] = [];
  for(let item of this.productosCatalogo){
    let nombre = item.nombre.toLowerCase();
    if(nombre.includes(filtro)){
      itemMatch.push(item)}
    }
    return itemMatch;
  }

  actualizarDisponible(id:number, value:number, devolver:boolean = false){
    let catalogo = this.catalogo;
    for(let itemCatalogo of catalogo){
      if (itemCatalogo.id == id){
        if(devolver == false){
          itemCatalogo.disponible = (Number(itemCatalogo.disponible) - value);
        }else{
          itemCatalogo.disponible = (Number(itemCatalogo.disponible) + value);
      }
        this.productosCatalogo = this.catalogo;
      }
    }
  }

}
