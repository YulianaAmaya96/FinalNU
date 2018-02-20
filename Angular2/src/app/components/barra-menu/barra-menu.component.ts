import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { carroService } from '../../services/carro.service';

@Component({
  selector: 'barra-menu',
  templateUrl: './barra-menu.component.html',
  styleUrls: ['./barra-menu.component.css'],
})
export class Barra-menu implements OnInit {
  private url : string

  constructor(private auth : AuthService,
              private carroService : carroService,
              private activatedRoute : ActivatedRoute
            ) { }
  ngOnInit() {
      this.url =  this.activatedRoute.snapshot.url[0].path;
      return this.url;
  }
  cerrarSesion(){
    this.auth.logout();
  }
}
