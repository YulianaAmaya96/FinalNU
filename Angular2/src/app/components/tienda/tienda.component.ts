import {  Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CurrencyPipe } from '@angular/common'
import { OnChanges } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

import { AuthService } from "../../services/auth.service";
import { carroService} from '../../services/carro.service';
import { TiendaService} from '../../services/tienda.service';

import { Productocarro } from '../../models/producto-carro';
import { Producto } from '../../models/producto';

@Component({
  selector: 'tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],

})
export class TiendaComponent implements OnInit {

  private formulario : FormGroup;
  private listaProductos : Producto[];
  public productocarro : Productocarro;
  private titulo : string;
  public session : string;

  constructor(private detectChanges:ChangeDetectorRef,
              private router : Router,
              private tiendaService : TiendaService,
              private auth : AuthService,
              private carroService : carroService) { this.titulo = 'Catálogo de Productos'}


  ngOnInit() {
    if (!this.auth.checkSession()){
      this.router.navigate(['/login'])
    }else{
    this.session = sessionStorage.getItem("carro")
      this.formulario = new FormGroup(
        {
          'descripcion' : new FormControl(),
          'imagen': new FormControl(),
          'precio': new FormControl(),
          'cantidad': new FormControl(),
        }
      )
      this.mostrarProductos()
    }
  }

  mostrarProductos(){
    if(!this.tiendaService.productosCatalogo){
      this.tiendaService.getProductos().subscribe(
        ()=>{
          this.listaProductos = this.tiendaService.catalogo;
          this.checkcarro();
        }
      )
    }else{
          this.listaProductos = this.tiendaService.productosCatalogo;
    }
  }

  agregarProducto(id:number, value:number){
    for (let item of this.tiendaService.productosCatalogo){
      if(item.id == id){
        if(item.disponible < value){
          window.alert('Máxima existencia es: '+ item.disponible);
        }else{
          let cantidadActual = item.disponible;
          this.productocarro = {
            "id": item.id,
            "descripcion": item.descripcion,
            "imagen": item.imagen,
            "precio": item.precio,
            "cantidad": value
          }
          this.carroService.verificarcarro(this.productocarro);
          item.disponible = cantidadActual - value;
        }
      }
    }
  }

    filtrarCatalogo(filtro:string){
      this.listaProductos = this.tiendaService.filtrarProducto(filtro);
    }

    checkcarro(){
      for(let itemcarro of this.carroService.listacarro){
        this.tiendaService.actualizarDisponible(itemcarro.id, itemcarro.cantidad)
      }
    }

  obtenerCantidad(id:number){
    for(let item of this.carroService.listacarro){
      if(item.id == id){
        return item.cantidad
      }
    }
    return null
  }
}
