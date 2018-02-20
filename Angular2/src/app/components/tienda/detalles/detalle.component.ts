import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import { AuthService } from "../../../services/auth.service";
import { TiendaService} from '../../../services/tienda.service';
import { carroService} from '../../../services/carro.service';
import { BarraSuperiorComponent  } from '../../barra-menu/barra-menu.component';

import { Producto } from '../../../models/producto';
import { Productocarro } from '../../../models/producto-carro';


@Component({
  selector: 'detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class detalleComponent implements OnInit {
  private informacionProducto : Producto;
  private productocarro : Productocarro;

  constructor(private tiendaService : TiendaService,
    private router : Router,
    private auth : AuthService,
    private carroService : carroService,
    private activatedRoute : ActivatedRoute) { }

    ngOnInit() {
      if (!this.auth.checkSession()){
        this.router.navigate(['/login'])
      }else{
        this.detalleProducto()
      }
    }

    detalleProducto(){
    this.activatedRoute.params.subscribe(params => {
      if(this.tiendaService.cargarCatalogo()){
        this.informacionProducto = this.tiendaService.getDetalleProductos(params['id']);
      }else{
        this.tiendaService.getProductos().subscribe(
          () => {
            this.checkcarro();
            this.informacionProducto = this.tiendaService.getDetalleProductos(params['id']);
          })
        }
      });
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

  obtenerCantidad(id:number){
    for(let item of this.carroService.listacarro){
      if(item.id == id){
        return item.cantidad
      }
    }
    return null
  }


  checkcarro(){
    for(let itemcarro of this.carroService.listacarro){
      this.tiendaService.actualizarDisponible(itemcarro.id, itemcarro.cantidad)
    }
  }

  navegacionAtras(id:number){
    let value = Number(id-1);
    if(value >= 0){
      return value;
    }
    return id
  }

  navegacionSiguiente(id:number){
    if(id < this.tiendaService.cargarCatalogo().length){
      let value = Number(id+1);
      return value;
    }
    return id
  }
}
