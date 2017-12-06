import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { InicioView }   from '../modulo_inicio/inicio.component';
import { ProyectoPanel }   from '../modulo_proyectos/proyecto-panel.component';
import { ActividadPanel }   from '../modulo_actividades/actividad-panel.component';
import { Mapa }   from '../modulo_mapa_publico/mapa.component';
import { Mapa2 }   from '../modulo_mapa_publico2/mapa.component';

/*-------------PROYECTOS PUBLICOS--------------*/
import { ProyectosPublico } from '../modulo_proyectos_publico/proyectos-publico.component';
import { ActividadPanelPublico } from '../modulo_actividades_publico/actividad-panel-publico.component';
/*-----------FIN PROYECTOS PUBLICOS------------*/

import { RecuperacionComponent } from '../recuperacion/recuperacion.component';



const routes: Routes = [
  { path: '', component:InicioView },
  { path: 'administrador', component: ProyectoPanel  },
  { path: 'mapa',  component: Mapa},
  { path: 'mapa2',  component: Mapa2},
  { path: 'actividades',  component: ActividadPanel},
  { path: 'proyectos',  component: ActividadPanel},
  { path: 'proyectospublico',  component: ProyectosPublico},
  { path: 'actividadespublico',  component: ActividadPanelPublico},
  { path: 'recuperacion',  component: RecuperacionComponent}
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}