import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/Rx';
import { AuthService } from "../../services/auth.service";
import { carroService } from '../../services/carro.service';
import { TiendaService } from '../../services/tienda.service';
import { Producto } from '../../models/Producto';
import { producto-carro } from '../../models/producto-carro';


@Component({
  selector: 'carro',
  templateUrl: './carro.component.html',
  styleUrls: ['./carro.component.css']
})
  public listacarro : producto-carro[] = [];
  public catalogo : Producto[] = [];
  public titulo: string;

  constructor(private carroService : carroService,
              private detectChanges:ChangeDetectorRef,
              private tiendaService : TiendaService,
              private auth : AuthService,
              private http : Http, private router : Router
            ) {
    this.titulo = 'carro de compras';
   }

  ngOnInit() {
    if (!this.auth.checkSession()){
      console.log(sessionStorage.getItem("Session"))
      this.router.navigate(['/login'])
    }else{
      this.listacarro = this.carroService.itemscarro();
    }
  }
    total(){
      let total :number = 0
      let items = this.carroService.listacarro;
      for(let subtotal of items ){
       total += subtotal.cantidad * subtotal.precio;
      }
      return total;
    }
  pagarcarro(){
    this.http.get('https://tienda-d3454.firebaseio.com/productos/.json')
    .map((response : Response) => {
        this.catalogo =  response.json()
      }
    ).subscribe(
      ()=>{
        for (let itemCatalogo of this.catalogo){
          for (let item of this.listacarro){
            if ( itemCatalogo.id == item.id ){
              let cantidad = Number(item.cantidad);
              itemCatalogo.disponible = itemCatalogo.disponible - cantidad
              this.actualizarDisponible(item.id, itemCatalogo).subscribe(
                (response) => {
                  this.vaciarcarro()
                }
              )
            }
          }
        }
        this.router.navigate(['/tienda'])
      }
    )
  }
  actualizarDisponible(id:number, itemCatalogo:Producto){
    return this.http.put(`https://tienda-d3454.firebaseio.com/productos/${id}.json`, itemCatalogo)
    .map((response : Response) => {
        return this.catalogo =  response.json()
      }
    )
  }
    vaciarcarro(){
    sessionStorage.setItem('carro', '[]')
    this.listacarro = [];
    this.carroService.eliminarcarro(this.listacarro);
    this.carroService.listacarro = [];
    this.tiendaService.getProductos().subscribe()
    }

    eliminarProducto(id:number, value:number){
      for(let item of this.listacarro){
        if(item.id == id){
          let index = this.listacarro.indexOf(item);
          if(value == null){
            this.listacarro.splice(index, 1);
            this.carroService.eliminarcarro(this.listacarro);
            this.total();
            this.tiendaService.actualizarDisponible(id, Number(item.cantidad), true);
          }else{
            if(value > 0){

              let validar = (Number(item.cantidad) - value);
              if(validar < 0){
                window.alert('La cantidad excede la cantidad del carro.');
              }else{
                item.cantidad = validar;
                if (item.cantidad == 0) {

                  this.listacarro.splice(index, 1);
                }

                this.carroService.eliminarcarro(this.listacarro);
                this.tiendaService.actualizarDisponible(id, Number(value), true);
              }
            }else{
            window.alert('La cantidad no es correcta, especifique una válida');
            }
          }
        }
      }this.detectChanges.detectChanges();
    }
}
