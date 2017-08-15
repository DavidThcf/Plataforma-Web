import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { ActividadPanel }   from './actividad-panel.component';
import { RegistroActividad }  from './modulo_registro_actividad/registro_actividad.component';

import { ChartsModule } from 'ng2-charts';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    AgmCoreModule
  ],
  declarations: [
  	ActividadPanel,
    RegistroActividad
  ],
  providers: [ ]
})
export class ActividadModule {}