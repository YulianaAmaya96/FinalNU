import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TiendaComponent} from './components/tienda/tienda.component'
import { carroComponent} from './components/carro/carro.component'
import { detalle} from './components/tienda/detalles/detalle.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tienda', component: TiendaComponent},
  { path: 'tienda/detalles/:id', component: detalle},
  { path: 'carro', component: carroComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class TiendaRoutingModule { }
