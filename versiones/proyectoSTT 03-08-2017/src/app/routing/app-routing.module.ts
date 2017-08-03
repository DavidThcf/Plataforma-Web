import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { InicioView }   from '../controllers/inicio.component';
import { ProyectoPanel }   from '../controllers/proyecto-panel.component';
import { Mapa }   from '../controllers/mapa.component';
import { ActividadPanel }   from '../controllers/actividad-panel.component';


const routes: Routes = [
  { path: '', component:InicioView },
  { path: 'proyecto', component: ProyectoPanel  },
  { path: 'mapa',  component: Mapa},
  { path: 'actividades',  component: ActividadPanel}
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}