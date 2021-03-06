import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Servicios } from './services/servicios';
import { ServiciosGlobales } from './services/servicios-globales';
import { PersistenceModule } from 'angular-persistence';


import { AppComponent } from './app.component';
import { Modallogin } from './modulo_login/modal-login.component';
import { ModalRegister } from './modulo_registro/modal-register.component';
import { InicioView } from './modulo_inicio/inicio.component';
import { Mapa } from './modulo_mapa_publico/mapa.component';
import { Mapa2 } from './modulo_mapa_publico2/mapa.component';


import { AgmCoreModule } from '@agm/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './routing/app-routing.module';
import { ActividadModule } from './modulo_actividades/actividad-panel.module';
import { ProyectoModule } from './modulo_proyectos/proyecto-panel.module';

/*-------------PROYECTOS PUBLICOS--------------*/
import { ProyectosPublico } from './modulo_proyectos_publico/proyectos-publico.component';
import { ActividadModulePublico } from './modulo_actividades_publico/actividad-panel-publico.module';
import { RecuperacionComponent } from './recuperacion/recuperacion.component';
/*-----------FIN PROYECTOS PUBLICOS------------*/

/*-----------AYUDA COMPONENT-------------------*/
import { AyudaComponent } from './modulo_ayuda/ayuda.component';
/*-----------FIN AYUDA COMPONENT-------------------*/




@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    PersistenceModule,
    ActividadModule,
    ActividadModulePublico,
    ProyectoModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBOeLL07vQ6T4XPjzxkY1lpbm9Z0nAymN8 ',
      libraries: ['places']
    }),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    Modallogin,
    ModalRegister,
    InicioView,
    Mapa,
    Mapa2,
    ProyectosPublico,
    RecuperacionComponent,
    AyudaComponent
  ],
  providers: [
    Servicios,
    ServiciosGlobales
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
