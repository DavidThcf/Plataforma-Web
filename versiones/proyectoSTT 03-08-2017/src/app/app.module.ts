import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { Servicios }         from './services/servicios';
import { ServiciosGlobales }         from './services/servicios-globales';


import { AppComponent } from './controllers/app.component';
import { Modallogin } from './controllers/modal-login.component';
import { InicioView }   from './controllers/inicio.component';
import { ProyectoPanel }   from './controllers/proyecto-panel.component';
import { ActividadPanel }   from './controllers/actividad-panel.component';
import { Mapa }   from './controllers/mapa.component';


import { RouterModule }   from '@angular/router';
import { AppRoutingModule }     from './routing/app-routing.module';

import { AgmCoreModule } from '@agm/core';
import { ChartsModule } from 'ng2-charts';

@NgModule({
   imports: [
    BrowserModule ,
    FormsModule,
    HttpModule,
    ChartsModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBstXoO7yz2v1JKRl2dwht0EvS8r8rBpe0 '
    })
  ],
  declarations: [
    AppComponent,
    Modallogin,
    ProyectoPanel,
    InicioView,
    Mapa,
    ActividadPanel
  ], 
  providers: [
    Servicios,
    ServiciosGlobales
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
