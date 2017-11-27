
import { Component, OnInit}  from '@angular/core';
import { NgModule } 		 from '@angular/core';

import { Router }            from '@angular/router';
import { ServiciosGlobales } from '../../services/servicios-globales';
import { ServiciosGlobalesActividades} from '../servicios-globales-actividades'
import { Servicios }         from '../../services/servicios';

@Component({
	selector: 'subactividad-panel',
	templateUrl: './subactividad-panel.component.html',
	styleUrls: [ './subactividad-panel.component.css' ]
})

export class SubActividadPanel implements OnInit{	
	subActivity:any = 0;
	isSubActivity:any = [];
	subActividad:any;

	constructor(
		private serviciog:ServiciosGlobales,
		private serviGloAct:ServiciosGlobalesActividades,
		private router:Router,
		private servicios: Servicios	  
		){ };

	ngOnInit():void {
		this.subActivity = [];
		var keym = this.serviciog.actividad.keym;
		var id_usuario = this.serviciog.actividad.id_usuario;
		var id_caracteristica = this.serviciog.actividad.id_caracteristica;		

		this.servicios.getActividad(keym,id_usuario,id_caracteristica)
		.then(actividad =>{				
			if(actividad){
				this.subActividad = actividad;
				this.subActivity = actividad;
			}
		});
	}

	entrarAct(subActividad){
		this.serviGloAct.lastActividad.push(this.serviciog.isSubActivity)
		this.subActivity = [];
		this.serviciog.actividades = [];
		this.serviciog.actividad = subActividad;
		this.serviciog.isSubActivity = subActividad;
		var keym = subActividad.keym;
		var id_usuario = subActividad.id_usuario;
		var id_caracteristica = subActividad.id_caracteristica;

		this.serviciog.permisoPublicar = subActividad.public;
		this.serviciog.permisoReporte = subActividad.p_reporte;
		this.serviciog.permisoCategorias = subActividad.p_categorias;
		this.serviciog.permisoMultimedia = subActividad.p_multimedia;
		this.serviciog.permisoMapa = subActividad.p_mapa;
		this.serviciog.permisoPorcentajes = subActividad.p_porcentajes;
		this.serviciog.permisoEstadisticas = subActividad.p_estadisticas;
		
		this.serviciog.titulo = subActividad.nom_act;
		this.serviGloAct.actOpt= 1;

		this.servicios.getActividad(keym,id_usuario,id_caracteristica)
		.then(actividad => { 
			if(actividad){
				this.serviciog.actividades = actividad;
			}		
		});
	}

	search(term:string){	
		console.log(this.subActividad)	
		if(term==''){
			this.subActivity = this.subActividad;
		}else{
			this.subActivity = this.subActividad.filter(
				item  =>{
					return item.nom_act.toLowerCase().indexOf(term.toLowerCase()) !== -1 ||
					item.usr_nom.toLowerCase().indexOf(term.toLowerCase()) !== -1 ||
					item.usr_ape.toLowerCase().indexOf(term.toLowerCase()) !== -1 ||
					item.porcentaje_cumplido.toLowerCase().indexOf(term.toLowerCase()) !== -1
				} 

				);
		}

	}

}
