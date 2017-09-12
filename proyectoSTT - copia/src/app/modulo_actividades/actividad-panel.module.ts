import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule,ReactiveFormsModule }    from '@angular/forms';
import { ActividadPanel }   from './actividad-panel.component';
import { RegistroActividad }  from './modulo_registro_actividad/registro_actividad.component';
//import { MultimediaModule }        from './modulo_multimedia/multimedia.module';
import { Multimedia }   from './modulo_multimedia/multimedia.component';
import { Categorias }   from './modulo_categorias/categorias.component';
import { Mapa }   from './modulo_mapa/mapa.component';
import { SubActividadPanel }   from './modulo_subactividad/subactividad-panel.component';
import { RegistroMultimedia }  from './modulo_multimedia/modulo-registro-multimedia/registro-multimedia.component';


import { ChartsModule } from 'ng2-charts';
import { AgmCoreModule } from '@agm/core';

import { ServiciosGlobalesActividades} from './servicios-globales-actividades'



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    AgmCoreModule,
    ReactiveFormsModule

  ],
  declarations: [
  	ActividadPanel,
    RegistroActividad,
    Multimedia,
    RegistroMultimedia,
    Categorias,
    Mapa,
    SubActividadPanel
  ],
  providers: [ ServiciosGlobalesActividades ]
})
export class ActividadModule {}