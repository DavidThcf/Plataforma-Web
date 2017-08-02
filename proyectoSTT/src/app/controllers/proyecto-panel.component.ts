import { Component, OnInit}  from '@angular/core';
import { NgModule } 		 from '@angular/core';
import { Router }            from '@angular/router';
import { ServiciosGlobales } from '../services/servicios-globales';
import { Servicios }         from '../services/servicios';


@Component({
	selector: 'proyecto-panel',
	templateUrl: '../views/proyecto-panel.component.html',
	styleUrls: [ '../src/css/proyecto-panel.component.css' ]
})

export class ProyectoPanel implements OnInit{

	constructor(
		private serviciog:ServiciosGlobales,
		private router:Router,
		private servicios: Servicios	  
		){
		if(!serviciog.usuario){
			//let link = [''];
			//router.navigate(link);
		}else{
			//this.servicios.getProyecto(serviciog.usuario.id_usuario + '')
			//.then(cadena => this.serviciog.proyecto = cadena);
		}		
	};

	ngOnInit():void {		
		
		this.servicios.getProyecto(this.serviciog.usuario.id_usuario + '')
		.then(cadena => this.serviciog.proyecto = cadena);

		
	}
	

	entrar(){
		let link = ['actividades'];
		this.router.navigate(link);
	}
}