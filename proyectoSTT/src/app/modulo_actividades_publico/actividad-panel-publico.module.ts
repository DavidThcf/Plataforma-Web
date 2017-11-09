import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActividadPanelPublico } from './actividad-panel-publico.component';
import { RegistroActividad } from './modulo_registro_actividad/registro_actividad.component';
import { Multimedia } from './modulo_multimedia/multimedia.component';
import { Categorias } from './modulo_categorias/categorias.component';
import { Estadisticas } from './modulo_estadisticas/estadisticas.component';
import { Mapa } from './modulo_mapa/mapa.component';
import { SubActividadPanel } from './modulo_subactividad/subactividad-panel.component';
import { RegistroMultimedia } from './modulo_multimedia/modulo-registro-multimedia/registro-multimedia.component';


import { ChartsModule } from 'ng2-charts';
import { AgmCoreModule } from '@agm/core';

import { ServiciosGlobalesActividades } from './servicios-globales-actividades'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    AgmCoreModule,
    ReactiveFormsModule
  ],
  declarations: [
    ActividadPanelPublico,
    RegistroActividad,
    Multimedia,
    RegistroMultimedia,
    Categorias,
    Estadisticas,
    Mapa,
    SubActividadPanel
  ],
  providers: [ServiciosGlobalesActividades, Mapa]
})
export class ActividadModulePublico { }