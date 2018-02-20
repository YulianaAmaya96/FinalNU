import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AuthService} from "./services/auth.service";
import { TiendaService } from './services/tienda.service';
import { carroService } from './services/carro.service'
import { AppComponent } from './app.component';
import { TiendaRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { Barra-menu } from './components/barra-menu/barra-menu.component';
import { carroComponent } from './components/carro/carro.component';
import { detalle } from './components/tienda/detalles/detalle.component';

export const config =  {
    apiKey: "AIzaSyAHjTtAmYTchSZ60U1gvhlWdW0rZJA9qm0",
    authDomain: "tiendavirtual-ca85d.firebaseapp.com",
    databaseURL: "https://tiendavirtual-ca85d.firebaseio.com",
    projectId: "tiendavirtual-ca85d",
    storageBucket: "tiendavirtual-ca85d.appspot.com",
    messagingSenderId: "897291866065"
  };

@NgModule({
  declarations: [
    AppComponent,
    Barra-menu,
    LoginComponent,
    TiendaComponent,
    carroComponent,
    detalle,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(config),
    ReactiveFormsModule,
    TiendaRoutingModule
  ],
  providers: [AuthService, TiendaService, carroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
